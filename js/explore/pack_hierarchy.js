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
        const graphHeader = 'LLNL Repositories';

        const margin = { top: stdMargin.top, right: stdMargin.right, bottom: stdMargin.bottom, left: stdMargin.left },
            width = stdTotalWidth * 2 - margin.left - margin.right,
            height = stdHeight * 2 - margin.top - margin.bottom;

        const colors = ['#8dd3c7','#ffffb3','#bebada','#fb8072','#80b1d3','#fdb462','#b3de69','#fccde5','#d9d9d9','#bc80bd','#ccebc5','#ffed6f'];

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
            .offset([-10, 0])
            .html(function(d) {
                if (d.data.internal != undefined) {
                    return `${d.data.name} : ${d.data.internal ? 'Internal' : 'External'}`;
                } else {
                    return `${d.data.name}`
                }
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
                    .style('cursor', d => {
                        if (d.children == undefined) {
                            return 'default';
                        } else {
                            return 'pointer';
                        }
                    })
                    .text(d => {return d.data.name})
                    .on('click', d => {
                        if (d.children != undefined) {
                            clicked(d);
                        }
                    });
            
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
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);

        const childCircles = childNodes.append('circle')
            .attr('fill', d => d.data.internal ? colors[d.height + 1] : colors[d.depth + 3])
            .attr('r', d => d.r)
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);
        
        parentCircles.on('click', clicked);

        function clicked(o) {
            d3.select('#zoomTitle').text(o.data.name);
            if (focus !== o) {
                zoom(o);
                d3.event.stopPropagation();
            }
        }

        getZoom([center[0], center[1], maxRadius * 2]);

        function zoom(d) {
            const focus_0 = focus;

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

    }

    // Turn json obj into desired working data
    function reformatData(obj1, obj2) {
        var data = { name: 'LLNL Repositories', children: [] };
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
                data.children[indexOfOwner].children[indexOfRepo].children.push({ name: username, value: 1, internal: true });
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
                data.children[indexOfOwner].children[indexOfRepo].children.push({ name: username, value: 1, internal: false });
            }
        }
        
        return data;
    }
}