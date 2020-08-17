/* Creates pie chart visualization for webpage */
function draw_pie_lines(areaID) {
    // load data file, process data, and draw visualization
    var url = ghDataDir + '/labRepos_ActivityLines.json';
    var files = [url];
    Promise.all(files.map(url => d3.json(url))).then(response => {
            var data = reformatData(response[0]);
            drawGraph(data, areaID);
        });

    // Draw graph from data
    function drawGraph(data, areaID) {
        var graphHeader = 'Line Edits and Additions';

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

        var color = d3.scaleOrdinal().range(['#756bb1', '#9e9ac8']);

        var repoColor = d3.scaleOrdinal()
            .domain(data[2].labels)
            .range(d3.quantize(d3.interpolate('#756bb1', '#9e9ac8'), data[2].labels.length + 1));

        var tip = d3
            .tip()
            .attr('class', 'd3-tip')
            .offset(function() {
                return [-10, 0];
            })
            .html(function(d) {
                var units = ' Lines This Year';
                if (d.data.count == 1) {
                    units = ' Line This Year';
                }
                return d.data.count + units + ' (' + d3.format('.0%')(d.data.count / dataTotalCount) + ')' + '<br>' + d.data.label;
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

        var path = chart
            .selectAll('path')
            .data(pie(data))
            .enter()
            .append('path')
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

            path = chart
                .selectAll('path')
                .data(pieData)
                .join('path')
                .attr('d', arc)
                .attr('fill', function(d, i) {
                    return repoColor(d.data.label);
                })
                .style('cursor', 'pointer')
                .on('mouseover', tip.show)
                .on('mouseout', tip.hide)
                .on('click', unclicked);

            const dur = 1000;

            const t = chart.transition().duration(dur);

            path.transition(t)
                .tween('data', d => {
                    const i = d3.interpolate(d.current, d.target);
                    return t => d.current = i(t);
                })
                .attrTween("d", d => () => arc(d.current));
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
                        return '#756bb1';
                    } else {
                        return '#9e9ac8';
                    }
                })
                .on('end', () => {
                    chart
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
            });
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

        // Add title
        chart
            .append('text')
            .attr('class', 'graphtitle')
            .attr('x', 0)
            .attr('y', 0)
            .attr('text-anchor', 'middle')
            .text(graphHeader);
        // Add title
        chart
            .append('text')
            .attr('class', 'graphtitle bignum')
            .attr('x', 0)
            .attr('y', -25)
            .attr('text-anchor', 'middle')
            .text(d3.format('.4s')(dataTotalCount));
    }

    // Turn json obj into desired working data
    function reformatData(obj) {
        var data = [{ label: 'In Top Ten LLNL Repos', count: totalLines(obj, mostPopularRepositories.map(d => `${d.owner}/${d.name}`)) }, { label: 'In Other LLNL Repos', count: totalLines(obj) }, { labels: mostPopularRepositories.map(d => `${d.owner}/${d.name}`), counts: mostPopularRepositories.map(d => totalLines(obj, [`${d.owner}/${d.name}`])) }];
        return data;
    }

    function totalLines(obj, repoList=null) {
        let total = 0;

        if (repoList === null) {
            for (var repo in obj['data']) {
                for (var entry of obj['data'][repo]) {
                    total += entry[1];
                }
            }
        } else {
            for (var repo of repoList) {
                for (var entry of obj['data'][repo]) {
                    total += entry[1];
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
