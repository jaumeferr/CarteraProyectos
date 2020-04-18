var userLogged;
var carteraProyectos;

$(document).ready(function() {
    userLogged = JSON.parse(localStorage.getItem('userLogged'));
    $("#userInfo").append("User: " + userLogged.user + "\n Role: " + userLogged.role);
    var cartAux = localStorage.getItem('carteraProyectos');

    if (cartAux) {
        carteraProyectos = JSON.parse(cartAux);

        //Cargar estado actual de la cartera.
        cargar_criterios();
    } else {
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


//CRITERIOS
function abrir_nuevoCrit_vtn() {
    var modal = document.getElementById("nuevoCrit_vtn");
    modal.style.display = "block";
}

function cerrar_nuevoCrit() {
    var modal = document.getElementById("nuevoCrit_vtn");
    modal.style.display = "none";
}

function guardar_nuevoCrit() {
    var modal = document.getElementById("nuevoCrit_vtn");
    var crit_desc = $("#nuevoCrit_desc").val();
    var crit_pond = $("#nuevoCrit_pond").val();
    var crit_tabla = document.getElementById("tabla_criterios");
    var nueva_fila;
    var nueva_desc
    var nueva_pond;


    if ((crit_desc != "" && crit_pond != "")) {
        //Guardar información en caché.
        carteraProyectos.config.criterios.push({ desc: crit_desc, pond: crit_pond });

        //Añadir información a la tabla.
        nueva_fila = crit_tabla.insertRow(1);
        nueva_desc = nueva_fila.insertCell(0);
        nueva_pond = nueva_fila.insertCell(1);

        nueva_desc.innerHTML = crit_desc;
        nueva_pond.innerHTML = crit_pond;

        //Limpiar la ventana modal. //NO SE LIMPIA
        $("#crit_desc").set("");
        $("#crit_pond").val("");
        modal.style.display = "none";
    } else {
        alert("Debes rellenar los campos");
    }
}

function cargar_criterios() {
    debugger;
    var crit_tabla = document.getElementById("tabla_criterios");
    var crit_cached = carteraProyectos.config.criterios;
    var crit;

    var nueva_fila;
    var nueva_desc;
    var nueva_pond;

    for (var i = 0; i < crit_cached.length; i++) {
        crit = crit_cached[i];

        //Añadir información a la tabla.
        nueva_fila = crit_tabla.insertRow(1);
        nueva_desc = nueva_fila.insertCell(0);
        nueva_pond = nueva_fila.insertCell(1);

        nueva_desc.innerHTML = crit.desc;
        nueva_pond.innerHTML = crit.pond;
    }
}