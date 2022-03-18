/* Creates pie chart visualization for webpage */
function draw_pie_repoUsers(areaID, repoNameWOwner) {
    // load data file, process data, and draw visualization
    var url0 = ghDataDir + '/intUsers.json';
    var url1 = ghDataDir + '/extUsers.json';
    var files = [url0,url1];
    var promises = [];
    files.forEach(function(url) {
        promises.push(d3.json(url));
    });
    Promise.all(promises).then(response => {
            var data = reformatData(response[0], response[1]);
            drawGraph(data, areaID);
        });

    // Draw graph from data
    function drawGraph(data, areaID) {
        var graphHeader = 'Contributors';

        data.forEach(function(d) {
            d.count = +d.count;
        });

        var dataTotalCount = data[0].count + data[1].count;

        var margin = { top: 8, right: 8, bottom: 8, left: 8 },
            width = stdTotalWidth - margin.left - margin.right,
            height = stdTotalHeight - margin.top - margin.bottom,
            radius = d3.min([width - margin.left - margin.right, height - margin.top - margin.bottom]) / 2,
            donutWidth = 70;
        var legendRectSize = 15,
            legendSpacing = 4;

        var color = d3.scaleOrdinal().range(['#3182bd', '#6baed6']);

        var tip = d3
            .tip()
            .attr('class', 'd3-tip')
            .offset(function() {
                return [this.getBBox().height / 2, 0];
            })
            .html(function(d) {
                var units = ' Users';
                if (d.data.count == 1) {
                    units = ' User';
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
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);

        // Add legend
        var legend = chart
            .selectAll('.legend')
            .data(data)
            .enter()
            .append('g')
            .attr('class', 'legend')
            .attr('transform', function(d, i) {
                var height = legendRectSize + legendSpacing;
                var offset = (-height * color.domain().length) / 2;
                var horz = -4.7 * legendRectSize;
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
            .text(dataTotalCount);
    }

    // Turn json obj into desired working data
    function reformatData(objLabUsers, objExtUsers) {
        var repoContribs = function(objUsers) {
            var users = Object.keys(objUsers['data']);
            var contribs = new Set();
            users.forEach(function(user) {
                if (objUsers['data'].hasOwnProperty(user) && objUsers['data'][user].hasOwnProperty('contributedLabRepositories')) {
                    var labRepos = objUsers['data'][user]['contributedLabRepositories']['nodes'];
                    if (repoNameWOwner == null) {
                        var userLogin = objUsers['data'][user]['login'];
                        contribs.add(userLogin);
                    } else {
                        labRepos.forEach(function(repo) {
                            if (repo == repoNameWOwner) {
                                var userLogin = objUsers['data'][user]['login'];
                                contribs.add(userLogin);
                            }
                        });
                    }
                }
            });
            return contribs;
        };

        var contribs_lab = repoContribs(objLabUsers);
        var contribs_ext = repoContribs(objExtUsers);

        var labTotal = contribs_lab.size;
        var extTotal = contribs_ext.size;

        var data = [{ label: 'External Users', count: extTotal }, { label: 'LLNL Members', count: labTotal }];
        return data;
    }
}
