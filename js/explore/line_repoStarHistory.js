/* Creates line graph visualization for webpage */
function draw_line_repoStarHistory(areaID, repoNameWOwner) {
    // load data file, process data, and draw visualization
    var url = ghDataDir + '/labRepos_StarHistory.json';
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

        data.forEach(function(d) {
            d.date = parseTime(d.date);
            d.value = +d.value;
        });

        var margin = { top: stdMargin.top, right: stdMargin.right * 1.75, bottom: stdMargin.bottom, left: stdMargin.left * 1.15 },
            width = stdTotalWidth * 2 - margin.left - margin.right,
            height = stdHeight;
        var dotRadius = 2;

        // Get min-max timestamps across both datasets
        var timerange = d3.extent(data, function(d) {
            return d.date;
        });

        // Get min-max values across both datasets
        var datrange = d3.extent(data, function(d) {
            return d.value;
        });

        var x = d3
            .scaleTime()
            .domain(d3.extent(timerange))
            .range([0, width]);

        var y = d3
            .scaleLinear()
            .domain([0, d3.max(datrange)])
            .range([height, 0])
            .nice();

        var xAxis = d3.axisBottom().scale(x);

        var yAxis = d3.axisLeft().scale(y);

        var area = d3
            .area()
            .curve(d3.curveMonotoneX)
            .x(function(d) {
                return x(d.date);
            })
            .y0(height)
            .y1(function(d) {
                return y(d.value);
            });

        var tip = d3
            .tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
                var stars = ' Stars';
                if (d.value == 1) {
                    stars = ' Star';
                }
                return '<sub>[' + formatTime(d.date) + ']</sub>' + '<br>' + d.value + stars;
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

        // Draw fill
        chart
            .append('path')
            .datum(data)
            .attr('class', 'area')
            .attr('d', area);

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
        chart
            .append('path')
            .datum(data)
            .attr('class', 'line')
            .attr('d', valueline);

        // Draw dots
        var points = chart
            .selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('class', 'dense circle')
            .attr('cx', function(d) {
                return x(d.date);
            })
            .attr('cy', function(d) {
                return y(d.value);
            })
            .attr('r', dotRadius)
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);

        // Angle the axis text
        chart
            .select('.x.axis')
            .selectAll('text')
            .attr('transform', 'rotate(12)')
            .attr('text-anchor', 'start');
    }

    // Turn json obj into desired working data
    function reformatData(obj) {
        var repoData = obj['data'][repoNameWOwner];

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
        var data = [];
        for (var timestamp in starCounts) {
            data.push({ date: timestamp, value: starCounts[timestamp] });
        }

        return data;
    }
}
