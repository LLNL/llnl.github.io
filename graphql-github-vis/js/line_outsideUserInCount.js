/* Creates line graph visualization for webpage */
function draw_line_outsideUserInCount(areaID) {

	var yearQ = d3.queue();
	var datPrefix = 'usersMembership';
	// Get list of years for relevant data
	d3.json('./github-data/YEARS.json', function(obj) {
		var yearList = obj[datPrefix];
		// load each year file
		yearList.forEach(function(nYEAR) {
			var url = './github-data/'+datPrefix+'.'+nYEAR+'.json';
			yearQ.defer(d3.json, url);
		});
		// Merge data, process data, and draw visualization
		yearQ.awaitAll(function(error, response){
			var combinedData = {};
			for (var i=0; i < response.length; i++) {
				Object.assign(combinedData, response[i]);
			};
			var data = reformatData(combinedData);
			drawGraph(data, areaID);
		});
	});
	

	// Draw graph from data
	function drawGraph(data, areaID) {

		var graphHeader = "Outside Users Contributing to Lab Repos";

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
				var repos = " Users";
				if (d.value == 1) {
					repos = " User";
				}
				return "<sub>["+formatTime(d.date)+"]</sub>"+"<br>"+d.value+repos;
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


	// Turn json objs into desired working data
	function reformatData(obj) {
		// TODO
		var dates = Object.keys(obj);
		dates.sort();
		var data = [];
		dates.forEach(function (timestamp) {
			var userTotal = obj[timestamp]["outsideUsers"]["totalCount"];
			data.push({date: timestamp, value: userTotal});
		});
		return data
	};

}
