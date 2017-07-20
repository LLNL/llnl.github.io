/* Creates word cloud visualization for webpage */
function draw_cloud_topics(areaID) {

	// load data file, process data, and draw visualization
	var url = './github-data/reposTopics.json';
	d3.json(url, function(obj) {
		var data = reformatData(obj);
		drawCloud(data, areaID);
	});
	

	// Draw cloud from data
	function drawCloud(data, areaID) {

		var wordList = [];
		data.forEach(function (topic) {
			wordList.push(topic.name);
		});
		wordList.sort();

		var wordScale = d3.scaleLinear()
			.domain([0, d3.max(data, function (d) { return d.value; })])
			.range([12,90]);
		var fill = d3.scaleOrdinal(d3.schemeCategory20);

		var margin = {top: 0, right: 0, bottom: 0, left: 0},
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

		function draw(words) {
			var wordCloud = d3.select("."+areaID)
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
			  .append("g")
				.attr("transform", "translate(" + (width + margin.left + margin.right) / 2 + "," + (height + margin.top + margin.bottom) / 2 + ")")
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
				var topicNodes = obj["data"][repo]["repositoryTopics"]["nodes"];
				for (var i=0; i<topicNodes.length; i++) {
					var aWord = topicNodes[i]["topic"]["name"];
					if (!Object.keys(wordDict).contains(aWord)) {
						wordDict[aWord]=0;
					}
					wordDict[aWord]+=1;
				}
			}
		}
		var data = [];
		for (var aWord in wordDict) {
			if (wordDict.hasOwnProperty(aWord)) {
				var datpair = {name: aWord, value: wordDict[aWord]};
				data.push(datpair);
			}
		}
		return data;
	};

}
