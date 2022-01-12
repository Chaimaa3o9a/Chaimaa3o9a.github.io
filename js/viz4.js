function v4(location,person_data)
{
    d3.json(person_data).then(function (data) {

        var chart4 = Calendar(data, {
            x: d => new Date(d.Date),
            y: d => parseFloat(d.Conso),
            /*weekday,
            width*/
          })
        
          var myviz = document.getElementById(location);
          var c = document.createElement('div');
          c.setAttribute("id", location);
          c.appendChild(chart4);
          myviz.replaceWith(c)
        });

}

v4('hm','./donnee_jean.json')