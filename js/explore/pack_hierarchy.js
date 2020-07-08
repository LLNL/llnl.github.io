/* Creates line graph visualization for webpage */
function draw_pack_hierarchy(areaID) {
    // load data file, process data, and draw visualization
    var url = ghDataDir + '/labUsers.json';
    d3.json(url, function(obj) {
        var data = reformatData(obj);
        drawGraph(data, areaID);
    });

    function drawGraph(data, areaID) {
        // TODO: drawGraph function should be the main function responsible for the creation of the svg
        const margin = { top: stdMargin.top, right: stdMargin.right, bottom: stdMargin.bottom, left: stdMargin.left },
            width = stdTotalWidth * 2 - margin.left - margin.right,
            height = stdHeight * 2 - margin.top - margin.bottom;

        const colors = ["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd","#ccebc5","#ffed6f"];

        const chart = d3
            .select('.' + areaID)
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        const pack = data => d3.pack()
            .size([width, height])
            .padding(2)
            (d3.hierarchy(data)
                .sum(d => d.value)
                .sort((a, b) => b.value - a.value));

        const root = pack(data);
        console.debug(root);
        const center = [root.x,root.y];
        const maxRadius = root.r;
        let view;
        let focus = root;

        const nodeGroup = chart.append('g');

        const node = nodeGroup
            .selectAll('g')
            .data(d3.nest().key(d => d.height).entries(root.descendants()))
            .enter()
                .append('g')
                    .selectAll('g')
                    .data(d => d.values)
                    .enter()
                        .append('g')
                            .attr("transform", d => `translate(${d.x},${d.y})`);
        
        const circles = node.append('circle')
            .attr('fill', d => colors[d.height + 1])
            .attr('r', d => d.r);
        
        circles.on('click', clicked);

        circles.append('title')
            .text(d => d.data.name);

        /*node.append('text')
            .attr('font-size', '10px')
            .attr('fill-opacity', d => d.r > 20 ? 1 : 0)
            .text(d => d.data.name.length > 10 ? '' : d.data.name);*/

        function clicked(o) {
            console.debug('Clicked:');
            console.debug(o);
            console.debug(this);
            if (focus !== o) {
                zoom(o);
                d3.event.stopPropagation();
            }
        }

        getZoom([center[0], center[1], maxRadius * 2]);

        function zoom(d) {
            focus = d;

            const transition = chart.transition()
                .duration(750)
                .tween('zoom', d => {
                    const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
                    return t => getZoom(i(t));
                });
        }

        function getZoom(v) {
            const k = Math.min(width / v[2] , height / v[2]);

            view = v;

            node.attr('transform', d => `translate(${(d.x - v[0]) * k + center[0]},${(d.y - v[1]) * k + center[1]})`);
            circles.attr('r', d => d.r * k);
        }

    }

    // Turn json obj into desired working data
    function reformatData(obj) {
        var data = { name: 'LLNL', children: [] };
        for (var user in obj['data']) {
            if (obj['data'][user]['contributedLabRepositories'] === undefined) {
                continue;
            }
            for (var ownerRepo of obj['data'][user]['contributedLabRepositories']['nodes']) {
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
                data.children[indexOfOwner].children[indexOfRepo].children.push({ name: user, value: 1 });
            }
        }
        
        return data;
    }
}