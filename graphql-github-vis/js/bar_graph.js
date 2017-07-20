/* Creates bar graph visualization for webpage */
function makeBarGraph(areaID) {

	// load data file, process data, and draw visualization
	var url = './github-data/orgsRepos.json';
	d3.json(url, function(obj) {
		var data = reformatData(obj);
		drawGraph(data, areaID);
	});


	// Draw graph from data
	function drawGraph(data, areaID) {
		data.forEach(function(d) {
			d.value = +d.value;
		});

		var margin = {top: 40, right: 30, bottom: 60, left: 40},
			width = 1000 - margin.left - margin.right,
			height = 500 - margin.top - margin.bottom;
		
		var x = d3.scaleBand()
			.domain(data.map(function(d) { return d.name; }))
			.rangeRound([0, width])
			.padding([0.1]);
		
		var y = d3.scaleLinear()
			.domain([0, d3.max(data, function(d) { return d.value; })])
			.range([height, 0]);
		
		var xAxis = d3.axisBottom()
			.scale(x);
		
		var yAxis = d3.axisLeft()
			.scale(y);

		var tip = d3.tip()
			.attr('class', 'd3-tip')
			.offset([-10, 0])
			.html(function(d) {
				var repos = " Repos";
				if (d.value == 1) {
					repos = " Repo";
				}
				return d.value + repos;
			});
		
		var chart = d3.select("."+areaID)
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
		  .append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
		
		chart.call(tip);

		// Add the x axis
		chart.append("g")
			.attr("class", "xbar axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis);
		
		// Add the y axis
		chart.append("g")
			.attr("class", "y axis")
			.call(yAxis);

		// Add title
		chart.append("text")
			.attr("class", "graphtitle")
			.attr("x", (width / 2))
			.attr("y", 0 - (margin.top / 3))
			.attr("text-anchor", "middle")
			.text("Repository Counts");
		
		// Draw bars
		chart.selectAll(".bar")
			.data(data)
		  .enter().append("rect")
			.attr("class", "bar")
			.attr("x", function(d) { return x(d.name); })
			.attr("y", function(d) { return y(d.value); })
			.attr("height", function(d) { return height - y(d.value); })
			.attr("width", x.bandwidth())
			.on('mouseover', tip.show)
			.on('mouseout', tip.hide);

		// Angle the axis text
		chart.select(".xbar.axis")
			.selectAll("text")
			.attr("transform", "rotate(12)")
			.attr("text-anchor", "start");
	};


	// Turn json obj into desired working data
	function reformatData(obj) {
		var dates = Object.keys(obj);
		dates.sort();
		var latest = obj[dates[dates.length-1]];
		var data = [];
		var orglist = Object.keys(latest);
		orglist.sort();
		orglist.push(orglist[0]);
		delete orglist[0];
		orglist.forEach(function (org) {
			if (latest.hasOwnProperty(org)) {
				var dName = latest[org].name;
				var dValue = latest[org].repositories.totalCount;
				var datpair = {name: dName, value: dValue};
				data.push(datpair);
			}
		});
		return data
	};

}
