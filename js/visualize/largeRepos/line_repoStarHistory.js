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

        for (var d in data) {
            data[d] = data[d].map(o => {
                return { date: parseTime(o.date), value: +o.value, name: o.name };
            })
        }

        var margin = { top: stdMargin.top, right: stdMargin.right * 1.75, bottom: stdMargin.bottom, left: stdMargin.left * 1.15 },
            width = stdTotalWidth * 2 - margin.left - margin.right,
            height = stdHeight;
        var dotRadius = 2;

        var color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, mostPopularRepositories.length + 1))

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

        var chart = d3
            .select('.' + areaID)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

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
                .append('path')
                .datum(data[repo])
                .attr('d', valueline)
                .attr('stroke', color(repo))
                .attr('fill', 'none');
        }

        // Draw dots
        for (var repo in data) {
            chart.append('g')
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

        for (var repoObj of mostPopularRepositories) {
            var repoData = obj['data'][`${repoObj.owner}/${repoObj.name}`];

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
            data[`${repoObj.owner}/${repoObj.name}`] = [];
            for (var timestamp in starCounts) {
                data[`${repoObj.owner}/${repoObj.name}`].push({ date: timestamp, value: starCounts[timestamp], name: `${repoObj.owner}/${repoObj.name}` });
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
