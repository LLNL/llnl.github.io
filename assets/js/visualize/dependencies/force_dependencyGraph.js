function draw_force_graph(areaID, adjacentAreaID) {
    // URL for data
    var url1 = ghDataDir + '/intRepos_Dependencies.json';
    var url2 = ghDataDir + '/dependencyInfo.json';
    var files = [url1, url2];
    // Converts json file into object, reformats data, and then draws graph.
    Promise.all(files.map(url => d3.json(url))).then(values => drawGraph(reformatData(values[0], values[1]), areaID, adjacentAreaID));

    // Draws graph
    function drawGraph(data, areaID, adjacentAreaID) {
        const graphHeader = '';

        const margin = { top: stdMargin.top, right: stdMargin.right / 2, bottom: stdMargin.bottom / 2, left: stdMargin.left / 2 },
            element = document.querySelector('.' + areaID).parentNode,
            containerWidth = element.offsetWidth,
            width = Math.min(containerWidth, 1000)- margin.left - margin.right,
            height = Math.min(containerWidth, 1000)  - margin.top - margin.bottom;
        const legendRectSize = 15,
            legendSpacing = 4;
        const ringSize = (Math.min(width - margin.left - margin.right, height - margin.top - margin.bottom) + 4) / 2;

        // Default colors picked and used to delineate Internal and External repositories
        const colors = ['#6baed6', 'seagreen', '#3182bd'];

        // Used to color the graph based on GitHub language colors
        let languageColors = [];
        // Needed for legend
        let languages = []

        // Booleans used to track the states needed to implement color by language
        let colorLanguage = false;
        let orgSelected = false;

        const chart = d3
            .select('.' + areaID)
                .attr('width', width)
                .attr('height', height)
                .attr('viewBox', [-width / 2, -height / 2, width, height]);

        // Should always represent the current set of nodes and links being displayed
        let nodes = data.nodes;
        let links = data.links;

        const nodeTip = d3
            .tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
                return `${d.id}`;
            });
            
        const linkTip = d3
            .tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
                return `${d.source.id} is linked to ${d.target.id}`;
            });

        chart.call(nodeTip);
        chart.call(linkTip);

        // Adds static, directional, and link forces to nodes
        const simulation = d3.forceSimulation(nodes)
            .force('link', d3.forceLink(links).id(d => d.id).distance(d => 10))
            .force('charge', d3.forceManyBody().strength(() => -20))
            .force('x', d3.forceX().strength(() => 0.14))
            .force('y', d3.forceY().strength(() => 0.14));

        // Adds title
        chart
            .append('text')
            .attr('class', 'graphtitle')
            .attr('x', 0)
            .attr('y', 0 - (height / 2 - margin.top / 3))
            .attr('text-anchor', 'middle')
            .text(graphHeader);

        // Adds ring
        chart.append('circle')
            .attr('cx', 40)
            .attr('cy', 0)
            .attr('r', ringSize)
            .attr('fill', '#FFFFFF')
            .attr('stroke', '#000000');

        // Group for links
        const link = chart
            .append('g')
                .attr('transform', 'translate(40,0)')
                .attr('stroke', '#999')
                .attr('stroke-opacity', 0.6);
        
        // Adds links
        link.selectAll('line')
            .data(links)
            .join('line')
                .attr('stroke-width', d => (100 - d.value) / 50)
                .on('mouseover', linkTip.show)
                .on('mouseout', linkTip.hide);

        // Group for nodes
        const node = chart
            .append('g')
                .attr('transform', 'translate(40,0)')
                .attr('stroke', '#fff')
                .attr('stroke-width', 1.5);

        // Adds nodes
        node.selectAll('circle')
            .data(nodes)
            .join('circle')
                .style('cursor', 'pointer')
                .attr('r', 5)
                .attr('class', 'inGraph')
                .attr('language', d => d.language)
                .attr('id', d => d.id)
                .attr('fill', d => {
                    if (d.notPackage && !d.package) {
                        return colors[0];
                    } else if (!d.notPackage && d.package) {
                        return colors[1];
                    } else {
                        return colors[2];
                    }
                })
            .on('mouseover', d => {
                const bfsTree = getBFSTree(d, 11);
                const t = chart.transition().duration(300);
                node.selectAll('circle').transition(t)
                    .attr('fill-opacity', n => n.depth != null ? Math.max(weightCurve(n.depth, 12), 0) : 0)
                    .attr('stroke-opacity', n => n.depth != null ? Math.max(weightCurve(n.depth, 12), 0) : 0);
                link.selectAll('line').transition(t)
                    .attr('stroke-opacity', n => n.source.depth != null && n.target.depth != null ? Math.max(weightCurve(Math.max(n.source.depth, n.target.depth), 12), 0) : 0.1);
                nodeTip.show(d)
            })
            .on('mouseout', d => {
                node.selectAll('circle').each(d => d.depth = null);
                const t = chart.transition().duration(300);
                node.selectAll('circle').transition(t)
                    .attr('fill-opacity', d => {
                        if (document.getElementById(d['id']).getAttribute('searched')) {
                            return document.getElementById(d['id']).getAttribute('searched') === 'true' ? 1 : 0.2;
                        } else {
                            return 1;
                        }
                    })
                    .attr('stroke-opacity', d => {
                        if (document.getElementById(d['id']).getAttribute('searched')) {
                            return document.getElementById(d['id']).getAttribute('searched') === 'true' ? 1 : 0.2;
                        } else {
                            return 1;
                        }
                    });
                link.selectAll('line').transition(t)
                    .attr('stroke-opacity', 0.6);
                nodeTip.hide(d)
            })
            .on('click', d => {
                node.selectAll('circle').each(d => {
                    d['focused'] = false;
                    document.getElementById(d['id']).removeAttribute('searched');
                });
                d['focused'] = true;
                node.selectAll('circle').attr('r', d => d.focused ? 8 : 5);
                draw_connection_tree({ name: d.name, id: d.id, package: d.package, id: d.id, notPackage: d.notPackage, children: getCurrentNeighbors(d), language: d.language, color: d.color, language: d.language, color: d.color }, adjacentAreaID);
            });

        // Matches node and link location to where the simulation says the points should be
        simulation.on('tick', () => {
            link.selectAll('line')
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);

            node.selectAll('circle')
                .attr('cx', d => d.x)
                .attr('cy', d => d.y);
        });

        // Data for legend
        const labels = ['LLNL Repositories with Dependencies', 'External Packages', 'Internal Packages'];
    
        // Creates legend
        const legend = chart
            .append('g');

        // Updates legend to any array of labels and colors
        // Arrays should be the same size
        function updateLegend(labels, color = colors) {
            legend.selectAll('g').remove();

            const legendMap = [];
            color.forEach((d, i) => {
                legendMap.push({ text: labels[i], color: d });
            });
    
            const legendEntries = legend
                .selectAll('g')
                .data(legendMap)
                    .join('g')
                    .attr('class', 'legend')
                    .attr('transform', (d, i) => {
                        const legendHeight = legendRectSize + legendSpacing;
                        const offset = (legendHeight * colors.length) / 2;
                        const horizontal = 0 - width / 2;
                        const vertical = i * legendHeight - height / 2;
                        return `translate(${horizontal}, ${vertical})`;
                    });
            
            // Adds rectangle for color reference
            legendEntries
                .append('rect')
                    .attr('width', legendRectSize)
                    .attr('height', legendRectSize)
                    .style('fill', d => {
                        return d.color;
                    })
                    .style('stroke', d => {
                        return d.color;
                    });
    
            // Adds legend text
            legendEntries
                .append('text')
                    .attr('x', legendRectSize + legendSpacing)
                    .attr('y', legendRectSize - legendSpacing)
                    .text(d => {
                        return d.text;
                    })
                    .attr('text-anchor', 'start');
        }

        colorByLanguage(colorLanguage);

        if (colorLanguage) {
            updateLegend(languages, languageColors);
        } else {
            updateLegend(labels);
        }

        const colorButton = chart.append('g').attr('transform', `translate(${width/2 - margin.right - 150},${80 - (height/2 - margin.bottom)})`);

        const colorButtonCircle = colorButton.append('circle')
            .attr('r', legendRectSize / 2)
            .attr('cx', legendRectSize / 2)
            .attr('cy', 2 - legendRectSize / 2)
            .attr('fill', colorLanguage ? 'lightblue' : 'white')
            .attr('stroke', colorLanguage ? 'white' : 'black')
            .style('cursor', 'pointer')
            .on('click', () => {
                // Since orgs do not have languages, we do not want colorByLanguage to be called
                if (!orgSelected) { 
                    if (colorLanguage) {
                        colorLanguage = !colorLanguage;
                        colorButtonCircle.attr('fill', 'white');
                        colorButtonCircle.attr('stroke', 'black');
                        colorByLanguage(colorLanguage);
                        updateLegend(labels);
                    } else {
                        colorLanguage = !colorLanguage;
                        colorButtonCircle.attr('fill', 'lightblue');
                        colorButtonCircle.attr('stroke', 'white');
                        colorByLanguage(colorLanguage);
                        updateLegend(languages, languageColors);
                    }
                }
            });

        colorButton.append('text')
            .attr('x', legendRectSize + legendSpacing)
            .text('Color by Language')
            .attr('text-anchor', 'start');

        const options = {};

        // Options for graph view
        options.normalView = { name: 'normalView', text: 'Repos connected to dependencies', labels: ['LLNL Repositories with Dependencies', 'External Packages', 'Internal Packages'], languages: true, function: redraw };
        options.simplifiedView = { name: 'simplifiedView', text: 'Repos connected by shared dependencies', labels: ['LLNL Repositories with Dependencies', 'External Packages', 'Internal Packages'], languages: true, function: simplify };
        options.orgView = { name: 'orgView', text: 'Organizations connected to dependency organizations', labels: ['LLNL Organizations', 'External Package Organizations', 'LLNL Package Organizations'], languages: false, function: organize };
        options.simplifiedOrgView = { name: 'simplifiedOrgView', text: 'Organizations connected by shared dependencies', labels: ['LLNL Organizations', 'External Package Organizations', 'LLNL Package Organizations'], languages: false, function: simplifyOrganize };
        const optionsArray = Object.values(options);

        // Options slider
        const slider = d3.sliderLeft()
            .domain([0, optionsArray.length - 1])
            .step(1)
            .tickFormat(d => {
                return optionsArray[Math.round(d)].text;
            })
            .ticks(optionsArray.length - 1)
            .height(10 * optionsArray.length - 1)
            .on('onchange', val => {
                if (typeof _paq !== 'undefined') {
                    _paq.push(['trackEvent', 'Dependency Graph', 'Dimension Change', optionsArray[val].text]);
                }
                optionChanged(optionsArray[Math.round(val)]);
                d3.select('.' + adjacentAreaID).select('g').remove();
            });

        // Slider group
        chart.append('g')
            .attr('transform', `translate(${width / 2 - margin.right / 2},${0 - height / 2 + margin.top / 2})`)
            .call(slider);

        let currentOption = 'normalView';
        
        // What to do when the option slider is changed
        function optionChanged(o) {
            currentOption = o.name;
            options[o.name].function();
            if (colorLanguage && o.languages) {
                updateLegend(languages, languageColors);
            } else {
                updateLegend(options[o.name].labels);
            }
        }

        // Finds all nodes and links in a certain depth and marks nodes by distance from node (not technically a tree)
        function getBFSTree(node, depth) {
            node.depth = 0;
            let nodeArray = [node];
            let linkArray = [];
            for (var i = 0; i < depth; i++) {
                linkArray = currentAdjacentEdges(nodeArray);
                nodeArray = linksToNodes(linkArray);
                nodeArray.forEach(d => {
                    d.depth = d.depth != null ? d.depth : i + 1;
                });
            }
            return { nodes: nodeArray, links: linkArray };
        }

        // Finds all edges upon which nodes in array are incident
        function adjacentEdges(nodeArray) {
            return data.links.filter(d => nodeArray.some(o => o.id == d.source.id) || nodeArray.some(o => o.id == d.target.id));
        }

        // Finds all edges upon which nodes in array are incident
        function currentAdjacentEdges(nodeArray) {
            return links.filter(d => nodeArray.some(o => o.id == d.source.id) || nodeArray.some(o => o.id == d.target.id));
        }

        // Converts an array of links to an array of nodes
        function linksToNodes(linkArray) {
            const nodeList = {};
            for (var l of linkArray) {
                nodeList[l.source.id] = l.source;
                nodeList[l.target.id] = l.target;
            }
            return Object.values(nodeList);
        }

        // Exponential decay curve for opacity gradient
        function weightCurve(i, max) {
            const b = 1;
            const c = Math.exp(b) / (Math.exp(max * b) - Math.exp(b));
            const a = (1 + c) * Math.exp(b);
            return a * Math.exp(0 - b * i);
        }

        // Gets the neighbors of a node using original data
        function getNeighbors(node) {
            return linksToNodes(adjacentEdges([node])).filter(d => d.id != node.id);
        }

        // Gets the neighbors of a node in the current graph
        function getCurrentNeighbors(node) {
            return linksToNodes(currentAdjacentEdges([node])).filter(d => d.id != node.id);
        }

        // Returns the links needed to form the complete graph on the node array
        function computeCompleteGraph(nodeArray) {
            const linkArray = [];
            for (var i = 0; i < nodeArray.length - 1; i++) {
                for (var j = i + 1; j < nodeArray.length; j++) {
                    linkArray.push({ source: nodeArray[i], target: nodeArray[j], value: 1 });
                }
            }
            return linkArray;
        }

        // Switches to view where repos are connected based on shared dependencies. Number of links represents number of shared packages
        function simplify() {
            const newLinks = [];
            const newNodes = [];

            // Uses original data to create a list of internal repos connected by shared dependencies
            data.nodes.forEach(d => {
                if (d.package) {
                    const neighbors = getNeighbors(d).filter(d => d.notPackage);
                    if (neighbors.length > 1) {
                        newLinks.push.apply(newLinks, computeCompleteGraph(neighbors));
                    }
                }
                if (d.notPackage) {
                    newNodes.push(d);
                }
            });

            simulation.nodes(newNodes);
            simulation.force('link').links(newLinks).distance(30);
            simulation.force('charge').strength(-110);

            node.selectAll('circle')
                .data(newNodes)
                .join('circle')
                    .style('cursor', 'pointer')
                    .attr('r', 5)
                    .attr('class', 'inGraph')
                    .attr('language', d => d.language)
                    .attr('id', d => d.id)
                    .attr('searched', undefined)
                    .attr('fill-opacity', 1)
                    .attr('stroke-opacity', 1)
                    .attr('fill', d => {
                        if (d.notPackage && !d.package) {
                            return colors[0];
                        } else if (!d.notPackage && d.package) {
                            return colors[1];
                        } else {
                            return colors[2];
                        }
                    })
                .on('mouseover', d => {
                    const bfsTree = getBFSTree(d, 11);
                    const t = chart.transition().duration(300);
                    node.selectAll('circle').transition(t)
                        .attr('fill-opacity', n => n.depth != null ? Math.max(weightCurve(n.depth, 12), 0) : 0)
                        .attr('stroke-opacity', n => n.depth != null ? Math.max(weightCurve(n.depth, 12), 0) : 0);
                    link.selectAll('line').transition(t)
                        .attr('stroke-opacity', n => n.source.depth != null && n.target.depth != null ? Math.max(weightCurve(Math.max(n.source.depth, n.target.depth), 12) * 0.2, 0) : 0.05);
                    nodeTip.show(d);
                })
                .on('mouseout', d => {
                    node.selectAll('circle').each(d => d.depth = null);
                    const t = chart.transition().duration(300);
                    node.selectAll('circle').transition(t)
                        .attr('fill-opacity', d => {
                            if (document.getElementById(d['id']).getAttribute('searched')) {
                                return document.getElementById(d['id']).getAttribute('searched') === 'true' ? 1 : 0.2;
                            } else {
                                return 1;
                            }
                        })
                        .attr('stroke-opacity', d => {
                            if (document.getElementById(d['id']).getAttribute('searched')) {
                                return document.getElementById(d['id']).getAttribute('searched') === 'true' ? 1 : 0.2;
                            } else {
                                return 1;
                            }
                        });
                    link.selectAll('line').transition(t)
                        .attr('stroke-opacity', 0.2);
                    nodeTip.hide(d);
                })
                .on('click', d => {
                    node.selectAll('circle').each(d => {
                        d['focused'] = false;
                        document.getElementById(d['id']).removeAttribute('searched');
                    });
                    d['focused'] = true;
                    node.selectAll('circle').attr('r', d => d.focused ? 8 : 5);
                    draw_connection_tree({ name: d.name, id: d.id, package: d.package, id: d.id, notPackage: d.notPackage, children: getCurrentNeighbors(d), language: d.language, color: d.color }, adjacentAreaID);
                });

            link.selectAll('line')
                .data(newLinks)
                .join(enter => enter.append('line'),
                    update => update,
                    exit => exit.remove())
                    .attr('stroke-width', 2)
                    .on('mouseover', linkTip.show)
                    .on('mouseout', linkTip.hide);

            link.selectAll('line').attr('stroke-opacity', 0.2)

            nodes = newNodes;
            links = newLinks;

            simulation.restart().alpha(1);

            colorByLanguage(colorLanguage);

            orgSelected = false;
        }

        // Recomputes and draws the original view
        function redraw() {
            const newNodes = data.nodes;
            const newLinks = data.links;

            simulation.nodes(newNodes);
            simulation.force('link').links(newLinks).distance(10);
            simulation.force('charge').strength(-20);

            node.selectAll('circle')
                .data(newNodes)
                .join('circle')
                    .style('cursor', 'pointer')
                    .attr('r', 5)
                    .attr('class', 'inGraph')
                    .attr('language', d => d.language)
                    .attr('id', d => d.id)
                    .attr('searched', undefined)
                    .attr('fill-opacity', 1)
                    .attr('stroke-opacity', 1)
                    .attr('fill', d => {
                        if (d.notPackage && !d.package) {
                            return colors[0];
                        } else if (!d.notPackage && d.package) {
                            return colors[1];
                        } else {
                            return colors[2];
                        }
                    })
                .on('mouseover', d => {
                    const bfsTree = getBFSTree(d, 11);
                    const t = chart.transition().duration(300);
                    node.selectAll('circle').transition(t)
                        .attr('fill-opacity', n => n.depth != null ? Math.max(weightCurve(n.depth, 12), 0) : 0)
                        .attr('stroke-opacity', n => n.depth != null ? Math.max(weightCurve(n.depth, 12), 0) : 0);
                    link.selectAll('line').transition(t)
                        .attr('stroke-opacity', n => n.source.depth != null && n.target.depth != null ? Math.max(weightCurve(Math.max(n.source.depth, n.target.depth), 12), 0) : 0.1);
                    nodeTip.show(d);
                })
                .on('mouseout', d => {
                    node.selectAll('circle').each(d => d.depth = null);
                    const t = chart.transition().duration(300);
                    node.selectAll('circle').transition(t)
                        .attr('fill-opacity', d => {
                            if (document.getElementById(d['id']).getAttribute('searched')) {
                                return document.getElementById(d['id']).getAttribute('searched') === 'true' ? 1 : 0.2;
                            } else {
                                return 1;
                            }
                        })
                        .attr('stroke-opacity', d => {
                            if (document.getElementById(d['id']).getAttribute('searched')) {
                                return document.getElementById(d['id']).getAttribute('searched') === 'true' ? 1 : 0.2;
                            } else {
                                return 1;
                            }
                        });
                    link.selectAll('line').transition(t)
                        .attr('stroke-opacity', 0.6);
                    nodeTip.hide(d);
                })
                .on('click', d => {
                    if (d && typeof _paq !== 'undefined') {
                        _paq.push(['trackEvent', 'Dependency Graph', 'Repository - Click', d.id]);
                    }
                    node.selectAll('circle').each(d => {
                        d['focused'] = false;
                        document.getElementById(d['id']).removeAttribute('searched');
                    });
                    d['focused'] = true;
                    node.selectAll('circle').attr('r', d => d.focused ? 8 : 5);
                    draw_connection_tree({ name: d.name, id: d.id, package: d.package, id: d.id, notPackage: d.notPackage, children: getCurrentNeighbors(d), language: d.language, color: d.color }, adjacentAreaID);
                });

            link.selectAll('line')
                .data(newLinks)
                .join(enter => enter.append('line'),
                    update => update,
                    exit => exit.remove())
                    .attr('stroke-width', d => (100 - d.value) / 50)
                    .attr('stroke-opacity', 0.6)
                    .on('mouseover', linkTip.show)
                    .on('mouseout', linkTip.hide);

            nodes = newNodes;
            links = newLinks;

            simulation.restart().alpha(1);

            colorByLanguage(colorLanguage);

            orgSelected = false;
        }

        // Switches to view where orgs are connected by dependencies
        function organize() {
            const orgs = {};
            data.nodes.forEach(d => {
                const orgName = d.id.split('/')[0];
                const package = d.package;
                const notPackage = d.notPackage;
                const verified = d.verified;
                if (orgs.hasOwnProperty(orgName)) {
                    orgs[orgName].package = orgs[orgName].package || package;
                    orgs[orgName].notPackage = orgs[orgName].notPackage || notPackage;
                } else {
                    orgs[orgName] = { name: orgName, id: orgName, package: package, notPackage: notPackage, verified: verified };
                }
            })

            nodes = Object.values(orgs).filter(d => {
                if (d.package && !d.notPackage) {
                    return d.verified === true || d.verified === false;
                } else {
                    return true;
                }
            });

            const newLinks = [];

            data.links.forEach(d => {
                const sourceOrgName = d.source.id.split('/')[0];
                const targetOrgName = d.target.id.split('/')[0];
                if (nodes.some(o => o.id == targetOrgName) && nodes.some(o => o.id == sourceOrgName))
                    newLinks.push({ source: sourceOrgName, target: targetOrgName, value: 1 });
            });

            links = newLinks;

            simulation.nodes(nodes);
            simulation.force('link').links(links).distance(40);
            simulation.force('charge').strength(-40);

            node.selectAll('circle')
                .data(nodes)
                .join('circle')
                    .style('cursor', 'pointer')
                    .attr('r', 5)
                    .attr('class', 'inGraph')
                    .attr('language', '')
                    .attr('id', d => d.id)
                    .attr('searched', undefined)
                    .attr('fill-opacity', 1)
                    .attr('stroke-opacity', 1)
                    .attr('fill', d => {
                        if (d.notPackage && !d.package) {
                            return colors[0];
                        } else if (!d.notPackage && d.package) {
                            return colors[1];
                        } else {
                            return colors[2];
                        }
                    })
                .on('mouseover', d => {
                    const bfsTree = getBFSTree(d, 11);
                    const t = chart.transition().duration(300);
                    node.selectAll('circle').transition(t)
                        .attr('fill-opacity', n => n.depth != null ? Math.max(weightCurve(n.depth, 12), 0) : 0)
                        .attr('stroke-opacity', n => n.depth != null ? Math.max(weightCurve(n.depth, 12), 0) : 0);
                    link.selectAll('line').transition(t)
                        .attr('stroke-opacity', n => n.source.depth != null && n.target.depth != null ? Math.max(weightCurve(Math.max(n.source.depth, n.target.depth), 12) * 0.2, 0) : 0.05);
                    nodeTip.show(d);
                })
                .on('mouseout', d => {
                    node.selectAll('circle').each(d => d.depth = null);
                    const t = chart.transition().duration(300);
                    node.selectAll('circle').transition(t)
                        .attr('fill-opacity', d => {
                            if (document.getElementById(d['id']).getAttribute('searched')) {
                                return document.getElementById(d['id']).getAttribute('searched') === 'true' ? 1 : 0.2;
                            } else {
                                return 1;
                            }
                        })
                        .attr('stroke-opacity', d => {
                            if (document.getElementById(d['id']).getAttribute('searched')) {
                                return document.getElementById(d['id']).getAttribute('searched') === 'true' ? 1 : 0.2;
                            } else {
                                return 1;
                            }
                        });
                    link.selectAll('line').transition(t)
                        .attr('stroke-opacity', 0.2);
                    nodeTip.hide(d);
                })
                .on('click', d => {
                    node.selectAll('circle').each(d => {
                        d['focused'] = false;
                        document.getElementById(d['id']).removeAttribute('searched');
                    });
                    d['focused'] = true;
                    node.selectAll('circle').attr('r', d => d.focused ? 8 : 5);
                    draw_connection_tree({ name: d.name, id: d.id, package: d.package, id: d.id, notPackage: d.notPackage, children: getCurrentNeighbors(d), language: d.language, color: d.color }, adjacentAreaID);
                });

            link.selectAll('line')
                .data(links)
                .join(enter => enter.append('line'),
                    update => update,
                    exit => exit.remove())
                    .attr('stroke-width', d => (100 - d.value) / 50)
                    .on('mouseover', linkTip.show)
                    .on('mouseout', linkTip.hide);

            link.selectAll('line').attr('stroke-opacity', 0.2);

            simulation.restart().alpha(1);

            orgSelected = true;
        }

        // Runs the simplify algorithm on the organization view
        function simplifyOrganize() {
            const orgs = {};
            data.nodes.forEach(d => {
                const orgName = d.id.split('/')[0];
                const package = d.package;
                const notPackage = d.notPackage;
                if (orgs.hasOwnProperty(orgName)) {
                    orgs[orgName].package = orgs[orgName].package || package;
                    orgs[orgName].notPackage = orgs[orgName].notPackage || notPackage;
                } else {
                    orgs[orgName] = { name: orgName, id: orgName, package: package, notPackage: notPackage };
                }
            });

            nodes = Object.values(orgs);

            const newLinks = [];

            data.links.forEach(d => {
                const sourceOrgName = d.source.id.split('/')[0];
                const targetOrgName = d.target.id.split('/')[0];
                newLinks.push({ source: orgs[sourceOrgName], target: orgs[targetOrgName], value: 1 });
            });

            links = newLinks;

            const finalLinks = [];
            const finalNodes = [];

            nodes.forEach(d => {
                if (d.package) {
                    const neighbors = getCurrentNeighbors(d).filter(d => d.notPackage);
                    if (neighbors.length > 1) {
                        finalLinks.push.apply(finalLinks, computeCompleteGraph(neighbors));
                    }
                }
                if (d.notPackage) {
                    finalNodes.push(d);
                }
            });

            nodes = finalNodes;
            links = finalLinks;

            simulation.nodes(nodes);
            simulation.force('link').links(links).distance(200);
            simulation.force('charge').strength(-400);

            node.selectAll('circle')
                .data(nodes)
                .join('circle')
                    .style('cursor', 'pointer')
                    .attr('r', 5)
                    .attr('class', 'inGraph')
                    .attr('language', '')
                    .attr('id', d => d.id)
                    .attr('searched', undefined)
                    .attr('fill-opacity', 1)
                    .attr('stroke-opacity', 1)
                    .attr('fill', d => {
                        if (d.notPackage && !d.package) {
                            return colors[0];
                        } else if (!d.notPackage && d.package) {
                            return colors[1];
                        } else {
                            return colors[2];
                        }
                    })
                .on('mouseover', d => {
                    const bfsTree = getBFSTree(d, 11);
                    const t = chart.transition().duration(300);
                    node.selectAll('circle').transition(t)
                        .attr('fill-opacity', n => n.depth != null ? Math.max(weightCurve(n.depth, 12), 0) : 0)
                        .attr('stroke-opacity', n => n.depth != null ? Math.max(weightCurve(n.depth, 12), 0) : 0);
                    link.selectAll('line').transition(t)
                        .attr('stroke-opacity', n => n.source.depth != null && n.target.depth != null ? Math.max(weightCurve(Math.max(n.source.depth, n.target.depth), 12) * 0.2, 0) : 0.05);
                    nodeTip.show(d);
                })
                .on('mouseout', d => {
                    node.selectAll('circle').each(d => d.depth = null);
                    const t = chart.transition().duration(300);
                    node.selectAll('circle').transition(t)
                        .attr('fill-opacity', d => {
                            if (document.getElementById(d['id']).getAttribute('searched')) {
                                return document.getElementById(d['id']).getAttribute('searched') === 'true' ? 1 : 0.2;
                            } else {
                                return 1;
                            }
                        })
                        .attr('stroke-opacity', d => {
                            if (document.getElementById(d['id']).getAttribute('searched')) {
                                return document.getElementById(d['id']).getAttribute('searched') === 'true' ? 1 : 0.2;
                            } else {
                                return 1;
                            }
                        });
                    link.selectAll('line').transition(t)
                        .attr('stroke-opacity', 0.2);
                    nodeTip.hide(d);
                })
                .on('click', d => {
                    node.selectAll('circle').each(d => {
                        d['focused'] = false;
                        document.getElementById(d['id']).removeAttribute('searched');
                    });
                    d['focused'] = true;
                    node.selectAll('circle').attr('r', d => d.focused ? 8 : 5);
                    draw_connection_tree({ name: d.name, id: d.id, package: d.package, id: d.id, notPackage: d.notPackage, children: getCurrentNeighbors(d), language: d.language, color: d.color }, adjacentAreaID);
                });

            link.selectAll('line')
                .data(links)
                .join(enter => enter.append('line'),
                    update => update,
                    exit => exit.remove())
                    .attr('stroke-width', d => (100 - d.value) / 50)
                    .on('mouseover', linkTip.show)
                    .on('mouseout', linkTip.hide);

            link.selectAll('line').attr('stroke-opacity', 0.2);

            simulation.restart().alpha(1);

            orgSelected = true;
        }

        // Constants that dictate the size of the tree generated on click
        const treeWidth = stdTotalWidth * 0.9 + 50 - margin.left - margin.right,
            treeHeight = stdTotalHeight * 2 - margin.top - margin.bottom;

        const svg = d3.select('.' + adjacentAreaID)
            .attr('width', treeWidth)
            .attr('height', treeHeight);

        svg.append('polyline')
            .attr('points', `${margin.left / 2},${margin.top / 2} ${treeWidth - margin.right / 2},${margin.top / 2} ${treeWidth - margin.right / 2},${treeHeight - margin.bottom / 2} ${margin.left / 2},${treeHeight - margin.bottom / 2} ${margin.left / 2},${margin.top / 2}`)
            .attr('fill', 'none')
            .attr('stroke', 'black');

        // Generates and draws tree of neighbors to clicked node
        function draw_connection_tree(data, adjacentAreaID) {
            d3.select('.' + adjacentAreaID).select('g').remove();

            function compare(a,b) {
                a = a.name.toUpperCase();
                b = b.name.toUpperCase();
                if (a > b) {
                    return 1;
                } else if (a < b) {
                    return -1;
                } else {
                    return 0;
                }
            }

            data.children.sort((a,b) => compare(a,b));
            
            const root = d3.tree().size([Math.min(Math.max(data.children.length * 15, treeWidth), treeHeight - margin.top), treeWidth * 0.3])(d3.hierarchy(data));
            
            const treeChart = svg
                .append('g');

            const treeLink = treeChart.append('g')
                .attr('fill', 'none')
                .attr('stroke', '#555')
                .attr('stroke-opacity', 0.4)
                .attr('stroke-width', 1.5)
                .selectAll('path')
                .data(root.links())
                    .join('path')
                        .attr('d', d3.linkHorizontal()
                            .x(d => d.y)
                            .y(d => d.x));

            const treeNode = treeChart.append('g')
                .selectAll('g')
                .data(root.descendants())
                    .join('g')
                        .attr('transform', d => `translate(${d.y},${d.x})`);

            treeNode.append('circle')
                .attr('fill', d => {
                    if (colorLanguage && !orgSelected) {
                        return d.data.language == 'CMake' ? '#777' : d.data.color;
                    } else {
                        if (d.data.notPackage && !d.data.package) {
                            return colors[0];
                        } else if (!d.data.notPackage && d.data.package) {
                            return colors[1];
                        } else {
                            return colors[2];
                        }
                    }
                })
                .attr('r', 5)
                .style('cursor', d => d.depth == 0 ? 'default' : 'pointer')
                .on('mouseover', d => {
                    d = nodes[nodes.findIndex(o => o.id == d.data.id)];
                    const bfsTree = getBFSTree(d, 11);
                    const t = chart.transition().duration(300);
                    node.selectAll('circle').transition(t)
                        .attr('fill-opacity', n => n.depth != null ? Math.max(weightCurve(n.depth + 1, 4), 0) : 0)
                        .attr('stroke-opacity', n => n.depth != null ? Math.max(weightCurve(n.depth + 1, 4), 0) : 0);
                    link.selectAll('line').transition(t)
                        .attr('stroke-opacity', n => n.source.depth != null && n.target.depth != null ? Math.max(weightCurve(Math.max(n.source.depth, n.target.depth), 12) * 0.2, 0) : 0.05);
                    nodeTip.show(d);
                })
                .on('mouseout', d => {
                    node.selectAll('circle').each(d => d.depth = null);
                    const t = chart.transition().duration(300);
                    node.selectAll('circle').transition(t)
                        .attr('fill-opacity', 1)
                        .attr('stroke-opacity', 1);
                    link.selectAll('line').transition(t)
                        .attr('stroke-opacity', () => currentOption == 'normalView' ? 0.6 : 0.2);
                    nodeTip.hide(d)
                })
                .on('click', d => {
                    if (d && typeof _paq !== 'undefined') {
                        _paq.push(['trackEvent', 'Dependency Graph', 'Repository - Click', d.data.id]);
                    }
                    nodeTip.hide(d);
                    d = nodes[nodes.findIndex(o => o.id == d.data.id)];
                    const data = { name: d.name, package: d.package, id: d.id, notPackage: d.notPackage, children: getCurrentNeighbors(d) };
                    draw_connection_tree(data, adjacentAreaID);
                    node.selectAll('circle').each(d => d.depth = null);
                    const t = chart.transition().duration(300);
                    node.selectAll('circle').transition(t)
                        .attr('fill-opacity', 1)
                        .attr('stroke-opacity', 1);
                    link.selectAll('line').transition(t)
                        .attr('stroke-opacity', () => currentOption == 'normalView' ? 0.6 : 0.2);
                    node.selectAll('circle').each(d => d['focused'] = false);
                    d['focused'] = true;
                    node.selectAll('circle').attr('r', d => d.focused ? 8 : 5);
                });
            
            treeNode.append('text')
                .attr('dy', '0.31em')
                .attr('x', d => d.children ? -6 : 6)
                .attr('text-anchor', d => d.children ? 'end' : 'start')
                .text(d => d.data.id);

            let labelLeft = 0;

            treeNode.selectAll('text').nodes().forEach(label => {
                if (label.textContent == data.id) {
                    labelLeft = label.getComputedTextLength();
                }
            });

            treeNode.selectAll('text').nodes().forEach(label => {
                if (label.textContent == data.id) {
                    label.setAttribute('font-size', '14px');
                } else if (label.getComputedTextLength() > treeWidth - (labelLeft + treeWidth * 0.3 + margin.left + margin.right) && label.textContent != data.name) {
                    label.setAttribute('font-size', 14 * (treeWidth - (labelLeft + treeWidth * 0.3 + margin.left + margin.right)) / label.getComputedTextLength() + 'px');
                }
            });

            treeChart
                .attr('transform', `translate(${margin.left + labelLeft},${(treeHeight / 2) - root.x + 5})`);
        }

        // Colors the graph based on language colors if check is true
        function colorByLanguage(check) {
            if (check) {
                node.selectAll('circle')
                    .attr('fill', d => {
                        return d.language == 'CMake' ? '#777' : d.color;
                    });

                let languageEntries = {};

                node.selectAll('circle').each(d => {
                    if (d.language == 'CMake') {
                        languageEntries[d.language] = '#777';
                    } else if (d.language != null) {
                        languageEntries[d.language] = d.color;
                    }
                });

                languageColors = [];

                languages = Object.keys(languageEntries);
                languages.forEach(d => {
                    languageColors.push(languageEntries[d]);
                })
            } else {
                node.selectAll('circle')
                    .attr('fill', d => {
                        if (d.notPackage && !d.package) {
                            return colors[0];
                        } else if (!d.notPackage && d.package) {
                            return colors[1];
                        } else {
                            return colors[2];
                        }
                    });
            }
        }
    }

    // Converts json file to usable data
    function reformatData(obj, obj2) {
        const nodes = [];
        const links = [];
        for (var repo in obj['data']) {
            if (!nodes.some(d => d.id == repo)) {
                nodes.push({ name: repo.split('/')[1], id: repo, package: false, notPackage: true, verified: undefined, language: obj['data'][repo]['languages']['nodes'][0] ? obj['data'][repo]['languages']['nodes'][0]['name'] : null, color: obj['data'][repo]['languages']['nodes'][0] ? obj['data'][repo]['languages']['nodes'][0]['color'] : null });
            } else {
                nodes[nodes.findIndex(d => d.id == repo)].notPackage = true;
            }
            for (var manifest of obj['data'][repo]['dependencyGraphManifests']['nodes']) {
                for (var node of manifest['dependencies']['nodes']) {
                    if (node['repository'] === null) {
                        continue;
                    }
                    if (!nodes.some(d => d.id == node['repository']['nameWithOwner'])) {
                        nodes.push({ name: node['repository']['nameWithOwner'].split('/')[0], id: node['repository']['nameWithOwner'], package: true, notPackage: false, verified: obj2['data'][node['repository']['nameWithOwner']]['owner']['isVerified'], language: obj2['data'][node['repository']['nameWithOwner']]['languages']['nodes'][0] ? obj2['data'][node['repository']['nameWithOwner']]['languages']['nodes'][0]['name'] : null, color: obj2['data'][node['repository']['nameWithOwner']]['languages']['nodes'][0] ? obj2['data'][node['repository']['nameWithOwner']]['languages']['nodes'][0]['color'] : null });
                    } else {
                        nodes[nodes.findIndex(d => d.id == node['repository']['nameWithOwner'])].package = true;
                    }
                    if (!links.some(d => (d.source == repo && d.target == node['repository']['nameWithOwner']) || (d.source == node['repository']['nameWithOwner'] && d.target == repo))) {
                        links.push({ source: repo, target: node['repository']['nameWithOwner'], value: 1 });
                    }
                }
            }
        }
        return { nodes: nodes.filter(d => links.some(o => d.id == o.source || d.id == o.target)), links: links };
    }
}

