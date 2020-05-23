var userLogged;
var carteraProyectos;

$(document).ready(function() {
    userLogged = JSON.parse(localStorage.getItem('userLogged'));
    $("#userInfo").append("User: " + userLogged.user + "\n Role: " + userLogged.role);
    var cartAux = localStorage.getItem('carteraProyectos');

    if (cartAux) {
        carteraProyectos = cartAux;

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

        localStorage.setItem('carteraProyectos', carteraProyectos);
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
    var estado = localStorage.getItem('estadoCartera');

    if (role === "rector" && estado === "aprobar_config") {
        //Ocultar todos los bototes de edición.
        $("#add_rec_button").hide();
        $("#add_proc_button").hide();
        $("#add_crit_button").hide();
        $("#edit_rec_button").hide();
        $("#edit_proc_button").hide();
        $("#edit_crit_button").hide();
        $("#remove_rec_button").hide();
        $("#remove_proc_button").hide();
        $("#remove_crit_button").hide();

        //Ocultar botoón de enviar.
        $("#send_config_button").hide();

    } else if (role === "rector" && estado != "aprobar_config") {
        //Ocultar todos los botones de edición.
        $("#add_rec_button").hide();
        $("#add_proc_button").hide();
        $("#add_crit_button").hide();
        $("#edit_rec_button").hide();
        $("#edit_proc_button").hide();
        $("#edit_crit_button").hide();
        $("#remove_rec_button").hide();
        $("#remove_proc_button").hide();
        $("#remove_crit_button").hide();

        //Ocultar botón de enviar.
        $("#send_config_button").hide();

        //Ocultar botón de aprobar y rechazar.
        $("#approve_config_button").hide();
        $("#reject_config_button").hide();


    } else if (role === "cio" && estado === "crear_config") {
        //Ocultar botón de aprobar y rechazar.
        $("#approve_config_button").hide();
        $("#reject_config_button").hide();

    } else {
        //Ocultar todos los botones de edición.
        $("#add_rec_button").hide();
        $("#add_proc_button").hide();
        $("#add_crit_button").hide();
        $("#edit_rec_button").hide();
        $("#edit_proc_button").hide();
        $("#edit_crit_button").hide();
        $("#remove_rec_button").hide();
        $("#remove_proc_button").hide();
        $("#remove_crit_button").hide();

        //Ocultar botón aprobar y rechazar.
        $("#approve_config_button").hide();
        $("#reject_config_button").hide();

        //Ocultar botón enviar.
        $("#send_config_button").hide();

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
    //Validar info de los campos.
    if (validate()) {
        //Cargar info de los campos en variable.
        loadInfo();
    }

    //Guardar info en el storage.
    localStorage.setItem('carteraProyectos', carteraProyectos);

    //Cambiar estado cartera.
    localStorage.setItem('estadoCartera', "aprobar_config");

    alert("La configuración se ha enviado correctamente");
}

function onApproveConfigButtonClick() {
    //Cambiar estado.
    localStorage.setItem('faseCartera', "2");

    alert("La configuración se ha aprobado correctamente");
}

function onRejectConfigButtonClick() {
    //Enviar feedback.

    //Cambiar estado.
    localStorage.setItem('estadoCartera', "crear_config");

    alert("La configuración se ha rechazado correctamente");
}

function validate() {

}

function loadInfo() {
    //Calendar
    carteraProyectos.calendario.fechaPublicacionConvocatoria = $("#fConvocatoria").val();
    carteraProyectos.calendario.periodoPresentacionPropuestas.desde = $("#PPropuestaDesde").val();
    carteraProyectos.calendario.periodoPresentacionPropuestas.hasta = $("#PPropuestaHasta").val();
    carteraProyectos.calendario.periodoEvaluacionPriorizacion.desde = $("#PEvalPriorDesde").val();
    carteraProyectos.calendario.periodoEvaluacionPriorizacion.hasta = $("#PEvalPriorHasta").val();
    carteraProyectos.calendario.fechaPublicacionAprobados = $("#PAprobados").val();

    //RRHH-RRFF
    carteraProyectos.rrff.cuantiaInversion = $("#my_amount").val();

    //Criterios
    var criterios = $("#crit_table");
    for (var i = 0; i < criterios.rows.Length; i++) {
        carteraProyectos.criterios.push({ pond: criterios.rows[i].item(0), desc: criterios.rows[i].item(1) });
    }
    //Docu
}

function onExitButton() {
    //Redireccionar a la página de login.
    url = "login.htm";
    location.href = url;
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