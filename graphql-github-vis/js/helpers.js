// Check for item in array
Array.prototype.contains = function ( item ) {
	for (i in this) {
		if (this[i] == item) return true;
	}
	return false;
};

// Return only top X portion of an array of {name:value} pairs
function GetTopX(arrayData, x) {
	arrayData.sort(function(a, b) {
		return parseFloat(b.value) - parseFloat(a.value);
	});
	return arrayData.slice(0, x); 
};
