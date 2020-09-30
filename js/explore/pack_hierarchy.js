/* Creates line graph visualization for webpage */
function draw_pack_hierarchy(areaID) {
    // load data file, process data, and draw visualization
    var url1 = ghDataDir + '/labUsers.json';
    var url2 = ghDataDir + '/extUsers.json';
    var files = [url1, url2];
    Promise.all(files.map(url => d3.json(url))).then(values => {
        var data = reformatData(values[0], values[1]);
        drawGraph(data, areaID);
    });

    function drawGraph(data, areaID) {
        const graphHeader = 'Organizations and Contributions';

        const margin = { top: stdMargin.top, right: stdMargin.right, bottom: stdMargin.bottom, left: stdMargin.left },
            width = stdTotalWidth * 2 - margin.left - margin.right,
            height = stdHeight * 2 - margin.top - margin.bottom;
        const legendRectSize = 15,
            legendSpacing = 4;


        const colors = ['#b3de69','#ffffb3','#bebada','#fb8072','#80b1d3'];

        const chart = d3
            .select('.' + areaID)
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
                    .attr('viewBox', `0 0 ${Math.min(width, height)} ${Math.min(width, height)}`);

        const pack = data => d3.pack()
            .size([width, height])
            .padding(2)
            (d3.hierarchy(data)
                .sum(d => d.value)
                .sort((a, b) => b.value - a.value));

        const tip = d3
            .tip()
            .attr('class', 'd3-tip')
            .offset(d => {
                return [-10, 0];
            })
            .html(function(d) {
                let returnString = '';
                if (d.data.internal != undefined) {
                    returnString += `${d.data.username} : ${d.data.internal ? 'Internal' : 'External'}`;
                } else {
                    returnString += `${d.data.name}`
                }
                d = d.parent;
                while (d.depth > focus.depth) {
                    returnString = `${d.data.name}/${returnString}`
                    d = d.parent;
                }
                return returnString;
            });

        chart.call(tip);

        const root = pack(data);
        const center = [root.x,root.y];
        const maxRadius = root.r;
        let view;
        let focus = root;

        const nodeGroup = chart.append('g').attr('id', '#NodeGraph');

        const node = nodeGroup
            .selectAll('g')
            .data(d3.nest().key(d => d.height).entries(root.descendants()))
            .enter()
                .append('g')
                    .selectAll('g')
                    .data(d => d.values)
                    .enter()
                        .append('g')
                            .attr('transform', d => `translate(${d.x},${d.y})`);
        
        const parentNodes = node.filter(d => d.children != undefined); 
        const childNodes = node.filter(d => d.children == undefined);

        let label = chart.append('g')
            .selectAll('text')
                .data(data)
                .join('text')
                    .attr('text-anchor', 'middle')
                    .attr('font-size', '12px')
                    .attr('dy', '0.35em')
                    .attr('fill-opacity', 1)
                    .style('cursor', d => {
                        if (d.children == undefined) {
                            return 'default';
                        } else {
                            return 'pointer';
                        }
                    })
                    .text(d => d.data.name.length > 10)
                    .on('click', d => {
                        if (d.children != undefined) {
                            clicked(d);
                        }
                    });

        function updateLabel(data) {
            label = label
                .data(data)
                .join('text')
                    .attr('text-anchor', 'middle')
                    .attr('font-size', '10px')
                    .attr('dy', '0.35em')
                    .attr('fill-opacity', 0)
                    .attr('radius', d => d.r * (maxRadius / d.parent.r))
                    .attr('pointer-events', 'none')
                    .text(d => {return d.data.name});
            
            label.nodes().forEach(node => {
                node.setAttribute('font-size', Math.floor(10 * node.getAttribute('radius') * 2 / (node.getComputedTextLength() + 5)) + 'px')
            });
        }

        updateLabel(focus.children);
        label.attr('fill-opacity', 1);
        

        // Adds title
        chart
            .append('g')
            .attr('transform', `translate(${width / 2},${0 - margin.top / 3})`)
            .append('text')
            .attr('id', 'zoomTitle')
            .attr('class', 'graphtitle')
            .attr('text-anchor', 'middle')
            .text(graphHeader);

        const parentCircles = parentNodes.append('circle')
            .attr('fill', d => colors[d.height + 1])
            .attr('r', d => d.r)
            .style('cursor', 'pointer')
            .on('mouseover', d => {
                if (d.depth >= focus.depth + 1) {
                    tip.show(d);
                }
            })
            .on('mouseout', tip.hide);

        const childCircles = childNodes.append('circle')
            .attr('fill', d => d.data.internal ? colors[d.height + 1] : colors[d.height])
            .attr('r', d => d.r)
            .on('mouseover', d => {
                if (d.parent == focus) {
                    tip.show(d);
                } else {
                    tip.show(d.parent);
                }
            })
            .on('mouseout', tip.hide)
            .on('click', d => clicked(d.parent));
        
        parentCircles.on('click', clicked);

        function clicked(o) {
            d3.select('#zoomTitle').text(() => {
                while (o.depth > focus.depth + 1) {
                    o = o.parent;
                }
                return o.data.name;
            });
            if (focus !== o) {
                zoom(o);
                d3.event.stopPropagation();
            }
        }

        getZoom([center[0], center[1], maxRadius * 2]);

        function zoom(d) {
            const focus_0 = focus;

            while (d.depth > focus.depth + 1) {
                    d = d.parent;
            }

            focus = d;

            childCircles.attr('fill-opacity', 0);

            const transition = chart.transition()
                .duration(750)
                .tween('zoom', d => {
                    const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
                    return t => getZoom(i(t));
                });

            updateLabel(focus.children);

            label.transition(transition).attr('fill-opacity', 1);

            getChildZoom([focus.x, focus.y, focus.r * 2]);
            setTimeout(() => childCircles.transition().duration(200).attr('fill-opacity', 1), 750);
        }

        function getZoom(v) {
            const k = Math.min(width / v[2] , height / v[2]);

            view = v;

            label.attr('transform', d => `translate(${(d.x - v[0]) * k + center[0]},${(d.y - v[1]) * k + center[1]})`);
            parentNodes.attr('transform', d => `translate(${(d.x - v[0]) * k + center[0]},${(d.y - v[1]) * k + center[1]})`);
            parentCircles.attr('r', d => d.r * k);
        }

        function getChildZoom(v) {
            const k = Math.min(width / v[2] , height / v[2]);

            childNodes.attr('transform', d => `translate(${(d.x - v[0]) * k + center[0]},${(d.y - v[1]) * k + center[1]})`);
            childCircles.attr('r', d => d.r * k);
        }

        // Data for legend
        const labels = ['External Contributors', 'Internal Contributors', 'Repositories', 'GitHub Organizations', 'LLNL'];
    
        // Creates legend
        const legend = chart
            .append('g');

        function updateLegend(labels, color = colors) {
            legend.selectAll('g').remove();

            const legendMap = [];
            color.forEach((d, i) => {
                legendMap.push({ text: labels[i], color: d });
            });

            legend.append('rect')
                .attr('fill', '#FFFFFF')
                .attr('fill-opacity', 0.9)
                .attr('height', labels.length * (legendRectSize + legendSpacing) + legendSpacing)
                .attr('width', 150)
                .attr('y', 0 - legendSpacing)
                .attr('x', -5)
                .attr('rx', 10);
    
            const legendEntries = legend
                .selectAll('g')
                .data(legendMap)
                    .join('g')
                    .attr('class', 'legend')
                    .attr('transform', (d, i) => {
                        const legendHeight = legendRectSize + legendSpacing;
                        const offset = (legendHeight * color.length) / 2;
                        const horizontal = 0;
                        const vertical = i * legendHeight;
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
                        return '#FFFFFF';
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

        updateLegend(labels);

    }

    // Turn json obj into desired working data
    function reformatData(obj1, obj2) {
        var data = { name: 'LLNL Organizations', children: [] };
        for (var user in obj1['data']) {
            if (obj1['data'][user]['contributedLabRepositories'] === undefined) {
                continue;
            }
            for (var ownerRepo of obj1['data'][user]['contributedLabRepositories']['nodes']) {
                let owner = ownerRepo.split('/')[0];
                let repo = ownerRepo.split('/')[1];
                if (!data.children.some(d => d.name == owner)) {
                    data.children.push({ name: owner, children: [] });
                }
                let indexOfOwner = data.children.findIndex(d => d.name == owner);
                if (!data.children[indexOfOwner].children.some(d => d.name == repo)) {
                    data.children[indexOfOwner].children.push({ name: repo, children: [] });
                }
                let indexOfRepo = data.children[indexOfOwner].children.findIndex(d => d.name == repo);
                let username = obj1['data'][user]['name'] == null ? user : obj1['data'][user]['name'];
                data.children[indexOfOwner].children[indexOfRepo].children.push({ name: user, value: 1, internal: true, username: username });
            }
        }
        for (var user in obj2['data']) {
            if (obj2['data'][user]['contributedLabRepositories'] === undefined) {
                continue;
            }
            for (var ownerRepo of obj2['data'][user]['contributedLabRepositories']['nodes']) {
                let owner = ownerRepo.split('/')[0];
                let repo = ownerRepo.split('/')[1];
                if (!data.children.some(d => d.name == owner)) {
                    data.children.push({ name: owner, children: [] });
                }
                let indexOfOwner = data.children.findIndex(d => d.name == owner);
                if (!data.children[indexOfOwner].children.some(d => d.name == repo)) {
                    data.children[indexOfOwner].children.push({ name: repo, children: [] });
                }
                let indexOfRepo = data.children[indexOfOwner].children.findIndex(d => d.name == repo);
                let username = obj2['data'][user]['name'] == null ? user : obj2['data'][user]['name'];
                data.children[indexOfOwner].children[indexOfRepo].children.push({ name: user, value: 1, internal: false, username: username });
            }
        }
        
        return data;
    }
}