/* Creates line graph visualization for webpage */
function draw_line_labUserCount(areaID) {

	// load data file, process data, and draw visualization
	var url = './github-data/membersRepos.json';
	d3.json(url, function(obj) {
		var data = reformatData(obj);
		drawGraph(data, areaID);
	});
	

	// Draw graph from data
	function drawGraph(data, areaID) {

		var graphHeader = "Members of LLNL GitHub Organizations";

		var parseTime = d3.timeParse("%Y-%m-%d");
		var formatTime = d3.timeFormat("%Y-%m-%d");

		data.forEach(function(d) {
			d.date = parseTime(d.date);
			d.value = +d.value;
		});

		var margin = stdMargin,
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
		
		var valueline = d3.line()
			.x(function(d) { return x(d.date); })
			.y(function(d) { return y(d.value); });

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
		
		// Draw line
		chart.append("path")
			.datum(data)
			.attr("class", "line")
			.attr("d", valueline);

		// Draw dots
		chart.selectAll(".circle")
			.data(data)
		  .enter().append("circle")
			.attr("class", "circle")
			.attr("cx", function(d) { return x(d.date); })
			.attr("cy", function(d) { return y(d.value); })
			.attr("r", stdDotRadius)
			.on('mouseover', tip.show)
			.on('mouseout', tip.hide);

		// Angle the axis text
		chart.select(".x.axis")
			.selectAll("text")
			.attr("transform", "rotate(12)")
			.attr("text-anchor", "start");
	};


	// Turn json obj into desired working data
	function reformatData(obj) {
		var dates = Object.keys(obj);
		dates.sort();
		var data = [];
		dates.forEach(function (timestamp) {
			var userTotal = Object.keys(obj[timestamp]).length;
			data.push({date: timestamp, value: userTotal});
		});
		return data
	};

}
