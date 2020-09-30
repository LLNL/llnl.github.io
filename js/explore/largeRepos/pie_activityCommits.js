/* Creates pie chart visualization for webpage */
function draw_pie_commits(areaID) {
    // load data file, process data, and draw visualization
    var url = ghDataDir + '/labRepos_ActivityCommits.json';
    var files = [url];
    Promise.all(files.map(url => d3.json(url))).then(response => {
            var data = reformatData(response[0]);
            drawGraph(data, areaID);
        });

    // Draw graph from data
    function drawGraph(data, areaID) {
        var graphHeader = 'Commits This Year';

        data.forEach(function(d) {
            d.count = +d.count;
        });

        var dataTotalCount = data[1].count;

        data[1].count -= data[0].count;

        var margin = { top: 8, right: 8, bottom: 8, left: 8 },
            width = stdTotalWidth - margin.left - margin.right,
            height = stdTotalHeight - margin.top - margin.bottom,
            radius = d3.min([width - margin.left - margin.right, height - margin.top - margin.bottom]) / 2,
            donutWidth = 70;
        var legendRectSize = 15,
            legendSpacing = 4;

        var color = d3.scaleOrdinal().range(['#3182bd', '#6baed6']);

        var repoColor = d3.scaleOrdinal()
            .domain(data[2].labels)
            .range(d3.quantize(d3.interpolate('#3182bd', '#6baed6'), data[2].labels.length + 1));

        var tip = d3
            .tip()
            .attr('class', 'd3-tip')
            .offset(function() {
                return [-10, 0];
            })
            .html(function(d) {
                var units = ' Commits';
                if (d.data.count == 1) {
                    units = ' Commit';
                }
                return d.data.count + units + '<br>' + d.data.label;
            });

        var chart = d3
            .select('.' + areaID)
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate(' + (width / 2 + margin.left) + ',' + (height / 2 - margin.top) + ')');

        chart.call(tip);

        var arc = d3
            .arc()
            .innerRadius(radius - donutWidth)
            .outerRadius(radius);

        var pie = d3
            .pie()
            .value(function(d) {
                return d.count;
            })
            .sort(null);

            const pathGroup = chart.append('g');
    
        var path = pathGroup
            .selectAll('path')
            .data(pie(data.slice(0,2)))
            .join('path')
            .attr('d', arc)
            .attr('fill', function(d, i) {
                return color(d.data.label);
            })
            .style('cursor', 'pointer')
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide)
            .on('click', clicked);

        function clicked(d) {
            const pieData = pie(decompress(data));
            const scaleCoeff = 2 * Math.PI / (2 * Math.PI - (pieData[pieData.length - 1].endAngle - pieData[pieData.length - 1].startAngle));
            let shift = 0;
            let delta = 0;
            pieData.forEach(d => {
                if (d.index < pieData.length - 1) {
                    delta = d.endAngle - d.startAngle;
                    d.target = { startAngle: shift, endAngle: shift + scaleCoeff * delta };
                    d.current = { startAngle: d.startAngle, endAngle: d.endAngle };
                    d.past = { startAngle: d.startAngle, endAngle: d.endAngle };
                    shift += scaleCoeff * delta;
                } else {
                    d.target = { startAngle: 2 * Math.PI, endAngle: 2 * Math.PI };
                    d.current = { startAngle: d.startAngle, endAngle: d.endAngle };
                    d.past = { startAngle: d.startAngle, endAngle: d.endAngle };
                }
            });

            path = pathGroup
                .selectAll('path')
                .data(pieData)
                .join('path')
                .attr('d', arc)
                .attr('fill', (d, i) => {
                    if (i < mostPopularRepositories.length) {
                        return '#3182bd'; 
                    } else {
                        return '#6baed6';
                    }
                })
                .style('cursor', 'pointer')
                .on('mouseover', tip.show)
                .on('mouseout', tip.hide)
                .on('click', unclicked);
            
            label
                .selectAll('text')
                    .data(pieData)
                    .join('text')
                        .attr('dy', '0.35em')
                        .attr('fill-opacity', 0)
                        .text(o => o.data.label.split('/')[1]);

            const dur = 1000;

            const t = chart.transition().duration(dur);

            path.transition(t)
                .tween('data', d => {
                    const i = d3.interpolate(d.current, d.target);
                    return t => d.current = i(t);
                })
                .attr('fill', function(d, i) {
                    return repoColor(d.data.label);
                })
                .attrTween("d", d => () => arc(d.current));

            legend.transition(t)
                .attr('fill-opacity', 0)
                .attr('stroke-opacity', 0);

            titles.transition(t)
                .attr('y', d => d.y + 30);

            label.selectAll('text').transition(t)
                .attr('fill-opacity', d => +labelVisible(d.target))
                .attrTween('transform', d => () => labelTransform(d.current));
        }

        function unclicked(d) {
            const dur = 1000;

            const t = chart.transition().duration(dur);

            path.transition(t)
                .tween('data', d => {
                    const i = d3.interpolate(d.current, d.past);
                    return t => d.current = i(t);
                })
                .attrTween('d', d => () => arc(d.current))
                .attr('fill', d => {
                    if (d.target.startAngle != d.target.endAngle) {
                        return '#3182bd';
                    } else {
                        return '#6baed6';
                    }
                })
                .on('end', () => {
                    pathGroup
                        .selectAll('path')
                        .data(pie(data.slice(0,2)))
                        .join('path')
                        .attr('d', arc)
                        .attr('fill', function(d, i) {
                            return color(d.data.label);
                        })
                        .style('cursor', 'pointer')
                        .on('mouseover', tip.show)
                        .on('mouseout', tip.hide)
                        .on('click', clicked)
                });

            legend.transition(t)
                .attr('fill-opacity', 1)
                .attr('stroke-opacity', 1);

            titles.transition(t)
                .attr('y', d => d.y);

            label.selectAll('text').transition(t)
                .attr('fill-opacity', 0)
                .attrTween('transform', d => () => labelTransform(d.current));
        }

        // Add legend
        var legend = chart
            .selectAll('.legend')
            .data(data.slice(0,2))
            .enter()
            .append('g')
            .attr('class', 'legend')
            .attr('transform', function(d, i) {
                var height = legendRectSize + legendSpacing;
                var offset = (-height * color.domain().length) / 2;
                var horz = -6 * legendRectSize;
                var vert = i * height - offset;
                return 'translate(' + horz + ',' + vert + ')';
            })
            .attr('fill-opacity', 1)
            .attr('stroke-opacity', 1);
        // Squares
        legend
            .append('rect')
            .attr('width', legendRectSize)
            .attr('height', legendRectSize)
            .style('fill', function(d) {
                return color(d.label);
            })
            .style('stroke', function(d) {
                return color(d.label);
            });
        // Text
        legend
            .append('text')
            .attr('x', legendRectSize + legendSpacing)
            .attr('y', legendRectSize - legendSpacing)
            .text(function(d) {
                return d3.format('.0%')(d.count / dataTotalCount) + ' ' + d.label;
            })
            .attr('text-anchor', 'start');

        const textArray = [{ text: graphHeader, class: 'graphtitle', x: 0, y: 0 }, { text: dataTotalCount, class: 'graphtitle bignum', x: 0, y: -25 }];
        
        // Add title
        const titles = chart
            .append('g')
            .selectAll('text')
                .data(textArray)
                .join('text')
                    .attr('class', d => d.class)
                    .attr('x', d => d.x)
                    .attr('y', d => d.y)
                    .attr('text-anchor', 'middle')
                    .text(d => d.text);

        // Adds labels to wedges
        const label = chart
            .append('g')
                .style('font-size', '11px')
                .attr('pointer-events', 'none')
                .attr('text-anchor', 'middle')
                .style('user-select', 'none');

        function labelVisible(d) {
            return (d.endAngle - d.startAngle) > 0.07;
        }
    
        function labelTransform(d) {
            const x = (d.endAngle + d.startAngle) / 2 * 180 / Math.PI;
            const y = radius - donutWidth / 2;
            return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
        }
    }

    // Turn json obj into desired working data
    function reformatData(obj) {
        var data = [{ label: 'In Top Ten LLNL Repos', count: totalCommits(obj, mostPopularRepositories.map(d => `${d.owner}/${d.name}`)) }, { label: 'In Other LLNL Repos', count: totalCommits(obj) }, { labels: mostPopularRepositories.map(d => `${d.owner}/${d.name}`), counts: mostPopularRepositories.map(d => totalCommits(obj, [`${d.owner}/${d.name}`])) }];
        return data;
    }

    function totalCommits(obj, repoList=null) {
        let total = 0;

        if (repoList === null) {
            for (var repo in obj['data']) {
                for (var entry of obj['data'][repo]) {
                    total += entry['total'];
                }
            }
        } else {
            for (var repo of repoList) {
                for (var entry of obj['data'][repo]) {
                    total += entry['total'];
                }
            }
        }

        return total;
    }

    function decompress(input) {
        const data = [];

        for (var i = 0; i < input[2]['labels'].length; i++) {
            data.push({ label: input[2]['labels'][i], count: input[2]['counts'][i] });
        }

        data.push(input[1]);

        return data;
    }
}
