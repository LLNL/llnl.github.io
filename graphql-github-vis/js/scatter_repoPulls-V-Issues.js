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

		var graphHeader = "Repository Topics";

		// TODO graph

	};


	// Turn json obj into desired working data
	function reformatData(obj) {
		data = [];
		for (var repo in obj["data"]) {
			if (obj["data"].hasOwnProperty(repo)) {
				var repoDict = obj["data"][repo];
				var dataset = {
					name: repo, 
					pullsMerged: repoDict["pullRequests"]["totalCount"], 
					issuesOpen: repoDict["issues"]["totalCount"]
				}
				data.push(dataset);
			}
		}
		// TODO overlapping points? How to handle multiple repos with same counts e.g. 0,0
		return data;
	};

}