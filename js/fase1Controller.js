var userLogged;
var carteraProyectos;

$(document).ready(function() {
    userLogged = JSON.parse(localStorage.getItem('userLogged'));
    9
    $("#userInfo").append("User: " + userLogged.user + "\n Role: " + userLogged.role);
    var cartAux = localStorage.getItem('carteraProyectos');

    if (cartAux) {
        carteraProyectos = JSON.parse(cartAux);

        //Cargar estado actual de la cartera.
        //cargar_criterios();
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

    //Ocultar todas los paneles
    $("#crit_doc_panel").hide();
    $("#cal_panel").hide();
    $("#rec_proc_panel").hide();

    checkPrivileges();
});

//-----------------------------------------------
//GENERAL

function checkPrivileges() {
    var role = userLogged.role;
    var fase = localStorage.getItem('faseCartera');

    if (role === "rector" && fase === "aprobar_config") {
        //Ocultar todos los bototes de edición.
        //Ocultar botoón de enviar.
        //Mostrar botón de aprobar.
        //Mostrar botón rechazar

    } else if (role === "rector" && fase != "aprobar config") {
        //Ocultar todos los botones de edición.
        //Ocultar botón de enviar.
        //Ocultar botón de aprobar.
        //Ocultar botón de rechazar.
    } else if (role === "cio" && fase === "crear_config") {
        //Mostrar todos los botones de edición.
        //Ocultar botón de aprobar.
        //Ocultar botón de rechazar
    } else {
        //Ocultar todos los botones de edición.
        //Ocultar botón rechazar.
        //Ocultar botón aprobar.
        //Ocultar botón enviar.
    }
}

//---------------------------------------------

//---------------------------------------------
//BUTTONS

//TOP
function onRecProcPanelButtonClick() {
    $("#crit_doc_panel").hide();
    $("#cal_panel").hide();
    $("#rec_proc_panel").show();

}

function onCritDocPanelButtonClick() {
    $("#rec_proc_panel").hide();
    $("#cal_panel").hide();
    $("#crit_doc_panel").show();
}

function onCalPanelButtonClick() {
    $("#rec_proc_panel").hide();
    $("#crit_doc_panel").hide();
    $("#cal_panel").show();
}

//BOTTOM
function onSendConfigButtonClick() {

}

function onApproveConfigButtonClick() {

}

function onRejectConfigButtonClick() {

}

function validate() {

}

function onExitButton() {

}

//--------------------------------------------

/*
//CRITERIOS
function abrir_nuevoCrit_vtn() {
    var modal = document.getElementById("nuevoCrit_vtn");
    modal.style.display = "block";
}

function cerrar_nuevoCrit() {
    var modal = document.getElementById("nuevoCrit_vtn");
    $("#crit_desc").val(" ");
    $("#crit_pond").val(" ");
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
        $("#crit_desc").val(" ");
        $("#crit_pond").val(" ");
        modal.style.display = "none";

        //Actualizar localStorage
        localStorage.setItem('carteraProyectos', JSON.stringify(carteraProyectos));
    } else {
        alert("Debes rellenar los campos");
    }
}

function cargar_criterios() {
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
}*/

//DOCUMENTACION