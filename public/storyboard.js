
var width = data.length,
    barHeight = 10;

var newi=[];
for(i=1;i<=44;i++){
	newi.push(i);
}

var x = d3.scale.ordinal()
    .domain(names)
    .range(newi);
var padding = 180;

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

storyboard(data,names);

function storyboard(data,names){

	var chart = d3.select("#chart")
		.append("svg")
	    .attr("width", width+padding)
	    .attr("height", (names.length+1)*10)
	    .append("g")
	     .attr("transform", "translate(" + padding + "," + 0 + ")");

	var bar = chart.selectAll("g")
	    .data(data)
	  .enter().append("g");

	bar.append("rect")
		.attr("transform", function(d, i) {return "translate("+0 +","+ x(d.name)*10+ ")"; })
		.attr("width", 10)
	    .attr("height", barHeight-1)
	    .attr("class","stable")
	    .attr("rx",5)
		.attr("ry",5)
		.style("fill", "lightgrey")
		.style("fill-opacity", .7)
		.attr("transform", function(d, i) {return "translate("+d.index/1.15 +","+ x(d.name)*10 + ")"; });


	bar.append("title")
	    .text(function(d){return d.quote});

	chart2 = d3.select("svg")
				.data(data)
			    .attr("transform", function(d, i) {return "translate("+d.index +","+ x(d.name)*10 + ")"; });

	chart2.selectAll("text")
		.data(names)
		.enter().append("text")
		.attr("x",180)
		.attr("y",function(d,i){return i*10+19})
		.text(function(d){return d})
		.style("font-size","10px")
		.style("fill","grey")
		.style("font-family","Open Sans");

	d3.select("#play")
		.on("click",function() {animate()});
	d3.select("#stop")
		.on("click",function() {stopanimation();});

}

function animate(){

	var chart = d3.select("#chart")
		.select("svg");

	var bar = chart.selectAll("g")
	    .data(data);

	bar.append("rect")
		.attr("transform", function(d, i) {return "translate("+data.length +","+ x(d.name)*10+ ")"; })
		//.attr("transform", function(d, i) {return "translate("+d.index/1.15 +","+ 800+ ")"; })
		.attr("width", 0)
	    .attr("height", barHeight-1)
	    .attr("class","animation")
	    .attr("rx",5)
		.attr("ry",5)
		.style("fill","lightgrey")
		.transition()
		.delay(function(d, i) {
		    return i * 400;
				})
		.duration(2000)
		.attr("transform", function(d, i) {return "translate("+d.index/1.15 +","+ x(d.name)*10 + ")"; })
		.attr("width", 10)
		.style("stroke","red")
		.attr("rx",5)
		.attr("ry",5)
		.style("fill-opacity",.4)
		.each("end", function(d,i) {d3.selectAll(".dialogue").remove();
									d3.selectAll(".faces").remove();
									d3.select(".stable").style("fill","transparent");
									d3.select("#diadiv").append("p")
									.html(d.quote)
									.attr("class","dialogue")
									.attr("x",780)
									.style("text-overflow","clip")
									.style("font-size","14px")
									.style("font-family","sans-serif")
									.attr("y",10);
								});
}
function stopanimation() {
	var c = d3.selectAll(".animation");
    c.transition()
        .duration( 0 );
	// d3.selectAll("#chart").remove();
	// d3.selectAll(".dialogue").remove();
}
