/* Creates pie chart visualization for webpage */
function draw_pie_languages(areaID, repoNameWOwner) {
    // load data file, process data, and draw visualization
    var url = ghDataDir + '/intRepos_Languages.json';
    var files = [url];
    Promise.all(files.map(url => d3.json(url))).then(response => {
            var data = reformatData(response[0]);
            var totalData = response[0]['data'][repoNameWOwner]['languages']['totalSize'];
            drawGraph(data, totalData, areaID);
        });

    // Draw graph from data
    function drawGraph(data, totalData, areaID) {
        var graphHeader = 'Language Breakdown';

        data.forEach(function(d) {
            d.count = +d.count;
        });

        var dataTotalCount = totalData;

        var margin = { top: 8, right: 8, bottom: 8, left: 8 },
            width = stdTotalWidth - margin.left - margin.right,
            height = stdTotalHeight - margin.top - margin.bottom,
            radius = d3.min([width - margin.left - margin.right, height - margin.top - margin.bottom]) / 2,
            donutWidth = 70;
        var legendRectSize = 15,
            legendSpacing = 4;

        var tip = d3
            .tip()
            .attr('class', 'd3-tip')
            .offset(function() {
                return [-10, 0];
            })
            .html(function(d) {
                return d3.format('.2%')(d.data.count/dataTotalCount) + ' ' + d.data.label;
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

        const colors = d3.scaleOrdinal()
            .domain([0, data.length])
            .range(["#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd","#ccebc5","#ffed6f"]);

        const pathGroup = chart.append('g');

        var path = pathGroup
            .selectAll('path')
            .data(pie(data))
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', function(d) {
                return colors(data.indexOf(d.data));
            })
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);

        // Add legend
        var legend = chart
            .selectAll('.legend')
            .data(data.slice(0,5))
            .enter()
            .append('g')
            .attr('class', 'legend')
            .attr('transform', function(d, i) {
                var height = legendRectSize + legendSpacing;
                var offset = (-height * 2) / 2;
                var horz = -6 * legendRectSize;
                var vert = i * height - offset - 50;
                return 'translate(' + horz + ',' + vert + ')';
            });
        // Squares
        legend
            .append('rect')
            .attr('width', legendRectSize)
            .attr('height', legendRectSize)
            .style('fill', function(d) {
                return colors(data.indexOf(d));
            })
            .style('stroke', function(d) {
                return colors(data.indexOf(d));
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

        const textArray = [{ text: graphHeader, class: 'graphtitle', x: 0, y: -50 }];
        
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

        label
            .selectAll('text')
                .data(pie(data))
                .join('text')
                    .attr('dy', '0.35em')
                    .attr('fill-opacity', d => +labelVisible(d))
                    .attr('stroke-opacity', d => +labelVisible(d))
                    .attr('transform', d => labelTransform(d))
                    .text(o => o.data.label)
                    .clone(true).lower()
                    .attr('id', `${label}-clone`)
                    .attr("stroke-linejoin", "round")
                    .attr("stroke-width", 1.5)
                    .attr("stroke", "white");

        function labelVisible(d) {
            return (d.endAngle - d.startAngle) > 0.06;
        }
    
        function labelTransform(d) {
            const x = (d.endAngle + d.startAngle) / 2 * 180 / Math.PI;
            const y = radius - donutWidth / 2;
            return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
        }
    }

    // Turn json obj into desired working data
    function reformatData(obj) {
        const sizeArray = obj['data'][repoNameWOwner]['languages']['edges'];
        const dataArray = obj['data'][repoNameWOwner]['languages']['nodes'];
        const data = [];

        for (var i = 0; i < sizeArray.length; i++) {
            data.push({ label: dataArray[i]['name'], count: sizeArray[i]['size'], color: dataArray[i]['color'] });
        }

        return data;
    }
}
