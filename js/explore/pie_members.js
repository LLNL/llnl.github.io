/* Creates pie chart visualization for webpage */
function draw_pie_members(areaID) {

	// load data file, process data, and draw visualization
	var url0 = ghDataDir+'/labUsers.json';
	var url1 = ghDataDir+'/extRepos.json';
	d3.queue()
		.defer(d3.json, url0)
		.defer(d3.json, url1)
		.awaitAll(function(error,response){
			if (error) throw error;
			var data = reformatData(response[0],response[1]);
			drawGraph(data, areaID);
		});


	// Draw graph from data
	function drawGraph(data, areaID) {

		var margin = {top: 0, right: 0, bottom: 0, left: 0},
			width = stdTotalWidth - margin.left - margin.right,
			height = stdTotalHeight - margin.top - margin.bottom,
			radius = d3.min([width-margin.left-margin.right, height-margin.top-margin.bottom]) / 2,
			donutWidth = 75;
		var legendRectSize = 18,
			legendSpacing = 4;

		var color = d3.scaleOrdinal(d3.schemeCategory20c);

		var chart = d3.select("."+areaID)
			.attr('width', width)
			.attr('height', height)
		  .append('g')
			.attr("transform", "translate(" + (width/2 + margin.left) + "," + (height/2 + margin.top) + ")");

		var arc = d3.arc()
			.innerRadius(radius - donutWidth)
			.outerRadius(radius);

		var pie = d3.pie()
			.value(function(d) { return d.count; })
			.sort(null);

		var path = chart.selectAll('path')
			.data(pie(data))
		  .enter()
			.append('path')
			.attr('d', arc)
			.attr('fill', function(d, i) {
				return color(d.data.label);
			});

		// Add legend
		var legend = chart.selectAll('.legend')
			.data(color.domain())
		  .enter()
			.append('g')
			.attr('class', 'legend')
			.attr('transform', function(d, i) {
				var height = legendRectSize + legendSpacing;
				var offset =  -height * color.domain().length / 2;
				var horz = -4 * legendRectSize;
				var vert = i * height - offset;
				return 'translate(' + horz + ',' + vert + ')';
			});
		// Squares
		legend.append('rect')
			.attr('width', legendRectSize)
			.attr('height', legendRectSize)
			.style('fill', color)
			.style('stroke', color);
		// Text
		legend.append('text')
			.attr('x', legendRectSize + legendSpacing)
			.attr('y', legendRectSize - legendSpacing)
			.text(function(d) { return d; })
			.attr("text-anchor", "start");

	};


	// Turn json obj into desired working data
	function reformatData(objLabUsers,objExtRepos) {
		// TODO
		var userTotal = Object.keys(objLabUsers["data"]).length;
		var userSubset = new Set();
		var extRepos = Object.keys(objExtRepos["data"]);
		extRepos.forEach( function(repo) {
			if (objExtRepos["data"].hasOwnProperty(repo)) {
				var labContrib = objExtRepos["data"][repo]["labContributors"]["nodes"];
				labContrib.forEach( function(member) {
					userSubset.add(member);
				});
			}
		});
		var subTotal = userSubset.size;
		var data = [
			{ label: 'No External Repos', count: userTotal-subTotal },
			{ label: 'Contributing Externally', count: subTotal }
		];
		console.log(userTotal,userTotal-subTotal,subTotal);
		return data;
	};

}
