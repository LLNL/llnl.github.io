function populatePre(areaID) {


	function structureData(obj) {
		var meat = "<strong>Repo Counts</strong><br>";
		var dates = Object.keys(obj);
		dates.sort();
		var latest = obj[dates[dates.length-1]];
		var orglist = Object.keys(latest);
		orglist.sort();
		orglist.push(orglist[0]);
		delete orglist[0];
		orglist.forEach(function (org) {
			if (latest.hasOwnProperty(org)) {
				meat += "<br>"+"&nbsp;"+
					latest[org].name+"<br>"+
					"&nbsp;&nbsp;&nbsp;&nbsp;"+
					latest[org].repositories.totalCount+"<br>";
			}
		});
		return meat;
	};


	var url = './github-data/orgsRepos.json';
	var xhr = new XMLHttpRequest();
	xhr.overrideMimeType("application/json");
	xhr.onload = function () {
		document.getElementById(areaID).textContent = this.responseText;
		var obj = JSON.parse(document.getElementById(areaID).textContent);
		document.getElementById(areaID).innerHTML = structureData(obj);
	};
	xhr.open("GET", url, true);
	xhr.send();


}
