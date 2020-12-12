/* Creates scatter plot graph visualization for webpage */
function draw_scatter_repoIssues(areaID) {
    // load data file, process data, and draw visualization
    var url = ghDataDir + '/intReposInfo.json';
    var files = [url];
    Promise.all(files.map(url => d3.json(url))).then(values => {
        var data = reformatData(values[0]);
        drawScatter(data, areaID);
    });

    // Draw scatter plot from data
    function drawScatter(data, areaID) {
        var graphHeader = 'Issues';

        // sort dots biggest to smallest so smallest dots drawn on top
        data = sortByNamesLength(data).reverse();

        data.forEach(function(d) {
            d.valueX = +d.valueX;
            d.valueY = +d.valueY;
        });

        var margin = { top: stdMargin.top, right: stdMargin.right, bottom: stdMargin.bottom + 2, left: stdMargin.left + 4 },
            width = stdWidth,
            height = stdHeight;

        var x = d3
            .scaleLog()
            .clamp(true)
            .domain([
                1,
                d3.max(data, function(d) {
                    return d.valueX;
                })
            ])
            .range([0, width])
            .nice();

        var y = d3
            .scaleLog()
            .clamp(true)
            .domain([
                1,
                d3.max(data, function(d) {
                    return d.valueY;
                })
            ])
            .range([height, 0])
            .nice();

        var bubbleSize = d3
            .scaleLog()
            .domain([
                1,
                d3.max(data, function(d) {
                    return d.names.length;
                })
            ])
            .range([stdDotRadius, stdDotRadius + 16]);

        var xAxis = d3
            .axisBottom()
            .scale(x)
            .ticks(10, d3.format('d'));

        var yAxis = d3
            .axisLeft()
            .scale(y)
            .ticks(10, d3.format('d'));

        var tip = d3
            .tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
                var tipstring = '<sub>[ ' + d.valueY + ' Open - ' + d.valueX + ' Closed ]</sub><br>';
                if (d.names.length > 20) {
                    tipstring += d.names.slice(0, 18).join('<br>') + '<br>... [+' + (d.names.length - 18) + ']';
                } else {
                    tipstring += d.names.join('<br>');
                }
                return tipstring;
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

        // Add title
        chart
            .append('text')
            .attr('class', 'graphtitle')
            .attr('x', width / 2)
            .attr('y', 0 - margin.top / 3)
            .attr('text-anchor', 'middle')
            .text(graphHeader);

        // Add x axis label
        chart
            .append('text')
            .attr('class', 'axistitle')
            .attr('x', width / 2)
            .attr('y', height + margin.bottom - margin.bottom / 4)
            .attr('text-anchor', 'middle')
            .text('Closed');

        // Add y axis label
        chart
            .append('text')
            .attr('class', 'axistitle')
            .attr('transform', 'rotate(-90)')
            .attr('y', 0 - margin.left + margin.left / 3)
            .attr('x', 0 - height / 2)
            .attr('text-anchor', 'middle')
            .text('Open');

        // Draw dots
        chart
            .selectAll('.circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('class', 'circle')
            .attr('cx', function(d) {
                return x(d.valueX);
            })
            .attr('cy', function(d) {
                return y(d.valueY);
            })
            .attr('r', function(d) {
                return bubbleSize(d.names.length);
            })
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);

        // Angle the axis text
        chart
            .select('.x.axis')
            .selectAll('text')
            .attr('transform', 'rotate(19)')
            .attr('text-anchor', 'start');
    }

    // Sort array of dictionaries by names.length
    function sortByNamesLength(someArray) {
        return someArray.sort(function(a, b) {
            if (a.names.length == b.names.length) {
                return 0;
            } else if (a.names.length > b.names.length) {
                return 1;
            } else if (a.names.length < b.names.length) {
                return -1;
            }
        });
    }

    // Turn json obj into desired working data
    function reformatData(obj) {
        var dataDict = {};
        for (var repo in obj['data']) {
            if (obj['data'].hasOwnProperty(repo)) {
                var repoDict = obj['data'][repo],
                    issuesClosed = repoDict['issues_Closed']['totalCount'],
                    issuesOpen = repoDict['issues_Open']['totalCount'],
                    doubleKey = [issuesClosed, issuesOpen];
                if (!Object.keys(dataDict).contains(doubleKey)) {
                    dataDict[doubleKey] = [];
                }
                dataDict[doubleKey].push(repo);
            }
        }
        var data = [];
        for (var doubleKey in dataDict) {
            if (dataDict.hasOwnProperty(doubleKey)) {
                var numbers = doubleKey.split(',');
                var dataset = {
                    names: dataDict[doubleKey].sort(),
                    valueX: +numbers[0], // issues closed
                    valueY: +numbers[1] // issues open
                };
                data.push(dataset);
            }
        }
        return data;
    }
}
