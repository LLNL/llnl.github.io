/* Creates a zoomable sunburst visualization for webpage */
function draw_sunburst_licenses(areaID) {
    // Load data file, process data, and draw visualization
    var url = ghDataDir + '/labReposInfo.json';
    d3.json(url, function(obj) {
        drawSunburst(obj, areaID);
    })

    function drawSunburst(obj, areaID) {
        let data = reformatData(obj, null);

        const graphHeader = 'Repo Licenses';

        const margin = { top: stdMargin.top, right: stdMargin.right / 2, bottom: stdMargin.bottom / 2, left: stdMargin.left / 2 },
            width = stdTotalWidth - margin.left - margin.right,
            height = stdTotalHeight + 100 - margin.top - margin.bottom;

        const radius = Math.min(width, height) / 6;
        const partition = data =>  {
            const root = d3
            .hierarchy(data)
            .sum(d => d.value)
            .sort((a, b) => b.value - a.value);

            return d3.partition()
                .size([2 * Math.PI, root.height + 1])
            (root);
        }

        let root = partition(data);

        const arc = d3
            .arc()
                .startAngle(d => d.x0)
                .endAngle(d => d.x1)
                .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
                .padRadius(radius * 1.5)
                .innerRadius(d => d.y0 * radius)
                .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius));

        const colors = d3.scaleOrdinal()
            .domain([0, root.children.length - 1])
            .range(["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd","#ccebc5","#ffed6f"]);
        
        const chart = d3
            .select('.' + areaID)
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)

        chart
            .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
                .append('text')
                    .attr('class', 'graphtitle')
                    .attr('x', width / 2)
                    .attr('y', 0 - margin.top / 3)
                    .attr('text-anchor', 'middle')
                    .text(graphHeader);

        const licenseNames = chart
            .append('g')
                .attr('id', 'licenseNames')
                .attr('transform', `translate(${margin.left + width / 2},${margin.top + height / 2})`)
                .selectAll('text')
                    .data(root.children)
                    .enter()
                    .append('text')
                        .attr('text-anchor', 'middle')
                        .attr('font-size', '10px')
                        .attr('fill-opacity', 0)
                        .attr('dy', '0.35em')
                        .attr('id', d => `licenseName${d.data.name}`)
                        .text(d => d.data.name);

        
        function update() { 
            root.each(d => d.current = d);

            licenseNames.attr('fill-opacity', 0);

            const centerGroup = chart
                .append('g')
                    .attr('transform', () => {
                        let xcoord = width / 2 + margin.left;
                        let ycoord = height / 2 + margin.top;
                        return 'translate(' + xcoord + ',' + ycoord + ')';
                    })
                    .attr('id', 'licenseCenter');

            const path = centerGroup
                .append('g')
                .selectAll('path')
                    .data(root.descendants().slice(1))
                    .enter()
                    .append('path')
                        .attr('fill', d => {
                            while (d.depth > 1) {
                                d = d.parent;
                            }
                            return colors(d.parent.children.indexOf(d));
                        })
                        .attr('fill-opacity', 0.9)
                        .attr('d', d => arc(d.current));
            
            path.append('title')
                .text(d => d.data.name);
            
            path.filter(d => d.children)
                .style('cursor', 'pointer')
                .on('click', clicked);

            const label = centerGroup
                .append('g')
                    .style('font-size', '10px')
                    .attr('pointer-events', 'none')
                    .attr('text-anchor', 'middle')
                    .style('user-select', 'none')
                    .selectAll('text')
                        .data(root.descendants().slice(1))
                        .enter()
                        .append('text')
                            .attr('dy', '0.35em')
                            .attr('fill-opacity', d => +labelVisible(d.current))
                            .attr('transform', d => labelTransform(d.current))
                            .text(d => {
                                let name = d.data.name;
                                if (d.current.height > 0) {
                                    return name;
                                } else {
                                    name = name.split('/')[1];
                                    if(name.length > 12) {
                                        return '...';
                                    } else {
                                        return name;
                                    }
                                }
                            });

            const parent = centerGroup
                .append('circle')
                .datum(root)
                .attr('r', radius)
                .attr('fill', 'none')
                .attr('pointer-events', 'all')
                .on('click', clicked);

            d3.select('#licenseNames').raise();

            function clicked(o) {
                parent.datum(o.parent || root)

                root.each(d => d.target = {
                    x0: Math.max(0, Math.min(1, (d.x0 - o.x0) / (o.x1 - o.x0))) * 2 * Math.PI,
                    x1: Math.max(0, Math.min(1, (d.x1 - o.x0) / (o.x1 - o.x0))) * 2 * Math.PI,
                    y0: Math.max(0, d.y0 - o.depth),
                    y1: Math.max(0, d.y1 - o.depth)
                });

                const dur = 1000;

                const t = centerGroup.transition().duration(dur);

                path.transition(t)
                    .tween('data', d => {
                        const i = d3.interpolate(d.current, d.target);
                        return t => d.current = i(t);
                    })
                    .attrTween("d", d => () => arc(d.current));

                label.transition(t)
                    .attr('fill-opacity', d => +labelVisible(d.target))
                    .attrTween('transform', d => () => labelTransform(d.current));

                licenseNames.transition()
                    .duration(dur)
                    .attr('fill-opacity', d => +(d.data.name == o.data.name));

            }
        }

        function labelVisible(d) {
            return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.055
        }
    
        function labelTransform(d) {
            const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
            const y = (d.y0 + d.y1) / 2 * radius;
            return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
        }

        let options = ['Stars', 'Forks', 'Users', 'Repos'];

        const slider = d3
            .sliderBottom()
            .domain([0,3])
            .step(1)
            .tickFormat(d => {
                return options[Math.round(d)];
            })
            .ticks(3)
            .on('onchange', val => {
                val = options[Math.round(val)];
                data = reformatData(obj, val);
                root = partition(data);
                chart.select('#licenseCenter').remove();
                chart.select('#licenseSlider').call(slider);
                update();
            });
    

        chart.append('g')
            .attr('transform', 'translate(20,15)')
            .attr('id', 'licenseSlider')
            .call(slider);
        update();
    }

    function reformatData(obj, type) {
        const objTree = {};
        const keys = Object.keys(obj['data']);
        for (var repo of keys) {
            let licenseInfo = obj['data'][repo]['licenseInfo'];
            // Skip if no license info
            if (licenseInfo == null) {
                continue;
            }
            // Use long name if no short name
            let licenseName = licenseInfo['spdxId'] == null ? licenseInfo['name'] : licenseInfo['spdxId'];
            // Skip if no license name or name is 'Other'
            if (licenseName == null || licenseName == 'NOASSERTION') {
                continue;
            }
            if (objTree.hasOwnProperty(licenseName)) {
                objTree[licenseName][repo] = repo;
            } else {
                objTree[licenseName] = {};
                objTree[licenseName][repo] = repo;
            }
        }

        const licenseArray = [];
        const licenses = Object.keys(objTree);
        licenses.forEach(function(license) {
            const repoArray = [];
            const repos = Object.keys(objTree[license]);
            repos.forEach(function(repo) {
                let value = 1;
                if (type == null || type == 'Stars') {
                    value = obj['data'][repo]['stargazers']['totalCount'];
                } else if (type == 'Forks') {
                    value = obj['data'][repo]['forks']['totalCount'];
                } else if (type == 'Users') {
                    value = obj['data'][repo]['mentionableUsers']['totalCount'];
                }
                repoArray.push({ name: repo, value: value });
            })
            licenseArray.push({ name: license, children: repoArray });
        });
        const data = { name: 'Licenses', children: licenseArray };
        return data;
    }
}
