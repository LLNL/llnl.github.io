/* Creates line graph visualization for webpage */
function draw_line_repoCreationHistory(areaID) {

	// load data file, process data, and draw visualization
	var url = ghDataDir+'/labRepos_CreationHistory.json';
	d3.json(url, function(obj) {
		var data = reformatData(obj);
		drawGraph(data["data"], data["data2"], areaID);
	});


	// Draw graph from data
	function drawGraph(data, data2, areaID) {

		var graphHeader = "Repo Creation History";
		var seriesData = [
			{label:"First Commit"},
			{label:"Added to GitHub"}
			];

		var parseTime = d3.timeParse("%Y-%m-%d");
		var formatTime = d3.timeFormat("%Y-%m-%d");

		// Initial release of Git
		var gitrelease = parseTime("2005-04-07");
		// GitHub founded
		var ghfounded = parseTime("2008-02-08");

		function addDateLine(dateObj,label,tipObj) {
			chart.append("path")
				.datum([
					{date:dateObj, value:y.domain()[0]},
					{date:dateObj, value:y.domain()[1]}
					])
				.attr("class", "refline")
				.attr("d", valueline)
				.on('mouseover', tipObj.show)
				.on('mouseout', tipObj.hide);
			chart.append("text")
				.attr("class", "reftext")
				.attr("transform", "rotate(-90)")
				.attr("y",  x(dateObj)-4 )
				.attr("x", 0 - (height / 4))
				.attr("text-anchor", "middle")
				.text(label);
		}

		data.forEach(function(d) {
			d.date = parseTime(d.date);
			d.value = +d.value;
		});

		data2.forEach(function(d) {
			d.date = parseTime(d.date);
			d.value = +d.value;
		});

		var margin = {top: stdMargin.top, right: stdMargin.right*1.75, bottom: stdMargin.bottom, left: stdMargin.left*1.15},
			width = (stdTotalWidth*2) - margin.left - margin.right,
			height = stdHeight;
		var dotRadius = 2,
			legendDotRadius = stdLgndDotRadius,
			legendSpacing = stdLgndSpacing;
		
		// Get min-max timestamps across both datasets
		var timerange = d3.extent(data, function(d) { return d.date; });
		timerange.push.apply(timerange,
			d3.extent(data2, function(d) { return d.date; })
			);
		timerange.push(gitrelease);
		timerange.push(ghfounded);


		// Get min-max values across both datasets
		var datrange = d3.extent(data, function(d) { return d.value; });
		datrange.push.apply(datrange,
			d3.extent(data2, function(d) { return d.value; })
			);

		var x = d3.scaleTime()
			.domain(d3.extent(timerange))
			.range([0, width]);
		
		var y = d3.scaleLinear()
			.domain([0, d3.max(datrange)])
			.range([height, 0])
			.nice();

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
				return "<sub>["+formatTime(d.date)+"]</sub>"+"<br>"+d.value+repos;
			});

		var gittip = d3.tip()
			.attr('class', 'd3-tip')
			.html("<sub>["+formatTime(gitrelease)+"]</sub>"+"<br>"+"Git Released");
		var ghtip = d3.tip()
			.attr('class', 'd3-tip')
			.html("<sub>["+formatTime(ghfounded)+"]</sub>"+"<br>"+"GitHub Founded");
		
		var valueline = d3.line()
			.x(function(d) { return x(d.date); })
			.y(function(d) { return y(d.value); });

		var chart = d3.select("."+areaID)
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
		  .append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		chart.call(tip);
		chart.call(gittip);
		chart.call(ghtip);
		
		// Add the x axis
		chart.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis);
		
		// Add the y axis
		chart.append("g")
			.attr("class", "y axis")
			.call(yAxis);

		// Draw reference date lines
		addDateLine(gitrelease,"Git Released",gittip);
		addDateLine(ghfounded,"GitHub Founded",ghtip);

		// Add title
		chart.append("text")
			.attr("class", "graphtitle")
			.attr("x", (width / 2))
			.attr("y", 0 - (margin.top / 3))
			.attr("text-anchor", "middle")
			.text(graphHeader);

		// Add y axis label
		chart.append("text")
			.attr("class", "axistitle")
			.attr("transform", "rotate(-90)")
			.attr("y", 0 - margin.left + (margin.left / 4))
			.attr("x", 0 - (height / 2))
			.attr("text-anchor", "middle")
			.text("Repositories");
		
		// Draw line
		chart.append("path")
			.datum(data)
			.attr("class", "line")
			.attr("d", valueline);
		// Draw line2
		chart.append("path")
			.datum(data2)
			.attr("class", "second line")
			.attr("d", valueline);

		// Draw dots
		var points1 = chart.selectAll(".total-circle")
			.data(data)
		  .enter().append("circle")
			.attr("class", "dense circle")
			.attr("cx", function(d) { return x(d.date); })
			.attr("cy", function(d) { return y(d.value); })
			.attr("r", dotRadius)
			.on('mouseover', tip.show)
			.on('mouseout', tip.hide);
		seriesData[0].fillColor = points1.style("fill");
		seriesData[0].strokeColor = points1.style("stroke");
		// Draw dots2
		var points2 = chart.selectAll(".externals-circle")
			.data(data2)
		  .enter().append("circle")
			.attr("class", "dense second circle")
			.attr("cx", function(d) { return x(d.date); })
			.attr("cy", function(d) { return y(d.value); })
			.attr("r", dotRadius)
			.on('mouseover', tip.show)
			.on('mouseout', tip.hide);
		seriesData[1].fillColor = points2.style("fill");
		seriesData[1].strokeColor = points2.style("stroke");

		// Angle the axis text
		chart.select(".x.axis")
			.selectAll("text")
			.attr("transform", "rotate(12)")
			.attr("text-anchor", "start");

		// Add legend
		chart.selectAll(".series-colors")
			.data(seriesData)
		  .enter().append("circle")
			.attr("class", "legend")
			.style("fill", function(d) { return d.fillColor; })
			.style("stroke", function(d) { return d.strokeColor; })
			.attr("r", legendDotRadius )
			.attr("cx", function(d,i) { return (width+margin.right/2) - legendDotRadius })
			.attr("cy", function(d,i) { return (height-10) - legendDotRadius - legendSpacing*i });
		chart.selectAll(".series-labels")
			.data(seriesData)
		  .enter().append("text")
		  	.attr("class", "legend")
			.text(function(d) { return d.label; })
			.attr("text-anchor", "end")
			.attr("x", function(d,i) { return (width+margin.right/2) - (2*legendDotRadius + 4) })
			.attr("y", function(d,i) { return (height-10) - legendSpacing*i });

	};


	// Turn json obj into desired working data
	function reformatData(obj) {
		// Build lists of timestamps
		var repos = Object.keys(obj["data"]);
		var ghcreateDates = [];
		var commitDates = [];
		repos.forEach(function (repo) {
			var tCreate = obj["data"][repo]["createdAt"].split("T");
			var tCommit = obj["data"][repo]["firstCommitAt"].split("T");
			ghcreateDates.push(tCreate[0]);
			commitDates.push(tCommit[0]);
		});
		ghcreateDates.sort();
		commitDates.sort();

		// Count accumulated timestamps over time
		var ghCreatedCounts = {};
		var commitCounts = {};
		for (var i=0; i<ghcreateDates.length; i++) {
			ghCreatedCounts[ghcreateDates[i]] = i+1;
			commitCounts[commitDates[i]] = i+1;
		};

		// Format data for graphing
		var data = [];
		var data2 = [];
		for (var timestamp in ghCreatedCounts) {
			data2.push({date: timestamp, value: ghCreatedCounts[timestamp]});
		};
		for (var timestamp in commitCounts) {
			data.push({date: timestamp, value: commitCounts[timestamp]});
		};

		var allData = {"data":data, "data2":data2};
		return allData;
	}

}
