function v1(person_data)
  {

  const x = d3.scaleBand().range([0, width]).padding(0.1);

  const y = d3.scaleLinear().range([height, 0]);
  const svg = d3
    .select("#chart")
    .append("svg")
    .attr("id", "svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const div = d3
    .select(".container")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0)
    .style("left", 0)
    .style("top", 0);

  var data2 = [];
  var data3 = [];
  d3.json(person_data).then(function (data) {
    var discord = 0;
    var ConsomationTotal = 0;
    var fb = 0;
    var chrome = 0;
    var youtube = 0;
    var twitter = 0;
    var insta = 0;
    var messenger = 0;
    for (var i = 0; i < data.length; i++) {
      ConsomationTotal += isNaN(data[i].Conso)
        ? parseFloat(data[i].Conso)
        : data[i].Conso;
      discord += isNaN(data[i].Discord)
        ? parseFloat(data[i].Discord)
        : data[i].Discord;
      // fb +=  isNaN(data[i].Facebook) ?  parseFloat(data[i].Facebook) : data[i].Facebook;
      chrome += isNaN(data[i].Chrome)
        ? parseFloat(data[i].Chrome)
        : data[i].Chrome;
      youtube += isNaN(data[i].Youtube)
        ? parseFloat(data[i].Youtube)
        : data[i].Youtube;
      twitter += isNaN(data[i].Twitter)
        ? parseFloat(data[i].Twitter)
        : data[i].Twitter;
      insta += isNaN(data[i].Instagram)
        ? parseFloat(data[i].Instagram)
        : data[i].Instagram;
      messenger += isNaN(data[i].Messenger)
        ? parseFloat(data[i].Messenger)
        : data[i].Messenger;
    }

    // let data2 = [];
    data2.push({ name: "Consommation Total", Consommation: ConsomationTotal, });
    data2.push({ name: "Discord", Consommation: discord });
    // data2.push({ 'name': "Facebook", 'Consommation': fb });
    data2.push({ name: "Chrome", Consommation: chrome });
    data2.push({ name: "Youtube", Consommation: youtube });
    data2.push({ name: "Twitter", Consommation: twitter });
    data2.push({ name: "Instagram", Consommation: insta });
    data2.push({ name: "Messenger", Consommation: messenger });
    console.log(data2);

    x.domain(data2.map((d) => d.name));

    y.domain([0, d3.max(data2, (d) => d.Consommation)]);
    svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -20)
    .attr("dy", ".75em")
    .text("Data (Mb)");
      
    svg
      .append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x).tickSize(0))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");


    svg.append("g").call(d3.axisLeft(y).ticks(6));
    svg
      .selectAll(".bar")
      .data(data2)
      .enter()
      .append("rect")
      .attr("class", (d) => d.name.replace(' ',''))
      .attr("x", (d) => x(d.name))
      .attr("width", x.bandwidth())
      .attr("y", (d) => y(d.Consommation))
      
      .attr("height", (d) => height - y(d.Consommation))
      .on("mouseover", function (event, d) {
        div.transition().duration(200).style("opacity", 0.9);
        div
          .html('<b style="">Consommation : </b>' + d.Consommation)
          .style("left", event.pageX + 10 + "px")
          .style("top", event.pageY - 50 + "px");
      })
      .on("mouseout", function (event, d) {
        div.transition().duration(500).style("opacity", 0);
      });
      //
      svg.append("rect").attr("x",600).attr("y",120).attr("width", 10).attr("height", 10).style("fill", "rgb(68, 58, 209)")
      svg.append("text").attr("x",620).attr("y", 130).text("Discord").style("font-size", "15px").style("fill", "rgb(68, 58, 209)")

      svg.append("rect").attr("x",600).attr("y",140).attr("width", 10).attr("height", 10).style("fill", "rgb(71, 206, 82)")
      svg.append("text").attr("x",620).attr("y", 150).text("Chrome").style("font-size", "15px").style("fill", "rgb(71, 206, 82)")

      svg.append("rect").attr("x",600).attr("y",160).attr("width", 10).attr("height", 10).style("fill", "rgb(220,20,60)")
      svg.append("text").attr("x",620).attr("y", 170).text("Youtube").style("font-size", "15px").style("fill", "rgb(220,20,60)")

      svg.append("rect").attr("x",600).attr("y",180).attr("width", 10).attr("height", 10).style("fill", "rgb(29, 136, 185)")
      svg.append("text").attr("x",620).attr("y", 190).text("Twitter").style("font-size", "15px").style("fill", "rgb(29, 136, 185)")

      svg.append("rect").attr("x",600).attr("y",200).attr("width", 10).attr("height", 10).style("fill", "rgb(255,20,147)")
      svg.append("text").attr("x",620).attr("y", 210).text("Instagram").style("font-size", "15px").style("fill", "rgb(255,20,147)")

      svg.append("rect").attr("x",600).attr("y",220).attr("width", 10).attr("height", 10).style("fill", "rgb(0,191,255)")
      svg.append("text").attr("x",620).attr("y", 230).text("Messanger").style("font-size", "15px").style("fill", "rgb(0,191,255)")
      //

  });



  }
  v1('./donnee_jean.json')

