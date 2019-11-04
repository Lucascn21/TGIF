/*

const url = "https://api.propublica.org/congress/v1/115/house/members.json";
fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {
            'X-API-Key': '9uEhh93sk4PVRFxNnwePjBESuhqiTIjneHcwcvWg'
        }
    })
    .then(resp => resp.json())
    .then(function(data) {
        let CongresoJson = data;

        CongresoJson.results[0].members.forEach(Congreso => {

            let resultado = `<tr> <td>${Congreso.first_name} ${Congreso.last_name}</td> <td>${Congreso.party}</td>  <td>${Congreso.state}</td> <td>${Congreso.seniority}</td> <td>${Congreso.votes_with_party_pct}</td> </tr>`
            document.getElementById('bodyTablaCongreso').innerHTML += resultado;
        });






    })
    .catch(function(error) {
        console.log(error);
    });
    */

var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!'
    }
})