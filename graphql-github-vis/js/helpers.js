// Check for item in array
Array.prototype.contains = function ( item ) {
	for (i in this) {
		if (this[i] == item) return true;
	}
	return false;
};

// Return only top X portion of an array of {name:value} pairs
function GetTopX(arrayData, x){
	arrayData.sort(function(a, b) {
		return parseFloat(b.value) - parseFloat(a.value);
	});
	return arrayData.slice(0, x); 
};

// Global chart standards
var stdMargin = {top: 40, right: 40, bottom: 40, left: 40},
	stdWidth = 600 - stdMargin.left - stdMargin.right,
	stdHeight = 400 - stdMargin.top - stdMargin.bottom;
