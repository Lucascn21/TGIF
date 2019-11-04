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


        //mapeo el array, acomodandolo primero en base a las ausencias de voto, de mayor a menor
        arregloCongresistas.sort((valor1, valor2) => valor2.missed_votes - valor1.missed_votes).map((valor) => valor);
        for (let i = 0, length = totalCongresistas * 10 / 100; i < length; i++) {
            resultado = `<td>${arregloCongresistas[i].first_name} ${arregloCongresistas[i].last_name}</td></td><td>${arregloCongresistas[i].missed_votes ? arregloCongresistas[i].missed_votes : 0}</td><td>${arregloCongresistas[i].missed_votes_pct ? arregloCongresistas[i].missed_votes_pct : 0}</td>`
            document.getElementById('bodyTablaLeastAttendanceHouse').innerHTML += resultado;
        }

        //mapeo el array, acomodandolo primero en base a las ausencias de voto, de menor a mayor
        arregloCongresistas.sort((valor1, valor2) => valor1.missed_votes - valor2.missed_votes).map((valor) => valor);
        for (let i = 0, length = totalCongresistas * 10 / 100; i < length; i++) {
            resultado = `<td>${arregloCongresistas[i].first_name} ${arregloCongresistas[i].last_name}</td></td><td>${arregloCongresistas[i].missed_votes ? arregloCongresistas[i].missed_votes : 0}</td><td>${arregloCongresistas[i].missed_votes_pct ? arregloCongresistas[i].missed_votes_pct : 0}</td>`
            document.getElementById('bodyTablaMostAttendanceHouse').innerHTML += resultado;
        }







    })
    .catch(function(error) {
        console.log(error);
    });