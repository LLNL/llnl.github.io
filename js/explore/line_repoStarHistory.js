/* Creates line graph visualization for webpage */
function draw_line_repoStarHistory(areaID, repoNameWOwner) {
    // load data file, process data, and draw visualization
    var url0 = ghDataDir + '/intRepos_StarHistory.json';
    var url1 = ghDataDir + '/intRepos_ReleaseHistory.json';
    var files = [url0, url1];
    Promise.all(files.map(url => d3.json(url))).then(values => {
        var data = reformatData(values[0], values[1]);
        drawGraph(data[0], data[1], areaID);
    });

    // Draw graph from data
    function drawGraph(data, releaseData, areaID) {
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

        // Draw fill
        chart
            .append('g')
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
            .append('g')
            .append('path')
            .datum(data)
            .attr('class', 'line')
            .attr('d', valueline);

        // Draw dots
        var points = chart
            .append('g')
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
        
        var start = -1;
        var current = -1;
        var past = -1;
        var tolerance = 40;
        var indexArray = [];

        // Process release data to prevent clumps
        for (var i = 0; i < releaseData[repoNameWOwner]['dates'].length; i++) {
            var date = parseTime(releaseData[repoNameWOwner]['dates'][i].slice(0, releaseData[repoNameWOwner]['dates'][i].indexOf('T')));
            current = x(date);
            if (start < 0) {
                start = current;
                past = i;
                i--;
            } else if (current - start < tolerance) {
                past = i;
            } else {
                indexArray.push(past);
                start = -1;
                current = -1;
                past = -1;
                i--;
            }
        }

        if (past > 0) {
            indexArray.push(past);
        }

        var j = 0;
        var startString = '';
        var endString = '';
        var lookingForStartString = true;

        for (var i = 0; i < releaseData[repoNameWOwner]['dates'].length; i++) {
            if (lookingForStartString) {
                startString = releaseData[repoNameWOwner]['names'][i];
                lookingForStartString = false;
            }
            if (i >= indexArray[j]) {
                endString = releaseData[repoNameWOwner]['names'][i];
                var label = startString == endString ? startString : `${startString} - ${endString}`;
                addDateLine(releaseData[repoNameWOwner]['dates'][i], label);
                lookingForStartString = true;
                j++;
            }
        }

        addDateLine('2013-07-02', 'GitHub adds releases');
        addDateLine('2012-08-06', 'GitHub changes watching/stars');
        addDateLine('2013-04-11', 'GitHub\'s 5th anniversary');
    }

    // Turn json obj into desired working data
    function reformatData(obj, releaseObj) {
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

        // Format release data for date flags
        var releaseData = {};
        for (var repo in releaseObj['data']) {
            var dateArray = releaseObj['data'][repo]['releases']['nodes'].map(d => d.publishedAt);
            var tagArray = releaseObj['data'][repo]['releases']['nodes'].map(d => d.tagName);
            releaseData[repo] = { dates: dateArray, names: tagArray };
        }

        return [data, releaseData];
    }
}
