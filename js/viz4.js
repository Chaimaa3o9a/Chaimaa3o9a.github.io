function v4(data_person,nom){
    let  days =["00:00-03:00","03:00-06:00","06:00-09:00","09:00-12:00","12:00-15:00","15:00-18:00","18:00-21:00","21:00-00:00"],
    times = d3.range(32),
    margin2 = {
        top: 90,
        right: 50,
        bottom: 140,
        left: 100
    };
let mapper = {  "00:00-03:00":0,
                "03:00-06:00":1,
                "06:00-09:00":2,
                "09:00-12:00":3,
                "12:00-15:00":4,
                "15:00-18:00":5,
                "18:00-21:00":6,
                "21:00-00:00":7}   
let width2 = Math.max(Math.min(window.innerWidth, 1000), 500) - margin2.left - margin2.right,
    gridSize = Math.floor(width2 / times.length),
    height2 = gridSize * days.length;


    var maingroup = d3.select('#heatmap')
    .append("svg")
    .attr("class", "svg")
    .attr("width", width2 + margin2.left + margin2.right)
    .attr("height", height2 + margin2.top + margin2.bottom)
    .append("g")
        .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");



        var dayLabels = maingroup.selectAll(".dayLabel")
        .data(days)
        .enter().append("text")
            .text(function (d) { return d; })
            .attr("x", 0)
            .attr("y", function (d, i) { return i * gridSize; })
            .attr("transform", "translate(-6," + gridSize / 2 + ")")
            .attr("class", function (d, i) { return ((i >= 0 && i <= 4) ? "dayLabel axis-workweek" : "dayLabel"); })
            .style("text-anchor", "end");
    
    var timeLabels = maingroup.selectAll(".timeLabel")
        .data(times)
        .enter().append("text")
            .text(function(d) { return d; })
            .attr("x", function(d, i) { return i * gridSize; })
            .attr("y", 0)
            .attr("transform", "translate(" + gridSize / 2 + ", -6)")
            .attr("class", function(d, i) { return ((i >= 9 && i <= 19) ? "timeLabel axis-worktime" : "timeLabel"); })
            .style("text-anchor", "middle");




        maingroup.append("text")
            .attr("class", "credit")
            .attr("x", width/2)
            .attr("y", gridSize * (days.length+1) + 80)
            .style("text-anchor", "middle")
            .text("Heatmap de consommation des données mobiles");

            

        d3.json(data_person).then(function(data) {
            data.forEach(function(d) {
                d.day = +mapper[d.Tranche];
                d.hour = +parseInt(d.Date.split("/")[1]);
                d.count = +d.Conso;
            });
            
            maingroup.append("text")
                .attr("class", "subtitle")
                .attr("x", width / 2)
                .attr("y", -40)
                .style("text-anchor", "middle")
                .text("La consommation Totale de "+nom+" - " + d3.sum(data, function(d) {return d.count; }) + " Mb");
        
            // Le reste du code va ici
        


    var colorScale = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) {return d.count; }) / 2, d3.max(data, function(d) {console.log(d);return d.count; })])
        .range(["#f7fbff", "#6baed6", "#08306b"]);



    var heatMap = maingroup.selectAll(".hour")
    .data(data)
    .enter().append("rect")
        .attr("x", function(d) { return d.hour * gridSize; })
        .attr("y", function(d) { return d.day * gridSize; })
        .attr("width", gridSize)
        .attr("height", gridSize)
        .style("stroke", "white")
        .style("stroke-opacity", 0.6)
        .style("fill", function(d) { return colorScale(d.count); });



        var countScale = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) {return d.count; })])
    .range([0, width])

numStops = 3;
countPoint = [0, d3.max(data, function(d) {return d.count; }) / 2, d3.max(data, function(d) {return d.count; })];

maingroup.append("defs")
    .append("linearGradient")
    .attr("id", "legend-traffic")
    .attr("x1", "0%").attr("y1", "0%")
    .attr("x2", "100%").attr("y2", "0%")
    .selectAll("stop") 
    .data(d3.range(numStops))                
    .enter().append("stop") 
        .attr("offset", function(d,i) { 
            return countScale(countPoint[i]) / width;
        })   
        .attr("stop-color", function(d,i) { 
            return colorScale(countPoint[i]); 
        });

var legendWidth = Math.min(width * 0.8, 400);
        
var legendsvg = maingroup.append("g") // groupe principal
    .attr("class", "legendWrapper")
    .attr("transform", "translate(" + (width/2) + "," + (gridSize * days.length + 40) + ")");

legendsvg.append("rect") // rectangle avec gradient
    .attr("class", "legendRect")
    .attr("x", -legendWidth/2)
    .attr("y", 0)
    .attr("width", legendWidth)
    .attr("height", 10)
    .style("fill", "url(#legend-traffic)");
        
legendsvg.append("text") // légende
    .attr("class", "legendTitle")
    .attr("x", 0)
    .attr("y", -10)
    .style("text-anchor", "middle")
    .text("Consommation en Mb");

var xScale = d3.scaleLinear() // scale pour x-axis
     .range([-legendWidth / 2, legendWidth / 2])
     .domain([ 0, d3.max(data, function(d) { return d.count; })] );

legendsvg.append("g") // x axis
    .attr("class", "axis")
    .attr("transform", "translate(0," + (10) + ")")
    .call(d3.axisBottom(xScale).ticks(5));
});
}

v4('./donnee_source_2.json','Chaimaa')
