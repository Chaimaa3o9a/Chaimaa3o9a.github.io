

function v3(location,person_data){

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
    
        let data2 = [];
        var autre = ConsomationTotal - (discord+chrome+youtube+twitter+insta+messenger)
       //var total_c = discord+chrome+youtube+twitter+insta+messenger+autre
        data2.push({ name: "Autre", Consommation: autre,});
        data2.push({ name: "Instagram", Consommation: insta });
        data2.push({ name: "Discord", Consommation: discord });
        data2.push({ name: "Messenger", Consommation: messenger });
        data2.push({ name: "Chrome", Consommation: chrome });
        data2.push({ name: "Youtube", Consommation: youtube });
        data2.push({ name: "Twitter", Consommation: twitter });
    



      
        var chart3 = DonutChart(data2, {
            name: (d) => d.name,
            value: (d) => d.Consommation,
            names:['Autre','Discord','Messenger','Chrome','Youtube','Twitter','Instagram'],
            colors:['orange','#5865F2 ','rgb(0,191,255)','rgb(71, 206, 82)','rgb(220,20,60)','rgb(29, 136, 185)','rgb(255,20,147)'],
            //title: "Data (Mb)",
            width: 400,
            height: 300,
            strokeWidth : 3, 
            
            voronoi: false // if true, show Voronoi overlay
          });

    var myviz = document.getElementById(location);
    var c = document.createElement('div');
    c.setAttribute("id", location);
    c.appendChild(chart3);
    myviz.replaceWith(c)
    });
}
v3('donut','./donnee_jean.json')
v3('donut2','./donnee_source_2.json')