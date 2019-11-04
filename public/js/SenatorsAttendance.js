const url = "https://api.propublica.org/congress/v1/115/senate/members.json";
let totalSenadores = 0,
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
        let senadoJSON = data;
        let resultado;
        senadoJSON.results[0].members.forEach(senado => {
            totalSenadores++;
            switch (senado.party) {
                case 'D':
                    numDemocratas++;
                    porcentajeTotalDemocratas = parseFloat(Math.round(numDemocratas * 100) / totalSenadores).toFixed(2);
                    break;
                case 'R':
                    numRepublicanos++;
                    porcentajeTotalRepublicanos = parseFloat(Math.round(numRepublicanos * 100) / totalSenadores).toFixed(2);
                    break;
                case 'I':
                    numIndependientes++;
                    porcentajeTotalIndependientes = parseFloat(Math.round(numIndependientes * 100) / totalSenadores).toFixed(2);
                    break;
                default:
                    console.log("Recibi una party que no contemplaba");
                    console.error("Recibi una party que no contemplaba");
            }



        });
        resultado = `<tr><td>Democrats</td> <td>${numDemocratas}</td><td>${porcentajeTotalDemocratas}</td></tr>`
        resultado += `<tr><td>Republicans</td> <td>${numRepublicanos}</td><td>${porcentajeTotalRepublicanos}</td></tr>`
        resultado += `<tr><td>Independents</td> <td>${numIndependientes}</td><td>${porcentajeTotalIndependientes}</td></tr>`
        resultado += `<tr><td>Total</td> <td>${totalSenadores}</td><td>${totalSenadores*100/totalSenadores}</td></tr>`
        document.getElementById('bodyTablaAttendanceSenado').innerHTML += resultado;








    })
    .catch(function(error) {
        console.log(error);
    });