/* Creates scatter plot graph visualization for webpage */
function draw_scatter_repoPullsVIssues(areaID) {

	// load data file, process data, and draw visualization
	var url = './github-data/reposPullsIssues.json';
	d3.json(url, function(obj) {
		var data = reformatData(obj);
		drawScatter(data, areaID);
	});


	// Draw scatter plot from data
	function drawScatter(data, areaID) {

		var graphHeader = "Merged Pull Requests VS Open Issues";

		data.forEach(function(d) {
			d.valueX = +d.valueX;
			d.valueY = +d.valueY;
		});

		var margin = stdMargin,
			width = stdWidth,
			height = stdHeight;

		var x = d3.scaleLog()
			.clamp(true)
			.domain([1, d3.max(data, function(d) { return d.valueX; })])
			.range([0, width])
			.nice();

		var y = d3.scaleLog()
			.clamp(true)
			.domain([1, d3.max(data, function(d) { return d.valueY; })])
			.range([height, 0])
			.nice();

		var xAxis = d3.axisBottom()
			.scale(x)
			.ticks(10,d3.format("d"));
		
		var yAxis = d3.axisLeft()
			.scale(y)
			.ticks(10,d3.format("d"));

		var tip = d3.tip()
			.attr('class', 'd3-tip')
			.offset([-10, 0])
			.html(function(d) {
				var pulls = " Pulls";
				if (d.valueX == 1) {
					pulls = " Pull";
				}
				var issues = " Issues";
				if (d.valueX == 1) {
					issues = " Issue";
				}
				var tipstring = "<sub>["+d.valueX+pulls+" - "+d.valueY+issues+"]</sub><br>"
				return tipstring+d.names.join("<br>");
			});

		var chart = d3.select("."+areaID)
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
		  .append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		chart.call(tip);

		// Add the x axis
		chart.append("g")
			.attr("class", "x axis")
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
			.text(graphHeader);

		// Add x axis label
		chart.append("text")
			.attr("class", "axistitle")
			.attr("x", (width / 2))
			.attr("y", (height+margin.bottom) - (margin.bottom / 4))
			.attr("text-anchor", "middle")
			.text("Merged Pull Requests");

		// Add y axis label
		chart.append("text")
			.attr("class", "axistitle")
			.attr("transform", "rotate(-90)")
			.attr("y", 0 - margin.left + (margin.left / 4))
			.attr("x", 0 - (height / 2))
			.attr("text-anchor", "middle")
			.text("Open Issues");

		// Draw dots
		chart.selectAll(".circle")
			.data(data)
		  .enter().append("circle")
			.attr("class", "circle")
			.attr("cx", function(d) { return x(d.valueX); })
			.attr("cy", function(d) { return y(d.valueY); })
			.attr("r", stdDotRadius)
			.on('mouseover', tip.show)
			.on('mouseout', tip.hide);

	};


	// Turn json obj into desired working data
	function reformatData(obj) {
		var dataDict = {};
		for (var repo in obj["data"]) {
			if (obj["data"].hasOwnProperty(repo)) {
				var repoDict = obj["data"][repo],
					pullsMerged = repoDict["pullRequests"]["totalCount"],
					issuesOpen = repoDict["issues"]["totalCount"],
					doubleKey = [pullsMerged,issuesOpen];
				if (!Object.keys(dataDict).contains(doubleKey)) {
					dataDict[doubleKey] = [];
				}
				dataDict[doubleKey].push(repo);
			}
		}
		var data = [];
		for (var doubleKey in dataDict) {
			if (dataDict.hasOwnProperty(doubleKey)) {
				var numbers = doubleKey.split(",");
				var dataset = {
					names: dataDict[doubleKey].sort(),
					valueX: +numbers[0], // pulls merged
					valueY: +numbers[1] // isues open
				};
				data.push(dataset);
			}
		}
		return data;
	};

}