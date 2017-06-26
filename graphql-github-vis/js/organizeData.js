function structureData(obj) {
	var meat = "<strong>Repo Counts</strong><br>";
	for (var org in obj.data) {
		if (obj.data.hasOwnProperty(org)) {
			meat += "<br>"+"&nbsp;"+
				obj.data[org].name+"<br>"+
				"&nbsp;&nbsp;&nbsp;&nbsp;"+
				obj.data[org].repositories.totalCount+"<br>";
		}
	}
	return meat;
}

function populatePre(url) {
	var xhr = new XMLHttpRequest();
	xhr.overrideMimeType("application/json");
	xhr.onload = function () {
		document.getElementById('contents').textContent = this.responseText;
		var obj = JSON.parse(document.getElementById('contents').textContent);
		document.getElementById('contents').innerHTML = structureData(obj);
	};
	xhr.open("GET", url, true);
	xhr.send();
}
