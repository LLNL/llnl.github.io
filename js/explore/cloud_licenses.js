/* Creates word cloud visualization for webpage */
function draw_cloud_licenses(areaID) {
    // load data file, process data, and draw visualization
    var url = ghDataDir + '/intReposInfo.json';
    d3.json(url, function(obj) {
        var fullnameDict = {};
        var data = reformatData(obj, fullnameDict);
        drawCloud(data, areaID, fullnameDict);
    });

    // Draw cloud from data
    function drawCloud(data, areaID, fullnameDict) {
        var graphHeader = 'Repo Licenses';

        var wordScale = d3
            .scaleLinear()
            .domain([
                0,
                d3.max(data, function(d) {
                    return d.value;
                })
            ])
            .range([12, 60]);
        var fill = d3.scaleOrdinal(d3.schemeCategory20);

        var margin = { top: stdMargin.top, right: stdMargin.right / 2, bottom: stdMargin.bottom / 2, left: stdMargin.left / 2 },
            width = stdTotalWidth - margin.left - margin.right,
            height = stdTotalHeight - margin.top - margin.bottom;

        var tip = d3
            .tip()
            .attr('class', 'd3-tip')
            .offset(function() {
                return [this.getBBox().height / 2, 0];
            })
            .html(function(d) {
                return fullnameDict[d.text];
            });

        var layout = d3.layout
            .cloud()
            .size([width, height])
            .words(
                data.map(function(d) {
                    return { text: d.name, size: wordScale(d.value) };
                })
            )
            .padding(5)
            .rotate(function() {
                return ~~(Math.random() * 2) * 90;
            })
            .fontSize(function(d) {
                return d.size;
            })
            .on('end', draw);

        layout.start();

        // Add title
        d3.select('.' + areaID)
            .append('text')
            .attr('class', 'graphtitle')
            .attr('x', margin.left + width / 2)
            .attr('y', margin.top - margin.top / 3)
            .attr('text-anchor', 'middle')
            .text(graphHeader);

        function draw(words) {
            var wordCloud = d3
                .select('.' + areaID)
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('width', width)
                .attr('height', height)
                .attr('transform', 'translate(' + (width / 2 + margin.left) + ',' + (height / 2 + margin.top) + ')');

            wordCloud.call(tip);

            wordCloud
                .selectAll('text')
                .data(words)
                .enter()
                .append('text')
                .attr('class', 'cloudtext')
                .style('font-size', function(d) {
                    return d.size + 'px';
                })
                .style('fill', function(d, i) {
                    return fill(i);
                })
                .attr('text-anchor', 'middle')
                .attr('transform', function(d) {
                    return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';
                })
                .text(function(d) {
                    return d.text;
                })
                .on('mouseover', tip.show)
                .on('mouseout', tip.hide);
        }
    }

    // Turn json obj into desired word list
    function reformatData(obj, fullnameDict) {
        var wordDict = {};
        for (var repo in obj['data']) {
            if (obj['data'].hasOwnProperty(repo)) {
                var licInfo = obj['data'][repo]['licenseInfo'];
                if (licInfo == null) {
                    continue;
                } // skip if no license info
                fullnameDict[licInfo['spdxId']] = licInfo['name'];
                var aWord = licInfo['spdxId'];
                if (aWord == null) {
                    aWord = licInfo['name'];
                } // use long name if no short name
                if (aWord == null || aWord == 'NOASSERTION') {
                    continue;
                } // skip if no license name or Other
                if (!Object.keys(wordDict).contains(aWord)) {
                    wordDict[aWord] = 0;
                }
                wordDict[aWord] += 1;
            }
        }
        var data = [];
        for (var aWord in wordDict) {
            if (wordDict.hasOwnProperty(aWord)) {
                var datpair = { name: aWord, value: wordDict[aWord] };
                data.push(datpair);
            }
        }
        // Prioritize highest counts
        data.sort((a, b) => (a.value < b.value ? 1 : a.value > b.value ? -1 : 0));
        return data;
    }
}
