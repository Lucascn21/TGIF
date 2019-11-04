const url = "https://api.propublica.org/congress/v1/115/house/members.json";
let totalCongresistas = 0,
    numDemocratas = 0,
    numRepublicanos = 0,
    numIndependientes = 0;
let porcentajeTotalDemocratas = 0,
    porcentajeTotalRepublicanos = 0,
    porcentajeTotalIndependientes = 0;


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
        let resultado;
        CongresoJson.results[0].members.forEach(congreso => {
            totalCongresistas++;
            switch (congreso.party) {
                case 'D':
                    numDemocratas++;
                    porcentajeTotalDemocratas = parseFloat(Math.round(numDemocratas * 100) / totalCongresistas).toFixed(2);
                    break;
                case 'R':
                    numRepublicanos++;
                    porcentajeTotalRepublicanos = parseFloat(Math.round(numRepublicanos * 100) / totalCongresistas).toFixed(2);
                    break;
                case 'I':
                    numIndependientes++;
                    porcentajeTotalIndependientes = parseFloat(Math.round(numIndependientes * 100) / totalCongresistas).toFixed(2);
                    break;
                default:
                    console.log("Recibi una party que no contemplaba");
                    console.error("Recibi una party que no contemplaba");
            }



        });
        resultado = `<tr><td>Democrats</td> <td>${numDemocratas}</td><td>${porcentajeTotalDemocratas}</td></tr>`
        resultado += `<tr><td>Republicans</td> <td>${numRepublicanos}</td><td>${porcentajeTotalRepublicanos}</td></tr>`
        resultado += `<tr><td>Independents</td> <td>${numIndependientes}</td><td>${porcentajeTotalIndependientes}</td></tr>`
        resultado += `<tr><td>Total</td> <td>${totalCongresistas}</td><td>${totalCongresistas*100/totalCongresistas}</td></tr>`
        document.getElementById('bodyTablaAttendanceHouse').innerHTML += resultado;

        //Array para usar
        arregloCongresistas = Object.values(CongresoJson.results[0].members);


        //mapeo el array, acomodandolo primero en base a las ausencias de voto, de menor a mayor
        arregloCongresistas.sort((valor1, valor2) => valor2.votes_with_party_pct - valor1.votes_with_party_pct).map((valor) => valor);
        for (let i = 0, length = totalCongresistas * 10 / 100; i < length; i++) {
            votos_al_partido = parseFloat(Math.round(arregloCongresistas[i].total_votes * 100) / arregloCongresistas[i].votes_with_party_pct).toFixed(0);
            resultado = `<td>${arregloCongresistas[i].first_name} ${arregloCongresistas[i].last_name}</td></td><td>${votos_al_partido? votos_al_partido : 0}</td><td>${arregloCongresistas[i].votes_with_party_pct? arregloCongresistas[i].votes_with_party_pct : 0}</td>`
            document.getElementById('bodyTablaMostLoyalHouse').innerHTML += resultado;
        }

        //mapeo el array, acomodandolo primero en base a las ausencias de voto, de mayor a menor
        arregloCongresistas.sort((valor1, valor2) => valor1.votes_with_party_pct - valor2.votes_with_party_pct).map((valor) => valor);
        for (let i = 0, length = totalCongresistas * 10 / 100; i < length; i++) {
            votos_al_partido = parseFloat(Math.round(arregloCongresistas[i].total_votes * 100) / arregloCongresistas[i].votes_with_party_pct).toFixed(0);
            if (!isFinite(votos_al_partido)) votos_al_partido = 0; //Dividir por 0 da "infinity" votos porque dividi por 0, si estoy dividiendo por 0 es porque votes_with_party_pct es 0.  (MIKE POMPEO GENERA ESTE PROBLEMA)
            resultado = `<td>${arregloCongresistas[i].first_name} ${arregloCongresistas[i].last_name}</td></td><td>${votos_al_partido ? votos_al_partido : 0}</td><td>${arregloCongresistas[i].votes_with_party_pct ? arregloCongresistas[i].votes_with_party_pct : 0}</td>`
            document.getElementById('bodyTablaLeastLoyalHouse').innerHTML += resultado;
        }



    })
    .catch(function(error) {
        console.log(error);
        alert("Falló el fetch, refrescame con F5 \n" + error)
    });