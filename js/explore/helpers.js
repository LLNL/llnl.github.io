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

// Draw date-of-interest reference lines on a graph
function drawDateLine(dateObj,label,chart,x,y,height,valueline) {
	chart.append("path")
		.datum([
			{date:dateObj, value:y.domain()[0]},
			{date:dateObj, value:y.domain()[1]}
			])
		.attr("class", "refline")
		.attr("d", valueline);
	chart.append("text")
		.attr("class", "reftext")
		.attr("transform", "rotate(-90)")
		.attr("y",  x(dateObj)-4 )
		.attr("x", 0 - (height / 4))
		.attr("text-anchor", "middle")
		.text(label);
}
