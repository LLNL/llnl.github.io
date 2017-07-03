/* Creates bar graph visualization for webpage */
function draw_cloud_languages(areaID) {

	// Draw cloud from data
	function drawCloud(wordList, areaID) {

		var fill = d3.scaleOrdinal(d3.schemeCategory20);

		var margin = {top: 0, right: 0, bottom: 0, left: 0},
			width = stdWidth - margin.left - margin.right,
			height = stdHeight - margin.top - margin.bottom;

		var layout = cloud()
			.size([width, height])
			.words(wordList.map(function(d) {
				return {text: d, size: 14 + Math.random() * 90, test: "haha"};
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
		var wordList = ['Lorem','ipsum','dolor','sit','amet,','consectetur','adipiscing','elit.','Curabitur','ac','hendrerit','metus.','Proin','eu','lorem','aliquet,','placerat','elit','vitae,','hendrerit','ipsum.','Nam','tortor','turpis,','tempus','vel','hendrerit','eu,','aliquam','sit','amet','tortor.','Aenean','imperdiet','aliquet','dolor,','sollicitudin','dictum','justo','pellentesque','at.','Etiam','condimentum','sollicitudin','malesuada.','Pellentesque','vitae','sapien','suscipit,','hendrerit','dui','id,','venenatis','quam.','Nam','tempus','venenatis','molestie.','Nullam','maximus','nibh','sit','amet','felis','eleifend','euismod.','Fusce','eget','faucibus','leo,','ac','tristique','erat.','Cras','vehicula','eros','eget','bibendum','volutpat.','Aliquam','faucibus','orci','elit,','quis','ornare','lacus','congue','a.','Phasellus','nec','pharetra','enim.']
		//var wordList = ["Hello", "world", "normally", "you", "want", "more", "words","than", "this"];
		return wordList;
	};


	// load data file, process data, and draw visualization
	var url = './github-data/outsidersLabRepos.json';
	var xhr = new XMLHttpRequest();
	xhr.overrideMimeType("application/json");
	xhr.onload = function () {
		var data = this.responseText;
		var obj = JSON.parse(data);
		var wordList = reformatData(obj);
		drawCloud(wordList, areaID);
	};
	xhr.open("GET", url, true);
	xhr.send();
}
