/* Creates line graph visualization for webpage */
function draw_line_labUserCountOutCount(areaID) {

	// load 3 data files, process data, and draw visualization
	var url0 = './github-data/membersRepos.json';
	var url1 = './github-data/reposOwnership.json';
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

		var graphHeader = "Lab Members Combo";
		var seriesData = [
			{label:"Total"},
			{label:"Contributing Externally"}
			];

		var parseTime = d3.timeParse("%Y-%m-%d");
		var formatTime = d3.timeFormat("%Y-%m-%d");

		data.forEach(function(d) {
			d.date = parseTime(d.date);
			d.value = +d.value;
		});

		var margin = {top: stdMargin.top, right: stdMargin.right*1.75, bottom: stdMargin.bottom, left: stdMargin.left},
			width = stdWidth,
			height = stdHeight,
			maxBuffer = stdMaxBuffer;
		
		var x = d3.scaleTime()
			.domain(d3.extent(data, function(d) { return d.date; }))
			.range([0, width]);
		
		var y = d3.scaleLinear()
			.domain([0, d3.max(data, function(d) { return d.value; })*maxBuffer])
			.range([height, 0]);

		var xAxis = d3.axisBottom()
			.scale(x);
		
		var yAxis = d3.axisLeft()
			.scale(y);

		var tip = d3.tip()
			.attr('class', 'd3-tip')
			.offset([-10, 0])
			.html(function(d) {
				var users = " Users";
				if (d.value == 1) {
					users = " User";
				}
				return "<sub>["+formatTime(d.date)+"]</sub>"+"<br>"+d.value+users;
			});

		var tip2 = d3.tip()
			.attr('class', 'd3-tip')
			.offset([-10, 0])
			.html(function(d) {
				var users = " Users";
				if (d.value == 1) {
					users = " User";
				}
				return "<sub>["+formatTime(d.date)+"]</sub>"+"<br>"+d.value2+users;
			});
		
		var valueline = d3.line()
			.x(function(d) { return x(d.date); })
			.y(function(d) { return y(d.value); });

		var valueline2 = d3.line()
			.x(function(d) { return x(d.date); })
			.y(function(d) { return y(d.value2); });

		var chart = d3.select("."+areaID)
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
		  .append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		chart.call(tip);
		chart.call(tip2);

		// Calculate widths of legend text labels
		chart.selectAll(".dummyText")
			.data(seriesData)
		  .enter().append("text")
			.attr("class", "legendText")
			.text(function(d) {return d;})
			.each(function(d,i) {
				d.width = this.getComputedTextLength();
				this.remove();
			});
		
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
		
		// Draw line
		chart.append("path")
			.datum(data)
			.attr("class", "line")
			.attr("d", valueline);
		// Draw line2
		chart.append("path")
			.datum(data)
			.attr("class", "second line")
			.attr("d", valueline2);

		// Draw dots
		var points1 = chart.selectAll(".total-circle")
			.data(data)
		  .enter().append("circle")
			.attr("class", "circle")
			.attr("cx", function(d) { return x(d.date); })
			.attr("cy", function(d) { return y(d.value); })
			.attr("r", stdDotRadius)
			.on('mouseover', tip.show)
			.on('mouseout', tip.hide);
		seriesData[0].fillColor = points1.style("fill");
		seriesData[0].strokeColor = points1.style("stroke");
		// Draw dots2
		var points2 = chart.selectAll(".externals-circle")
			.data(data)
		  .enter().append("circle")
			.attr("class", "second circle")
			.attr("cx", function(d) { return x(d.date); })
			.attr("cy", function(d) { return y(d.value2); })
			.attr("r", stdDotRadius)
			.on('mouseover', tip2.show)
			.on('mouseout', tip2.hide);
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
			.attr("class", "legendCircle")
			.style("fill", function(d) { return d.fillColor; })
			.style("stroke", function(d) { return d.strokeColor; })
			.attr("r", stdDotRadius*1.25 )
			.attr("cx", function(d,i) { return (width+margin.right) - (stdDotRadius*1.25) })
			.attr("cy", function(d,i) { return (height-10) - stdDotRadius*1.25 - 30*i });
		chart.selectAll(".series-labels")
			.data(seriesData)
		  .enter().append("text")
		  	.attr("class", "legendText")
			.text(function(d) { return d.label; })
			.attr("text-anchor", "end")
			.attr("x", function(d,i) { return (width+margin.right) - (2*stdDotRadius*1.25 + 4) })
			.attr("y", function(d,i) { return (height-10) - 30*i });

	};


	// Turn json obj into desired working data
	function reformatData(objUsrs, objSorted) {
		var dates = Object.keys(objUsrs);
		dates.sort();
		var data = [];
		dates.forEach(function (timestamp) {
			var userTotal = Object.keys(objUsrs[timestamp]).length;
			var userTotal2 = reformatData2(timestamp, objUsrs, objSorted);
			data.push({date: timestamp, value: userTotal, value2: userTotal2});
		});
		return data
	};
	
	function reformatData2(timestamp, objUsrs, objSorted) {
		// Get list of outsideRepositories for this date
		var outsideNodes = objSorted[timestamp]["outsideRepositories"]["nodes"];
		var outsideRepos = [];
		for (var i=0; i < outsideNodes.length; i++) {
			outsideRepos.push(outsideNodes[i]["nameWithOwner"]);
		};
		// Count users contributing to repos in that list
		var userTotal = 0;
		for (var usr in objUsrs[timestamp]) {
			if (objUsrs[timestamp].hasOwnProperty(usr)) {
				var usrRepoNodes = objUsrs[timestamp][usr]["contributedRepositories"]["nodes"];
				for (var i=0; i < usrRepoNodes.length; i++) {
					if (outsideRepos.contains(outsideNodes[i]["nameWithOwner"])) {
						// Only count each user once as soon as any outside repo is found
						userTotal += 1;
						break;
					};
				};
			};
		};
		return userTotal;
	};
	

}