function searchForm(event) {
    event.preventDefault();
    var searchQueryElement = document.getElementById('search').value.toUpperCase(),
        rawSearchQueryValue = searchQueryElement.value,
        searchQueryValue = rawSearchQueryValue.toUpperCase();
    if (typeof _paq !== 'undefined') {
        _paq.push(['trackEvent', 'Dependency Graph', 'Search', searchQueryValue]);
    }
    $('.inGraph').attr('fill-opacity', function(i, d) {
        return $(this).attr('id').toUpperCase().includes(searchQueryValue) || ($(this).attr('language') && $(this).attr('language').toUpperCase().includes(document.getElementById('search').value.toUpperCase())) ? 1 : 0.2;
    });

    $('.inGraph').attr('stroke-opacity', function(i, d) {
        return $(this).attr('id').toUpperCase().includes(searchQueryValue) || ($(this).attr('language') && $(this).attr('language').toUpperCase().includes(document.getElementById('search').value.toUpperCase())) ? 1 : 0.2;
    });
    
    $('.inGraph').attr('r', function(i, d) {
        return $(this).attr('id').toUpperCase().includes(searchQueryValue) || ($(this).attr('language') && $(this).attr('language').toUpperCase().includes(document.getElementById('search').value.toUpperCase())) ? 6.5 : 5;
    });

    $('.inGraph').attr('searched', function(i, d) {
        return $(this).attr('id').toUpperCase().includes(searchQueryValue) || (($(this).attr('language') != null) && $(this).attr('language').toUpperCase().includes(document.getElementById('search').value.toUpperCase()));
    });
}