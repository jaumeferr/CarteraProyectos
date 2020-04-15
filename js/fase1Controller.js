var userLogged;
var carteraProyectos;

$(document).ready(function() {
    userLogged = JSON.parse(localStorage.getItem('userLogged'));
    $("#userInfo").append("User: " + userLogged.user + "\n Role: " + userLogged.role);
    var cartAux = localStorage.getItem('carteraProyectos');

    if (cartAux) {
        carteraProyectos = JSON.parse(cartAux);
    } else {
        /*Abrir archivo JSON on info inicial de la cartera
        debugger;
        var myInit = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'default'
        }
        let myReq = new Request("./json/carteraProyectos.json", myInit);

        fetch(myReq)
            .then(function(resp) {
                return resp.json();
            })
            .then(function(data) {
                console.log(data);
            })
        */

        //Alternativa, declarar aquí la cartera
        carteraProyectos = {
            config: {
                rrff: {
                    procesos: [],
                    costeProcesos: "",
                    costeRRHH: "",
                    cuantiaInversion: ""
                },
                rrhh: [],
                criterios: [],
                calendario: {
                    fechaPublicacionConvocatoria: "",
                    periodoPresentacionPropuestas: {
                        desde: "",
                        hasta: ""
                    },
                    periodoEvaluacionPriorizacion: {
                        desde: "",
                        hasta: ""
                    },
                    fechaPublicacionAprobados: ""
                },
                documentacion: {
                    descripcion: "",
                    reglamento: "",
                    formularioPropuesta: "",
                    textoConvocatoria: ""
                }
            }
        }

        localStorage.setItem('carteraProyectos', JSON.stringify(carteraProyectos));
    }
});