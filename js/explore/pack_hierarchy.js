/* Creates line graph visualization for webpage */
function draw_line_repoActivity(areaID) {
    // load data file, process data, and draw visualization
    var url = ghDataDir + 'location'; // TODO: Replace 'location' with name of json file containing data
    d3.json(url, function(obj) {
        var data = reformatData(obj);
        drawGraph(data, areaID);
    });

    function drawGraph(data, areaID) {
        // TODO: drawGraph function should be the main function responsible for the creation of the svg
        var margin = { top: stdMargin.top, right: stdMargin.right, bottom: stdMargin.bottom, left: stdMargin.left },
            width = stdTotalWidth - margin.left - margin.right,
            height = stdHeight;

        var chart = d3
            .select('.' + areaID)
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    }

    // Turn json obj into desired working data
    function reformatData(obj) {
        // TODO: Turn obj into usable data. For many d3 visualizations, you will need to make sure that the output is d3.hierarchy complient
        var data = { name: 'LLNL', children: [] };
        let depthOneArray = [];
        let depthTwoArray = [];
        let depthThreeArray = [];
        
        return data;
    }
}