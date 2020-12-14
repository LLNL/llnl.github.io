/* Creates pie chart visualization for webpage */
function draw_pie_language(areaID) {
    // load data file, process data, and draw visualization
    var url = ghDataDir + '/intRepos_Languages.json';
    var files = [url];
    Promise.all(files.map(url => d3.json(url))).then(response => {
            var data = reformatData(response[0]);
            drawGraph(data, areaID);
        });

    // Draw graph from data
    function drawGraph(data, areaID) {
        var graphHeader = 'Language Breakdown';

        var margin = { top: 8, right: 8, bottom: 8, left: 8 },
            width = stdTotalWidth - margin.left - margin.right,
            height = stdTotalHeight - margin.top - margin.bottom,
            radius = d3.min([width - margin.left - margin.right, height - margin.top - margin.bottom]) / 2,
            donutWidth = 70;

        var tip = d3
            .tip()
            .attr('class', 'd3-tip')
            .offset(function() {
                return [-10, 0];
            })
            .html(function(d) {
                var units = ' MB';
                var divisor = 1000000;
                if (d.data.size > 1000000000) {
                    divisor *= 1000;
                    units = ' GB';
                }
                return d3.format('.2f')(d.data.size / divisor) + units + '<br>' + d.data.name;
            });

        var chart = d3
            .select('.' + areaID)
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', 'translate(' + (width / 2 + margin.left) + ',' + (height / 2 - margin.top) + ')');

        chart.call(tip);

        var color = d3.scaleLinear([0, 2 * Math.PI], ['steelblue', 'white']);

        var arc = d3
            .arc()
            .innerRadius(radius - donutWidth)
            .outerRadius(radius)
            .padAngle(0.002);

        var pie = d3
            .pie()
            .value(function(d) {
                return d.size;
            })
            .sort(null);

        const pathGroup = chart.append('g');
    
        var path = pathGroup
            .selectAll('path')
            .data(pie(data[2]))
            .join('path')
            .attr('d', arc)
            .attr('fill', d => color(d.startAngle))
            .style('cursor', 'pointer')
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide)
            .on('click', clicked);

        function clicked(d) {
            const pieData = pie(data[d.data.reference.number][d.data.reference.key]);
            const scaleCoeff = (d.endAngle - d.startAngle)/(2 * Math.PI);
            let shift = d.startAngle;
            let delta = 0;
            pieData.forEach(o => {
                delta = (o.endAngle - o.startAngle) * scaleCoeff;
                o.current = { startAngle: shift, endAngle: shift + delta }
                o.target = { startAngle: o.startAngle, endAngle: o.endAngle }
                shift += delta;
            });

            path = pathGroup
                .selectAll('path')
                .data(pieData)
                .join('path')
                .attr('d', arc)
                .attr('fill', color(d.startAngle))
                .style('cursor', 'pointer')
                .on('mouseover', tip.show)
                .on('mouseout', tip.hide)
                .on('click', clicked);
            
            label
                .selectAll('text')
                    .data(pieData)
                    .join('text')
                        .attr('dy', '0.35em')
                        .attr('font-size', '11px')
                        .attr('fill-opacity', 0)
                        .text(o => o.data.name);

            const dur = 1000;

            const t = chart.transition().duration(dur);

            path.transition(t)
                .tween('data', d => {
                    const i = d3.interpolate(d.current, d.target);
                    return t => d.current = i(t);
                })
                .attr('fill', d => color(d.startAngle))
                .attrTween("d", d => () => arc(d.current));

            d3.select('#mainTitle').attr('font-size', '18px').text(d.data.name + ' breakdown');

            label.selectAll('text').filter(d => labelVisible(d.target)).transition(t)
                .attr('fill-opacity', 1)
                .attrTween('transform', d => () => labelTransform(d.current));

            labelDynamicSizing();
            titleResizing();
        }

        function middleClicked() {
            path = pathGroup
                .selectAll('path')
                .data(pie(data[2]))
                .join('path')
                .attr('d', arc)
                .attr('fill', d => color(d.startAngle))
                .style('cursor', 'pointer')
                .on('mouseover', tip.show)
                .on('mouseout', tip.hide)
                .on('click', clicked);

            label
            .selectAll('text')
                .data(pie(data[2]))
                .join('text')
                    .attr('dy', '0.35em')
                    .attr('font-size', '11px')
                    .attr('fill-opacity', 0)
                    .text(o => o.data.name);

            label.selectAll('text').filter(d => labelVisible(d))
                .attr('fill-opacity', 1)
                .attr('transform', d => labelTransform(d));

            d3.select('#mainTitle').attr('font-size', '18px').text(graphHeader);
        }

        const textArray = [{ text: graphHeader, size: 18, weight: 'bold', id: 'mainTitle', x: 0, y: 0 }, { text: 'by bytes', size: 18, weight: 'normal', id: 'subTitle', x: 0, y: '1em' }];
        
        // Add title
        const titles = chart
            .append('g')
            .selectAll('text')
                .data(textArray)
                .join('text')
                    .attr('font-size', d => d.size + 'px')
                    .attr('font-weight', d => d.weight)
                    .attr('id', d => d.id)
                    .attr('x', d => d.x)
                    .attr('y', d => d.y)
                    .attr('text-anchor', 'middle')
                    .text(d => d.text)
                    .on('click', middleClicked);

        // Adds labels to wedges
        const label = chart
            .append('g')
                .style('font-size', '11px')
                .attr('pointer-events', 'none')
                .attr('text-anchor', 'middle')
                .style('user-select', 'none');
        
        label
            .selectAll('text')
                .data(pie(data[2]))
                .join('text')
                    .attr('dy', '0.35em')
                    .attr('fill-opacity', 0)
                    .text(o => o.data.name);

        label.selectAll('text').filter(d => labelVisible(d))
            .attr('fill-opacity', 1)
            .attr('transform', d => labelTransform(d));

        const center = chart
            .append('circle')
            .attr('r', radius - donutWidth)
            .attr('fill', 'none')
            .attr('pointer-events', 'all')
            .style('cursor', 'pointer')
            .on('click', middleClicked);

        labelDynamicSizing();

        function labelVisible(d) {
            return (d.endAngle - d.startAngle) > 0.07;
        }
    
        function labelTransform(d) {
            const x = (d.endAngle + d.startAngle) / 2 * 180 / Math.PI;
            const y = radius - donutWidth / 2;
            return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
        }

        function labelDynamicSizing() {
            label.selectAll('text').nodes().forEach(label => {
                if (label.getComputedTextLength() > donutWidth) {
                    label.setAttribute('font-size', 11 * donutWidth / (label.getComputedTextLength() + 4) + 'px');
                }
            })
        }

        function titleResizing() {
            titles.nodes().forEach(label => {
                if (label.getComputedTextLength() > 2 * (radius - donutWidth)) {
                    label.setAttribute('font-size', 36 * (radius - donutWidth) / (label.getComputedTextLength() + 4) + 'px');
                }
            })
        }
    }

    // Turn json obj into desired working data
    function reformatData(obj) {
        var languageData = {};
        var repoData = {};

        // Process repo breakdown by language
        Object.keys(obj['data']).forEach(repoName => {
            repoData[repoName] = [];
            var value = obj['data'][repoName]['languages']['edges'] != null ? obj['data'][repoName]['languages']['edges'].length : 0;
            for (var i = 0; i < value; i++) {
                repoData[repoName].push({ name: obj['data'][repoName]['languages']['nodes'][i]['name'], size: obj['data'][repoName]['languages']['edges'][i]['size'], reference: { number: 1, key: obj['data'][repoName]['languages']['nodes'][i]['name'] } });
            }
            repoData[repoName].sort((a, b) => b.size - a.size);
        });

        // Process language breakdown
        Object.keys(repoData).forEach(key => {
            repoData[key].forEach(language => {
                if (languageData.hasOwnProperty(language.name)) {
                    languageData[language.name].push({ name: key, size: language.size, reference: { number: 0, key: key } });
                } else {
                    languageData[language.name] = [{ name: key, size: language.size, reference: { number: 0, key: key } }];
                }
            });
        });
        Object.keys(languageData).forEach(key => {
            languageData[key].sort((a, b) => b.size - a.size);
        });

        // Process total breakdown
        var totalData = [];
        Object.keys(languageData).forEach(key => {
            totalData.push({ name: key, size: sum(languageData[key]), reference: { number: 1, key: key } });
        });
        totalData.sort((a, b) => b.size - a.size);

        return [repoData, languageData, totalData];
    }

    function sum(inputArray) {
        var total = 0;
        inputArray.forEach(d => {
            total += d.size;
        });
        return total;
    }
}
