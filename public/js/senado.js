const url = "https://api.propublica.org/congress/v1/115/senate/members.json";
fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {
            'X-API-Key': '9uEhh93sk4PVRFxNnwePjBESuhqiTIjneHcwcvWg'
        }
    })
    .then(resp => resp.json())
    .then(function(data) {
        let senadoresJson = data;
        //let dataSerializada = JSON.stringify(data.results);
        //console.dir(senadoresJson.results[0].members);
        senadoresJson.results[0].members.forEach(senador => {
            //console.dir(senador);
            let resultado = `<tr> <td>${senador.first_name} ${senador.last_name}</td> <td>${senador.party}</td>  <td>${senador.state}</td> <td>${senador.seniority}</td> <td>${senador.votes_with_party_pct}</td> </tr>`
            document.getElementById('bodyTablaSenadores').innerHTML += resultado;
        });


        //console.log(data);
        //console.dir(data);
        //console.log(typeof data)
        //senadoData.textContent = JSON.stringify(data);
        //senadoData.textContent = JSON.stringify(data.results); //Numero de congreso, camara, cantidad de resultados, miembros[]

        //senadoData.textContent = dataSerializada; //miembros[]

    })
    .catch(function(error) {
        console.log(error);
    });





