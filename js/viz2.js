

function v2(person_data,selected){

  d3.json(person_data).then(function (data) {

    let ProcessedDAta = [
      ...data
        .filter((item) => {
          return item.Tranche === "15:00-18:00";
        })
        .map((d) => {
          return {
            date: d.Date
          };
        })
    ];

    var data_retour = [];

    var tranches = [];
    ProcessedDAta.forEach((dte) => {

      var tab = [];
      data
        .filter((d) => d.Date === dte.date)
        .forEach((d) => {

          tranches.push(d.Tranche);
          var ttt = {
            Tranche: d.Tranche,
            Conso: d.Conso,
            Discord: d.Discord,
            Messenger: d.Messenger,
            Youtube: d.Youtube,
            Twitter: d.Twitter,
            Instagram: d.Instagram,
            Chrome: d.Chrome
          };
          tab.push(ttt);
        });
      var datetab = dte.date.split("/");
      var jour = parseInt(datetab[1]);

      var jour_str = jour < 10 ? "0" + jour : "" + jour;
      var dateformat =
        datetab[2] + "-" + datetab[0] + "-" + jour_str + "T00:00:00Z";
      var tmpl = new Date(dateformat);

      data_retour.push({
        date: tmpl,
        values: tab
      });

    });

    var unique_tranche = [...new Set(tranches)];




  const color_tranche = d3.scaleQuantize() 
	.domain([0, unique_tranche.length - 1]) // TODO 
	.range(d3.schemeCategory10); ;


    var data_chart2 = [];
    data_retour.forEach((d) => {
      //console.log(d);
      d.values.forEach((v) => {

        data_chart2.push({
          date: d.date,
          Tranche: v.Tranche,
            Conso: v.Conso,
            Discord: v.Discord,
            Messenger: v.Messenger,
            Youtube: v.Youtube,
            Twitter: v.Twitter,
            Instagram: v.Instagram,
            Chrome: v.Chrome,
            color: color_tranche(unique_tranche.indexOf( v.Tranche))
        });
      });
    });


console.log(data_chart2)





    chart = MultiLineChart(data_chart2, {
      x: (d) => d.date,
      y: (d) => d[selected],
      z: (d) => d.Tranche,
      color: (d) => color_tranche(unique_tranche.indexOf( d))
    ,
      yLabel: "Data (Mb)",
      width: 700,
      height: 300,
      strokeWidth : 3, 
      
      voronoi: false // if true, show Voronoi overlay
    });

    

    var myviz = document.getElementById("my_dataviz");

    var c = document.createElement('div');
    c.setAttribute("id", "my_dataviz");
    c.appendChild(chart);
    myviz.replaceWith(c)
  });
}

v2('./donnee_jean.json','Discord')
