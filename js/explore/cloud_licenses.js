/* Creates word cloud visualization for webpage */
function draw_cloud_licenses(areaID) {

	// load data file, process data, and draw visualization
	var url = ghDataDir+'/reposLicenses.json';
	d3.json(url, function(obj) {
		var data = reformatData(obj);
		drawCloud(data, areaID);
	});
	

	// Draw cloud from data
	function drawCloud(data, areaID) {

		var graphHeader = "Repo Licenses";

		var wordScale = d3.scaleLinear()
			.domain([0, d3.max(data, function (d) { return d.value; })])
			.range([12,60]);
		var fill = d3.scaleOrdinal(d3.schemeCategory20);

		var margin = {top: stdMargin.top, right: stdMargin.right/2, bottom: stdMargin.bottom/2, left: stdMargin.left/2},
			width = stdTotalWidth - margin.left - margin.right,
			height = stdTotalHeight - margin.top - margin.bottom;

		var layout = cloud()
			.size([width, height])
			.words(data.map(function(d) {
				return {text: d.name, size: wordScale(d.value)};
			}))
			.padding(5)
			.rotate(function() { return ~~(Math.random() * 2) * 90; })
			.fontSize(function(d) { return d.size; })
			.on("end", draw);

		layout.start();

		// Add title
		d3.select("."+areaID).append("text")
			.attr("class", "graphtitle")
			.attr("x", margin.left + (width / 2))
			.attr("y", margin.top - (margin.top / 3))
			.attr("text-anchor", "middle")
			.text(graphHeader);

		function draw(words) {
			var wordCloud = d3.select("."+areaID)
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
			  .append("g")
			  	.attr("width", width)
			  	.attr("height", height)
				.attr("transform", "translate(" + (width/2 + margin.left) + "," + (height/2 + margin.top) + ")")
			  .selectAll("text")
				.data(words)
			  .enter().append("text")
			  	.attr("class", "cloudtext")
				.style("font-size", function(d) { return d.size + "px"; })
				.style("fill", function(d, i) { return fill(i); })
				.attr("text-anchor", "middle")
				.attr("transform", function(d) {
					return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
				})
				.text(function(d) { return d.text; });
		};
	};


	// Turn json obj into desired word list
	function reformatData(obj) {
		var wordDict = {};
		for (var repo in obj["data"]) {
			if (obj["data"].hasOwnProperty(repo)) {
				var aWord = obj["data"][repo]["license"];
				if (aWord == null || aWord == "Other") { continue }
				if (!Object.keys(wordDict).contains(aWord)) {
					wordDict[aWord]=0;
				}
				wordDict[aWord]+=1;
			}
		}
		var data = [];
		for (var aWord in wordDict) {
			if (wordDict.hasOwnProperty(aWord)) {
				var datpair = {name: shortLic(aWord), value: wordDict[aWord]};
				data.push(datpair);
			}
		}
		return data;
	};


	// Replace a long license name with its abbreviation
	function shortLic(licName) {
		var licDict = {
			"Apache License 2.0" : "Apache-2.0",
			"BSD 2-clause \"Simplified\" License" : "BSD-2-Clause",
			"BSD 3-clause \"New\" or \"Revised\" License" : "BSD-3-Clause",
			"GNU Affero General Public License v3.0" : "AGPL-3.0",
			"GNU General Public License v2.0" : "GPL-2.0",
			"GNU General Public License v3.0" : "GPL-3.0",
			"GNU Lesser General Public License v2.1" : "LGPL-2.1",
			"GNU Lesser General Public License v3.0" : "LGPL-3.0",
			"MIT License" : "MIT"
			};
		if (Object.keys(licDict).contains(licName)) {
			licName = licDict[licName];
		} else {
			console.log(licName);
		}
		return licName;
	};

}
