$(function(){

	var dataset = {
				names: ["hours-1", "hours-2", "minutes-1", "minutes-2", "seconds-1", "seconds-2"],
				values: ["eight", "four", "two", "one"]
				};

	var height = 500;
	var width = 700;

	ySpacing = d3.scale.ordinal()
						.domain(dataset.values)
						.rangeRoundBands([0, height], 0, 1);

	xSpacing = d3.scale.ordinal()
						.domain(dataset.names)
						.rangeRoundBands([0, width], 0, 1);

	var x = 25;
	var spacing = 125;

	var svg = d3.select('svg');
	svg
		.attr("width", width)
		.attr("height", height)
		.selectAll("g")
		.data(dataset.names)
		.enter()
		.append("g")
		.attr("class", function(d){return d;})
		.attr("transform", function(){
			var num = x;
			x = x + spacing;
			return "translate(" + num + ", 0)";
		})
		.classed("column", true)
			.selectAll("circle")
			.data(dataset.values)
			.enter()
			.append("circle")
			.attr("class", function(d){return d;})
			.attr("r", "25")
			.attr("cy", ySpacing);


	function leftPad(number, targetLength) {
		var output = number + '';
		while (output.length < targetLength) {
			output = '0' + output;
		}
		return output;
	}

	var display = function(input, name){
		if(Math.floor(input / 8) != 0){
			input = input - 8;
			svg.select("." + name + " .eight")
				.classed("on", true);
		}
		if(Math.floor(input / 4) != 0){
			input = input - 4;
			svg.select("." + name + " .four")
				.classed("on", true);
		}
		if(Math.floor(input / 2) != 0){
			input = input - 2;
			svg.select("." + name + " .two")
				.classed("on", true);
		}
		if(Math.floor(input / 1) != 0){
			input = input - 1;
			svg.select("." + name + " .one")
				.classed("on", true);
		}
		return;
	}

	setInterval(function(){

		svg.selectAll("circle")
			.classed("on", false);

		var dateTime = new Date();
		var hours = dateTime.getHours();
		var minutes = leftPad(dateTime.getMinutes(), 2);
		var seconds = leftPad(dateTime.getSeconds(), 2);
		var minutesOne = Number(String(minutes).charAt(0));
		var minutesTwo = Number(String(minutes).charAt(1));
		var secondsOne = Number(String(seconds).charAt(0));
		var secondsTwo = Number(String(seconds).charAt(1));
		if(hours > 12){
			hours = hours - 12;
		}
		hours = leftPad(hours, 2);
		var hoursOne = Number(String(hours).charAt(0));
		var hoursTwo = Number(String(hours).charAt(1));

		display(hoursOne, "hours-1");
		display(hoursTwo, "hours-2");

		display(minutesOne, "minutes-1");
		display(minutesTwo, "minutes-2");

		display(secondsOne, "seconds-1");
		display(secondsTwo, "seconds-2");

	}, 1000);
});