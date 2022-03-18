/* Creates line graph visualization for webpage */
function draw_line_repoStarHistory(areaID) {
    // load data file, process data, and draw visualization
    var url = ghDataDir + '/intRepos_StarHistory.json';
    var files = [url];
    Promise.all(files.map(url => d3.json(url))).then(values => {
        var data = reformatData(values[0]);
        drawGraph(data, areaID);
    });

    // Draw graph from data
    function drawGraph(data, areaID) {
        var graphHeader = 'Number of Stars Over Time';

        var parseTime = d3.timeParse('%Y-%m-%d');
        var formatTime = d3.timeFormat('%Y-%m-%d');

        var indexMap = {};
        var index = 0;

        for (var repo in data){
            indexMap[repo] = index;
            index += 1;
        }

        for (var d in data) {
            data[d] = data[d].map(o => {
                return { date: parseTime(o.date), value: +o.value, name: o.name };
            })
        }

        var margin = { top: stdMargin.top, right: stdMargin.right * 1.75, bottom: stdMargin.bottom, left: stdMargin.left * 1.15 },
            width = stdTotalWidth * 2 - margin.left - margin.right,
            height = stdHeight;
        var dotRadius = 2;

        var color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, Object.keys(data).length + 1))

        var flattenedData = flattenData(data);

        // Get min-max timestamps across both datasets
        var timerange = d3.extent(flattenedData, function(d) {
            return d.date;
        });

        // Get min-max values across both datasets
        var datrange = d3.extent(flattenedData, function(d) {
            return d.value;
        });

        var x = d3
            .scaleTime()
            .domain(d3.extent(timerange))
            .range([0, width]);

        var y = d3
            .scaleLog()
            .domain([1, d3.max(datrange)])
            .range([height, 0])
            .nice();

        var chart = d3
            .select('.' + areaID)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        var sliderRange = d3
            .sliderBottom(d3.scaleLog())
            .min(d3.min(flattenedData.map(d => d.value)))
            .max(d3.max(flattenedData.map(d => d.value)))
            .width(200)
            .step(1)
            .ticks(3)
            .tickFormat(d3.format('d'))
            .default([1, d3.max(flattenedData.map(d => d.value))])
            .on('end', val => {
                chart.selectAll('g').remove();
                var reposInRange = [];
                for (var repo in data) {
                    var repoData = data[repo];
                    var repoValues = repoData.map(d => d.value);
                    var max = d3.max(repoValues);
                    if (max >= val[0] && max <= val[1]) {
                        reposInRange.push(repo);
                    }
                }
                y.domain([1, val[1]]);
                yAxis.scale(y);
                // Add the x axis
                chart
                    .append('g')
                    .attr('class', 'x axis')
                    .attr('transform', 'translate(0,' + height + ')')
                    .call(xAxis);

                // Add the y axis
                chart
                    .append('g')
                    .attr('class', 'y axis')
                    .call(yAxis);

                // Draw line
                for (var repo of reposInRange) {
                    chart.append('g')
                        .attr('id', `line${indexMap[repo]}`)
                        .append('path')
                        .datum(data[repo])
                        .attr('d', valueline)
                        .attr('stroke', color(repo))
                        .attr('fill', 'none');
                }

                // Draw dots
                for (var repo of reposInRange) {
                    chart.append('g')
                        .attr('id', `points${indexMap[repo]}`)
                        .selectAll('circle')
                        .data(data[repo])
                        .enter()
                        .append('circle')
                        .attr('cx', function(d) {
                            return x(d.date);
                        })
                        .attr('cy', function(d) {
                            return y(d.value);
                        })
                        .attr('r', dotRadius)
                        .attr('fill', color(repo))
                        .on('mouseover', tip.show)
                        .on('mouseout', tip.hide);
                }

                addDateLine('2012-08-06', 'GitHub changes watching/stars');
                addDateLine('2013-04-11', 'GitHub\'s 5th anniversary');
            });

        d3.select('.' + areaID)
            .append('g')
            .attr('transform', `translate(${20 + margin.left},${margin.top})`)
            .call(sliderRange);

        var xAxis = d3.axisBottom().scale(x);

        var yAxis = d3.axisLeft()
            .scale(y)
            .ticks(10, d3.format('d'));

        var tip = d3
            .tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
                var stars = ' Stars';
                if (d.value == 1) {
                    stars = ' Star';
                }
                return '<sub>[' + formatTime(d.date) + ']</sub>' + '<br>' + d.name + '<br>' + d.value + stars;
            });

        var valueline = d3
            .line()
            .curve(d3.curveMonotoneX)
            .x(function(d) {
                return x(d.date);
            })
            .y(function(d) {
                return y(d.value);
            });

        chart.call(tip);

        function addDateLine(dateString, label) {
            var dateObj = parseTime(dateString.slice(0, dateString.indexOf('T')));
            if (x(dateObj) < width && x(dateObj) > 0) {
                drawDateLine(dateObj, label, false, chart.append('g'), x, y, height, valueline);
            }
        }

        // Add the x axis
        chart
            .append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis);

        // Add the y axis
        chart
            .append('g')
            .attr('class', 'y axis')
            .call(yAxis);

        // Add title
        chart
            .append('text')
            .attr('class', 'graphtitle')
            .attr('x', width / 2)
            .attr('y', 0 - margin.top / 3)
            .attr('text-anchor', 'middle')
            .text(graphHeader);

        // Add y axis label
        chart
            .append('text')
            .attr('class', 'axistitle')
            .attr('transform', 'rotate(-90)')
            .attr('y', 0 - margin.left + margin.left / 4)
            .attr('x', 0 - height / 2)
            .attr('text-anchor', 'middle')
            .text('Stars');

        // Draw line
        for (var repo in data) {
            chart.append('g')
                .attr('id', `line${indexMap[repo]}`)
                .append('path')
                .datum(data[repo])
                .attr('d', valueline)
                .attr('stroke', color(repo))
                .attr('fill', 'none');
        }

        // Draw dots
        for (var repo in data) {
            chart.append('g')
                .attr('id', `points${indexMap[repo]}`)
                .selectAll('circle')
                .data(data[repo])
                .enter()
                .append('circle')
                .attr('cx', function(d) {
                    return x(d.date);
                })
                .attr('cy', function(d) {
                    return y(d.value);
                })
                .attr('r', dotRadius)
                .attr('fill', color(repo))
                .on('mouseover', tip.show)
                .on('mouseout', tip.hide);
        }

        // Angle the axis text
        chart
            .select('.x.axis')
            .selectAll('text')
            .attr('transform', 'rotate(12)')
            .attr('text-anchor', 'start');

        addDateLine('2012-08-06', 'GitHub changes watching/stars');
        addDateLine('2013-04-11', 'GitHub\'s 5th anniversary');
    }

    // Turn json obj into desired working data
    function reformatData(obj) {
        var data = {};

        for (var repoName in obj['data']) {
            var repoData = obj['data'][repoName];

            // Build lists of timestamps
            var starDates = repoData.map(d => {
                return d['date'];
            });

            // Count accumulated timestamps over time
            var starCounts = {};
            for (var i = 0; i < starDates.length; i++) {
                starCounts[starDates[i]] = i == 0 ? repoData[i]['value'] : starCounts[starDates[i - 1]] + repoData[i]['value'];
            }

            // Format data for graphing
            data[repoName] = [];
            for (var timestamp in starCounts) {
                data[repoName].push({ date: timestamp, value: starCounts[timestamp], name: repoName });
            }
        }

        return data;
    }

    function flattenData(obj) {

        var outputArray = [];

        for (var repo in obj) {
            outputArray = outputArray.concat(obj[repo]);
        }

        return outputArray;
    }
}
