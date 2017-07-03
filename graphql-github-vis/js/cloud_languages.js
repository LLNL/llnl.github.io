/* Creates bar graph visualization for webpage */
function draw_cloud_languages(areaID) {

	// Draw cloud from data
	function drawCloud(data, areaID) {

		var wordList = [];
		data.forEach(function (lang) {
			wordList.push(lang.name);
		});
		wordList.sort();

		var wordScale = d3.scaleLinear()
			.domain([0, d3.max(data, function (d) { return d.value; })])
			.range([12,90]);
		var fill = d3.scaleOrdinal(d3.schemeCategory20);

		var margin = {top: 0, right: 0, bottom: 0, left: 0},
			width = stdWidth - margin.left - margin.right,
			height = stdHeight - margin.top - margin.bottom;

		var layout = cloud()
			.size([width, height])
			.words(data.map(function(d) {
				return {text: d.name, size: wordScale(d.value), test: "haha"};
			}))
			.padding(5)
			.rotate(function() { return ~~(Math.random() * 2) * 90; })
			.font("Impact")
			.fontSize(function(d) { return d.size; })
			.on("end", draw);

		layout.start();

		function draw(words) {
			d3.select("."+areaID)
				.attr("width", layout.size()[0])
				.attr("height", layout.size()[1])
			  .append("g")
				.attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
			  .selectAll("text")
				.data(words)
			  .enter().append("text")
				.style("font-size", function(d) { return d.size + "px"; })
				.style("font-family", "Impact")
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
				var langNodes = obj["data"][repo]["languages"]["nodes"];
				for (var i=0; i<langNodes.length; i++) {
					var aWord = langNodes[i]["name"];
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


	// load data file, process data, and draw visualization
	var url = './github-data/reposLanguages.json';
	var xhr = new XMLHttpRequest();
	xhr.overrideMimeType("application/json");
	xhr.onload = function () {
		var data = this.responseText;
		var obj = JSON.parse(data);
		var data = reformatData(obj);
		drawCloud(data, areaID);
	};
	xhr.open("GET", url, true);
	xhr.send();
}
