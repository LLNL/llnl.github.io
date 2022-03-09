/* Creates line graph visualization for webpage */
function draw_line_repoActivity(areaID, byCommits=true, repoNameWOwner) {
    // load data file, process data, and draw visualization
    var url0 = ghDataDir + '/intRepos_ActivityCommits.json';
    var url1 = ghDataDir + '/intRepos_ActivityLines.json';
    var files = [url0, url1];
    Promise.all(files.map(url => d3.json(url))).then(values => {
        let options = ['Show Activity by Commits', 'Show Activity by Line Additions'];

        const slider = d3
            .sliderLeft()
            .domain([0, 1])
            .step(1)
            .tickFormat(d => {
                return options[Math.round(d)];
            })
            .ticks(1)
            .value(0)
            .height(50)
            .on('onchange', val => {
                byCommits = val == 0;
                d3.select('.' + areaID).select('.chart').remove();
                data = reformatData(values[0], values[1]);
                drawGraph(data, areaID);
            });
        
        d3.select('.' + areaID).append('g').attr('transform', `translate(${980},${20})`).call(slider);

        var data = reformatData(values[0], values[1]);
        drawGraph(data, areaID);
    });

    var parseTime = d3.timeParse('%Y-%m-%d');
    var formatTime = d3.timeFormat('%Y-%m-%d');

    // Draw graph from data
    function drawGraph(data, areaID) {
        var graphHeader =`${byCommits ? 'Activity' : 'Line Additions'} Across Top ${cutOffSize} Repos by Stars [Default Branches, 1 Year]`;

        if (data.length > 52) {
            data = data.slice(data.length - 52);
        }

        // Removes most recent week from graph to avoid apparent dip in activity
        data.pop();

        const repoKeys = mostPopularRepositories.map(d => `${d.owner}/${d.name}`);

        data.forEach(d => {
            d.date = parseTime(d.date);
        })
        
        data = d3.stack()
            .keys(repoKeys)
            .order(d3.stackOrderAscending)(data);

        var margin = { top: stdMargin.top, right: stdMargin.right, bottom: stdMargin.bottom, left: stdMargin.left * 1.15 },
            width = stdTotalWidth * 2 - margin.left - margin.right,
            height = stdHeight;
        var dotRadius = 4 * stdDotRadius / 5;

        var x = d3
            .scaleTime()
            .clamp(true)
            .domain(d3.extent(data[0], d => d.data.date))
            .range([0, width]);

        var y = d3
            .scaleLinear()
            .domain([0, d3.max(data, d => {
                var max = 0;
                for (var entry of d) {
                    if (entry[1] > max) {
                        max = entry[1];
                    }
                }
                return max;
            })]) // Force non 0 scale for line visibility
            .range([height, 0])
            .nice();

        var colors = d3
            .scaleOrdinal()
            .domain([0, mostPopularRepositories.length - 1])
            .range(d3.quantize(d3.interpolate('#3182bd', '#d1e3f0'), mostPopularRepositories.length));

        var dToday = x.domain()[1];
        // Supercomputing
        var dSupercomp = '11-18';
        // Thanksgiving
        var dThnxgiv = '11-25';
        // Christmas
        var dXmas = '12-25';

        function addDateLine(dateString, label) {
            var dateObj = getYearDate(dateString, dToday);
            drawDateLine(dateObj, label, false, chart, x, y, height, valueline);
        }

        var xAxis = d3.axisBottom().scale(x);

        var yAxis = d3.axisLeft().scale(y);

        var area = d3
            .area()
            .x(function(d) {
                return x(d.data.date);
            })
            .y0(function(d) {
                return y(d[0]);
            })
            .y1(function(d) {
                return y(d[1]);
            });

        var tip = d3
            .tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
                var value = d[1] - d[0];
                var repos = byCommits ? ' Commits ' : ' Line Additions ';
                if (value == 1) {
                    repos = byCommits ? ' Commit ' : ' Line Addition ';
                }
                return `<sub>[Week of ${formatTime(d[3])}]</sub>` + '<br>' + d3.format(',')(value) + repos + `to ${d[2]}`;
            });

        var valueline = d3
            .line()
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
            .attr('class', 'chart')
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
            .text('Commits');

        var areas = chart.append('g')
            .attr('id', 'areas');

        // Draw fill
        areas
            .selectAll('path')
            .data(data)
                .join('path')
                .attr('fill', d => colors(d.index))
                .attr('stroke', 'black')
                .attr('d', area);

        // Draw date-of-interest reference lines
        addDateLine(dSupercomp, 'Supercomputing');
        addDateLine(dThnxgiv, 'Thanksgiving');
        addDateLine(dXmas, 'Christmas');

        var pointData = [];

        for (var d of data) {
            for (var o of d) {
                var copy = JSON.parse(JSON.stringify(o));
                if (copy[1] && (copy[1] - copy[0])) {
                    copy.push(d.key);
                    copy.push(o.data.date);
                    pointData.push(copy);
                }
            }
        }

        // Draw dots
        chart
            .selectAll('circle')
            .data(pointData)
            .join('circle')
                .attr('cx', function(d) {
                    return x(d[3]);
                })
                .attr('cy', function(d) {
                    if (d[1]) {
                        return y(d[1]);
                    }
                })
                .attr('r', dotRadius)
                .attr('class', 'circle')
                .on('mouseover', tip.show)
                .on('mouseout', tip.hide);

        // Angle the axis text
        chart
            .select('.x.axis')
            .selectAll('text')
            .attr('transform', 'rotate(12)')
            .attr('text-anchor', 'start');

        // Angle the axis text
        chart
            .select('.y.axis')
            .selectAll('text')
            .text(d => {
                if (+d >= 1000) {
                    return d3.format('~e')(+d);
                } else {
                    return d;
                }
            });
    }

    // Turn json obj into desired working data
    function reformatData(obj0, obj1) {
        if (byCommits) {
            var obj = obj0;
            // Calculate combined values
            var dataTotals = {};
            var repoCounts = {};
            var repos = repoNameWOwner == null ? Object.keys(obj['data']) : [repoNameWOwner];
            var numReposExpected = repos.length;
            repos.forEach(function(repo) {
                if (obj['data'].hasOwnProperty(repo)) {
                    var weeklyNodes = obj['data'][repo];
                    for (var i = 0; i < weeklyNodes.length; i++) {
                        var weekstamp = weeklyNodes[i]['week'];
                        var weeklytotal = weeklyNodes[i]['total'];
                        if (!Object.keys(dataTotals).contains(weekstamp)) {
                            dataTotals[weekstamp] = 0;
                            repoCounts[weekstamp] = 0;
                        }
                        dataTotals[weekstamp] += weeklytotal;
                        repoCounts[weekstamp] += 1;
                    }
                } else {
                    console.log('No activity data recorded for ' + repo + ', using dummy data.');
                    // Today
                    var end = new Date();
                    dataTotals[formatTime(end)] = 0;
                    repoCounts[formatTime(end)] = 1;
                    // Tomorrow, 1 year ago
                    var start = new Date(new Date().getFullYear() - 1, new Date().getMonth(), new Date().getDate() + 1);
                    dataTotals[formatTime(start)] = 0;
                    repoCounts[formatTime(start)] = 1;
                }
            });

            // Formats data to allow for timestap look up of value data
            var repoData = {};
            repos.forEach(function(repo) {
                for (var entry of obj['data'][repo]) {
                    if (repoData[entry['week']] == undefined) {
                        repoData[entry['week']] = {};
                    }
                    if (entry['total']) {
                        repoData[entry['week']][repo] = entry['total'];
                    } else {
                        repoData[entry['week']][repo] = 0;
                    }
                }
            });

            // Format data for graphing
            var data = [];
            var sortedTimestamps = Object.keys(dataTotals).sort();
            sortedTimestamps.forEach(function(timestamp) {
                var numReposFound = repoCounts[timestamp];
                if (numReposFound == numReposExpected) {
                    var dateData = { date: timestamp };
                    for (var repos of mostPopularRepositories) {
                        dateData[`${repos['owner']}/${repos['name']}`] = repoData[timestamp][`${repos['owner']}/${repos['name']}`];
                    }
                    data.push(dateData);
                } else {
                    console.log('Repo count mismatch for activity on ' + timestamp + ': expected ' + numReposExpected + ', found ' + numReposFound);
                }
            });
        } else {
            // Formats line data
            var obj = { data: {} };

            var repos = Object.keys(obj1['data']);

            repos.forEach(function(repo) {
                obj['data'][repo] = [];
                for (var entry of obj1['data'][repo]) {
                    obj['data'][repo].push({ total: entry[1], week: entry[0] });
                }
            });

            // Calculate combined values
            var dataTotals = {};
            var repoCounts = {};
            var repos = mostPopularRepositories.map(d => `${d.owner}/${d.name}`);
            var numReposExpected = repos.length;
            repos.forEach(function(repo) {
                if (obj['data'].hasOwnProperty(repo)) {
                    var weeklyNodes = obj['data'][repo];
                    for (var i = 0; i < weeklyNodes.length; i++) {
                        var weekstamp = weeklyNodes[i]['week'];
                        var weeklytotal = weeklyNodes[i]['total'];
                        if (!Object.keys(dataTotals).contains(weekstamp)) {
                            dataTotals[weekstamp] = 0;
                            repoCounts[weekstamp] = 0;
                        }
                        dataTotals[weekstamp] += weeklytotal;
                        repoCounts[weekstamp] += 1;
                    }
                } else {
                    console.log('No activity data recorded for ' + repo + ', using dummy data.');
                    // Today
                    var end = new Date();
                    dataTotals[formatTime(end)] = 0;
                    repoCounts[formatTime(end)] = 1;
                    // Tomorrow, 1 year ago
                    var start = new Date(new Date().getFullYear() - 1, new Date().getMonth(), new Date().getDate() + 1);
                    dataTotals[formatTime(start)] = 0;
                    repoCounts[formatTime(start)] = 1;
                }
            });

            // Formats data to allow for timestap look up of value data
            var repoData = {};
            repos.forEach(function(repo) {
                for (var entry of obj['data'][repo]) {
                    if (repoData[entry['week']] == undefined) {
                        repoData[entry['week']] = {};
                    }
                    if (entry['total']) {
                        repoData[entry['week']][repo] = entry['total'];
                    } else {
                        repoData[entry['week']][repo] = 0;
                    }
                }
            });

            // Format data for graphing
            var data = [];
            var sortedTimestamps = Object.keys(dataTotals).sort();
            sortedTimestamps.forEach(function(timestamp) {
                var dateData = { date: timestamp };
                for (var repos of mostPopularRepositories) {
                    dateData[`${repos['owner']}/${repos['name']}`] = repoData[timestamp][`${repos['owner']}/${repos['name']}`] == undefined ? 0 : repoData[timestamp][`${repos['owner']}/${repos['name']}`];
                }
                data.push(dateData);
            });
        }

        return data;
    }

    // Return appropriate date object for a month-day date given the graph's time range
    function getYearDate(monthDayString, dToday) {
        var thisYear = formatTime(dToday).split('-')[0];
        if (d3.min([dToday, parseTime(thisYear + '-' + monthDayString)]) == dToday) {
            var aYear = (parseInt(thisYear) - 1).toString();
            return parseTime(aYear + '-' + monthDayString);
        } else {
            return parseTime(thisYear + '-' + monthDayString);
        }
    }
}
