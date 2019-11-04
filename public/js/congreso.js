const url = "https://api.propublica.org/congress/v1/115/house/members.json";
var CongresoJson = [];

var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        senators: [],
        names: ['John', 'Mike'],
    },

})



fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {
            'X-API-Key': '9uEhh93sk4PVRFxNnwePjBESuhqiTIjneHcwcvWg'
        }
    })
    .then(resp => resp.json())
    .then(function(data) {
        CongresoJson = data;
        console.dir(CongresoJson)
        CongresoJson.results[0].members.forEach(Congreso => {
            // let resultado = `<tr> <td>${Congreso.first_name} ${Congreso.last_name}</td> <td>${Congreso.party}</td>  <td>${Congreso.state}</td> <td>${Congreso.seniority}</td> <td>${Congreso.votes_with_party_pct}</td> </tr>`
            // document.getElementById('bodyTablaCongreso').innerHTML += resultado;
            //console.dir(app.data)
            //app.data = `nombre:${Congreso.first_name}, apellido:${Congreso.last_name}, party:${Congreso.party}, estado:${Congreso.state}, seniority:${Congreso.seniority}, votos_con_partido:${Congreso.votes_with_party_pct}`;

            app.senators = [
                { name: " SmithJohn", url: "http://company/jsmith.html" },
                { name: "Mary Jones", url: "http://company/mjones.html" },
                {
                    name: `${Congreso.first_name} ${Congreso.last_name}`,
                    party: Congreso.party,
                    state: Congreso.state,
                    seniority: Congreso.seniority,
                    votos_con_partido: Congreso.votes_with_party_pct
                },
            ];
        });





    })
    .catch(function(error) {
        console.log(error);
    });