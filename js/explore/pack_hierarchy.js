/* Creates line graph visualization for webpage */
function draw_pack_hierarchy(areaID) {
    // load data file, process data, and draw visualization
    var url = ghDataDir + '/labUsers.json';
    d3.json(url, function(obj) {
        var data = reformatData(obj);
        console.debug(data);
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
        var data = { name: 'LLNL', children: [] };
        for (var user in obj['data']) {
            if (obj['data'][user]['contributedLabRepositories'] === undefined) {
                continue;
            }
            for (var ownerRepo of obj['data'][user]['contributedLabRepositories']['nodes']) {
                let owner = ownerRepo.split('/')[0];
                let repo = ownerRepo.split('/')[1];
                if (!data.children.some(d => d.name == owner)) {
                    data.children.push({ name: owner, children: [] });
                }
                let indexOfOwner = data.children.findIndex(d => d.name == owner);
                if (!data.children[indexOfOwner].children.some(d => d.name == repo)) {
                    data.children[indexOfOwner].children.push({ name: repo, children: [] });
                }
                let indexOfRepo = data.children[indexOfOwner].children.findIndex(d => d.name == repo);
                data.children[indexOfOwner].children[indexOfRepo].children.push({ name: user, value: 1 });
            }
        }
        
        return data;
    }
}