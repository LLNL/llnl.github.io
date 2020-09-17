/* Creates line graph visualization for webpage */
function draw_popularRepos(areaID, columns=2, orthogonalOrdering=false) {
    var data = reformatData(mostPopularRepositories);
    drawList(data, areaID);

    function drawList(data, areaID) {
        const graphHeader = 'Repo Popularity by Stars';

        const rowSpacing = 5,
            columnSpacing = 15,
            fontSize = 14;
        const margin = { top: stdMargin.top, right: stdMargin.right, bottom: stdMargin.bottom, left: stdMargin.left },
            width = stdTotalWidth * 2,
            height = (fontSize + rowSpacing) * (data[0].entries.length + 1);

        const columnSize = width / data.length - columnSpacing * (data.length - 1);

        const columnSizeTotal = columnSize * data.length + columnSpacing * (data.length - 1);

        const centering = (width - columnSizeTotal) / 2;
        
        let n = 0;
        let m = 0;
        const textData = data.flatMap(d => d.entries.map(o => {
            n++;
            if (m >= data.length) {
                m = 0;
            }
            let returnObj = { entry: o, number: d.number, position: n }
            if (orthogonalOrdering) {
                returnObj.number = m;
            }
            m++;
            return returnObj;
        }));

        const chart = d3
            .select('.' + areaID)
                .attr('width', width)
                .attr('height', height + margin.top)
                .append('g')
                    .attr('transform', 'translate(' + centering + ',' + margin.top + ')');
        
        const columns = chart
            .selectAll('g')
            .data(data)
            .join('g')
                .attr('transform', d => `translate(${columnSize * d.number + columnSpacing * d.number},${fontSize + rowSpacing})`);

        columns.selectAll('text')
            .data(d => textData.filter(o => o.number == d.number))
            .join('text')
                .attr('font-size', fontSize)
                .attr('y', (d, i) => (fontSize + rowSpacing) * i)
                .html(d => `<tspan style="font-weight: bold">${d.position}.</tspan> <a xlink:href=${window.location['origin']}/repo/#/${d.entry.owner}/${d.entry.name}>${d.entry.owner}/${d.entry.name}</a>`);

        chart
            .append('g')
                .append('text')
                    .attr('class', 'graphtitle')
                    .attr('x', width / 2 - centering)
                    .attr('y', 0 - margin.top / 2)
                    .attr('text-anchor', 'middle')
                    .text(graphHeader);
        
    }

    // Turn json obj into desired working data
    function reformatData(obj) {
        const data = [];
        const minColumnSize = Math.floor(obj.length/columns);
        const numLargerColumns = obj.length - columns * minColumnSize;

        var n = 0;
        for (var i = 0; i < columns; i++) {
            data[i] = { entries: [], number: i };
            var cap = (i < numLargerColumns) ? minColumnSize + 1 : minColumnSize;
            for (var j = 0; j < cap; j++) {
                data[i]['entries'].push(obj[n]);
                n++;
            }
        }

        return data;
    }
}