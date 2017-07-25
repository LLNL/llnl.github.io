/* Creates line graph visualization for webpage */
function draw_line_labRepoCountOutCount(areaID) {

	var RepoVars = {
		obj:null,
		yearList:null,
		datPrefix:'orgsRepos'
	};
	var OutsiderVars = {
		obj:null,
		yearList:null,
		datPrefix:'outsidersLabRepos'
	};

	d3.json('./github-data/YEARS.json', function(obj) {
		RepoVars.yearList = obj[RepoVars.datPrefix];
		OutsiderVars.yearList = obj[OutsiderVars.datPrefix];
		yearCollection(RepoVars);
		yearCollection(OutsiderVars);
	});

	function yearCollection(someVars) {
		var yearList = someVars.yearList;
		var datPrefix = someVars.datPrefix;
		var yearQ = d3.queue();
		// load each year file
		yearList.forEach(function(nYEAR) {
			var url = './github-data/'+datPrefix+'.'+nYEAR+'.json';
			yearQ.defer(d3.json, url);
		});
		// Merge data
		yearQ.awaitAll(function(error, response){
			var combinedData = {};
			for (var i=0; i < response.length; i++) {
				Object.assign(combinedData, response[i]);
			};
			someVars.obj = combinedData;
			// Once all files are read, process data, and draw visualization
			if (RepoVars.obj && OutsiderVars.obj) {
				var data = reformatData(RepoVars.obj,OutsiderVars.obj);
				drawGraph(data["data"], data["data2"], areaID);
			}
		});
	};


	// Draw graph from data
	function drawGraph(data, data2, areaID) {

		var graphHeader = "Lab Repos Combo";
		var seriesData = [
			{label:"Total"},
			{label:"W/ External Contributors"}
			];

		var parseTime = d3.timeParse("%Y-%m-%d");
		var formatTime = d3.timeFormat("%Y-%m-%d");

		data.forEach(function(d) {
			d.date = parseTime(d.date);
			d.value = +d.value;
		});

		data2.forEach(function(d) {
			d.date = parseTime(d.date);
			d.value = +d.value;
		});

		var margin = {top: stdMargin.top, right: stdMargin.right*1.75, bottom: stdMargin.bottom, left: stdMargin.left},
			width = stdWidth,
			height = stdHeight,
			maxBuffer = stdMaxBuffer;
		
		// Get min-max timestamps across both datasets
		var timerange = d3.extent(data, function(d) { return d.date; });
		timerange.push.apply(timerange,
			d3.extent(data2, function(d) { return d.date; })
			);

		// Get min-max values across both datasets
		var datrange = d3.extent(data, function(d) { return d.value; });
		datrange.push.apply(datrange,
			d3.extent(data2, function(d) { return d.value; })
			);

		var x = d3.scaleTime()
			.domain(d3.extent(timerange))
			.range([0, width]);
		
		var y = d3.scaleLinear()
			.domain([0, d3.max(datrange)*maxBuffer])
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
		// Draw line2
		chart.append("path")
			.datum(data2)
			.attr("class", "second line")
			.attr("d", valueline);

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
			.data(data2)
		  .enter().append("circle")
			.attr("class", "second circle")
			.attr("cx", function(d) { return x(d.date); })
			.attr("cy", function(d) { return y(d.value); })
			.attr("r", stdDotRadius)
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
	function reformatData(objRepos, objOutsider) {
		var obj = objRepos;
		var dates = Object.keys(obj);
		dates.sort();
		var data = [];
		dates.forEach(function (timestamp) {
			var repoTotal = 0;
			for (var org in obj[timestamp]) {
				if (obj[timestamp].hasOwnProperty(org)) {
					repoTotal += obj[timestamp][org]["repositories"]["totalCount"];
				};
			};
			data.push({date: timestamp, value: repoTotal});
		});

		var obj = objOutsider;
		var dates = Object.keys(obj);
		dates.sort();
		var data2 = [];
		dates.forEach(function (timestamp) {
			var repoSet = new Set();
			for (var usr in obj[timestamp]) {
				if (obj[timestamp].hasOwnProperty(usr)) {
					var repoNodes = obj[timestamp][usr]["contributedLabRepositories"]["nodes"]
					for (var i=0; i<repoNodes.length; i++) {
						repoSet.add(repoNodes[i]["nameWithOwner"])
					};
				};
			};
			data2.push({date: timestamp, value: repoSet.size});
		});

		var allData = {"data":data, "data2":data2};
		return allData;
	};
	

}
