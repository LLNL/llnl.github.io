function draw_force_graph(areaID) {
    // URL for data
    var url = ghDataDir + '/labRepos_Dependencies.json';
    var files = [url];
    // Converts json file into object, reformats data, and then draws graph.
    Promise.all(files.map(url => d3.json(url))).then(values => drawGraph(reformatData(values[0]), areaID));

    // Draws graph
    function drawGraph(data, areaID) {
        const graphHeader = 'LLNL Dependencies';

        const margin = { top: stdMargin.top, right: stdMargin.right / 2, bottom: stdMargin.bottom / 2, left: stdMargin.left / 2 },
            width = stdTotalWidth * 2 - margin.left - margin.right,
            height = stdTotalHeight * 2 - margin.top - margin.bottom;
        const legendRectSize = 15,
            legendSpacing = 4;

        const colors = ['#6baed6', 'seagreen', '#3182bd'];

        const chart = d3
            .select('.' + areaID)
                .attr('width', width)
                .attr('height', height)
                .attr('viewBox', [-width / 2, -height / 2, width, height]);

        let nodes = data.nodes;
        let links = data.links;

        // Adds static, directional, and link forces to nodes
        const simulation = d3.forceSimulation(nodes)
            .force('link', d3.forceLink(links).id(d => d.id).distance(d => 5))
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
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', (Math.min(width - margin.left - margin.right, height - margin.top - margin.bottom) + 4) / 2)
            .attr('fill', '#FFFFFF')
            .attr('stroke', '#000000');

        // Group for links
        const link = chart
            .append('g')
                .attr('stroke', '#999')
                .attr('stroke-opacity', 0.6);
        
        // Adds links
        link.selectAll('line')
            .data(links)
            .join('line')
                .attr('stroke-width', d => (100 - d.value) / 50);

        // Group for nodes
        const node = chart
            .append('g')
                .attr('stroke', '#fff')
                .attr('stroke-width', 1.5);

        // Adds nodes
        node.selectAll('circle')
            .data(nodes)
            .join('circle')
                .attr('r', 5)
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
            })
            .on('mouseout', d => {
                node.selectAll('circle').each(d => d.depth = null);
                const t = chart.transition().duration(300);
                node.selectAll('circle').transition(t)
                    .attr('fill-opacity', 1)
                    .attr('stroke-opacity', 1);
                link.selectAll('line').transition(t)
                    .attr('stroke-opacity', 0.6);
            });

        // Adds titles
        node.selectAll('circle').append('title').text(d => d.id);
        link.selectAll('line').append('title').text(d => `${d.source.name} : ${d.target.name}`);

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
        const legendMap = [];
        colors.forEach((d, i) => {
            legendMap.push({ text: labels[i], color: d });
        });

        // Creates legend
        const legend = chart
            .append('g')
            .attr('id', 'foo')
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
        legend
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
        legend
            .append('text')
            .attr('x', legendRectSize + legendSpacing)
            .attr('y', legendRectSize - legendSpacing)
            .text(d => {
                return d.text;
            })
            .attr('text-anchor', 'start');

        const options = {};

        // Options for graph view
        options.normalView = { name: 'normalView', text: 'Repos connected to dependencies', function: redraw };
        options.simplifiedView = { name: 'simplifiedView', text: 'Repos connected by shared dependencies', function: simplify };
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
                optionChanged(optionsArray[Math.round(val)]);
            });

        chart.append('g')
            .attr('transform', `translate(${width / 2 - margin.right / 2},${0 - height / 2 + margin.top / 2})`)
            .call(slider);
        
        // What to do when the option slider is changed
        function optionChanged(o) {
            options[o.name].function();
        }

        // Finds all nodes and links in a certain depth and marks nodes by distance from node (not technically a tree)
        function getBFSTree(node, depth) {
            node.depth = 0;
            let nodeArray = [node];
            let linkArray = [];
            for (var i = 0; i < depth; i++) {
                linkArray = adjacentEdges(nodeArray);
                nodeArray = linksToNodes(linkArray);
                nodeArray.forEach(d => {
                    d.depth = d.depth ? d.depth : i + 1;
                });
            }
            return { nodes: nodeArray, links: linkArray };
        }

        // Finds all edges upon which nodes in array are incident
        function adjacentEdges(nodeArray) {
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

        // Gets the neighbors of a node
        function getNeighbors(node) {
            return linksToNodes(adjacentEdges([node])).filter(d => d.id != node.id);
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

            nodes.forEach(d => {
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
            simulation.force('charge').strength(-120);

            node.selectAll('circle').selectAll('title').remove();
            link.selectAll('line').selectAll('title').remove();

            node.selectAll('circle')
                .data(newNodes)
                .join('circle')
                    .attr('r', 5)
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
                })
                .on('mouseout', d => {
                    node.selectAll('circle').each(d => d.depth = null);
                    const t = chart.transition().duration(300);
                    node.selectAll('circle').transition(t)
                        .attr('fill-opacity', 1)
                        .attr('stroke-opacity', 1);
                    link.selectAll('line').transition(t)
                        .attr('stroke-opacity', 0.2);
                });

            link.selectAll('line')
                .data(newLinks)
                .join(enter => enter.append('line'),
                    update => update,
                    exit => exit.remove())
                    .attr('stroke-width', d => (100 - d.value) / 50);

            link.selectAll('line').attr('stroke-opacity', 0.2)

            node.selectAll('circle').append('title').text(d => d.id);
            link.selectAll('line').append('title').text(d => `${d.source.name} : ${d.target.name}`);

            nodes = newNodes;
            links = newLinks;

            simulation.restart().alpha(1);
        }

        // Recomputes and draws the original view
        function redraw() {
            const newNodes = data.nodes;
            const newLinks = data.links;

            simulation.nodes(newNodes);
            simulation.force('link').links(newLinks).distance(5);
            simulation.force('charge').strength(-20);

            node.selectAll('circle').selectAll('title').remove();
            link.selectAll('line').selectAll('title').remove();

            node.selectAll('circle')
                .data(newNodes)
                .join('circle')
                    .attr('r', 5)
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
                })
                .on('mouseout', d => {
                    node.selectAll('circle').each(d => d.depth = null);
                    const t = chart.transition().duration(300);
                    node.selectAll('circle').transition(t)
                        .attr('fill-opacity', 1)
                        .attr('stroke-opacity', 1);
                    link.selectAll('line').transition(t)
                        .attr('stroke-opacity', 0.6);
                })
                .append('title').text(d => d.id);

            link.selectAll('line')
                .data(newLinks)
                .join(enter => enter.append('line'),
                    update => update,
                    exit => exit.remove())
                    .attr('stroke-width', d => (100 - d.value) / 50);

            link.selectAll('line').attr('stroke-opacity', 0.6).append('title').text(d => `${d.source.name} : ${d.target.name}`);

            nodes = newNodes;
            links = newLinks;

            simulation.restart().alpha(1);
        }
    }

    // Converts json file to usable data
    function reformatData(obj) {
        const nodes = [];
        const links = [];
        for (var repo in obj['data']) {
            if (!nodes.some(d => d.id == repo)) {
                nodes.push({ name: repo.split('/')[1], id: repo, package: false, notPackage: true });
            } else {
                nodes[nodes.findIndex(d => d.id == repo)].notPackage = true;
            }
            for (var manifest of obj['data'][repo]['dependencyGraphManifests']['nodes']) {
                for (var node of manifest['dependencies']['nodes']) {
                    if (node['repository'] === null) {
                        continue;
                    }
                    if (!nodes.some(d => d.id == node['repository']['nameWithOwner'])) {
                        nodes.push({ name: node['repository']['name'], id: node['repository']['nameWithOwner'], package: true, notPackage: false });
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