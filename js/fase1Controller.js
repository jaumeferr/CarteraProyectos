var userLogged;
var carteraProyectos;

$(document).ready(function() {
    userLogged = JSON.parse(sessionStorage.getItem('userLogged'));
    $("#userInfo").append("Usuario: " + userLogged.name);
    var cartAux = sessionStorage.getItem('carteraProyectos');

    if (cartAux) {
        carteraProyectos = JSON.parse(cartAux);
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

        sessionStorage.setItem('carteraProyectos', JSON.stringify(carteraProyectos));
    }

    //Ocultar todas los paneles
    $("#crit_doc_panel").hide();
    $("#cal_panel").hide();
    $("#rec_proc_panel").show();

    //

    checkPrivileges();
});

//-----------------------------------------------
//GENERAL

function importarInfo(){
    carteraProyectos = JSON.parse(sessionStorage.getItem('carteraProyectos'));

    $("#fConvocatoria").val(carteraProyectos.config.calendario.fechaPublicacionConvocatoria);
    $("#PPropuestaDesde").val(carteraProyectos.config.calendario.periodoPresentacionPropuestas.desde);
    $("#PPropuestaHasta").val(carteraProyectos.config.calendario.periodoPresentacionPropuestas.hasta);
    $("#PEvalPriorDesde").val(carteraProyectos.config.calendario.periodoEvaluacionPriorizacion.desde);
    $("#PEvalPriorHasta").val(carteraProyectos.config.calendario.periodoEvaluacionPriorizacion.hasta);
    $("#PAprobados").val(carteraProyectos.config.calendario.fechaPublicacionAprobados);
     $("#my_amount").val(carteraProyectos.config.rrff.cuantiaInversion);
}

function checkPrivileges() {
    var role = userLogged.role;
    var estado = sessionStorage.getItem('estadoCartera');

    if (role === "dg" && estado === "aprobar_config") {
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

        importarInfo();

    } else if (role === "dg" && estado != "aprobar_config") {
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

        importarInfo();


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
    loadInfo();

    //Guardar info en el storage.
    sessionStorage.setItem('carteraProyectos', JSON.stringify(carteraProyectos));

    //Cambiar estado cartera.
    sessionStorage.setItem('estadoCartera', "aprobar_config");
    $("#send_config_button").hide();

    alert("La configuración se ha enviado correctamente");
}

function onApproveConfigButtonClick() {
    //Cambiar estado.
    sessionStorage.setItem('faseCartera', "2");
    $("#approve_config_button").hide();

    alert("La configuración se ha aprobado correctamente");
}

function onRejectConfigButtonClick() {
    //Enviar feedback.

    //Cambiar estado.
    sessionStorage.setItem('estadoCartera', "crear_config");

    alert("La configuración se ha rechazado correctamente");
}

function validate() {

}

function loadInfo() {
    //Calendar
    carteraProyectos.config.calendario.fechaPublicacionConvocatoria = $("#fConvocatoria").val();
    carteraProyectos.config.calendario.periodoPresentacionPropuestas.desde = $("#PPropuestaDesde").val();
    carteraProyectos.config.calendario.periodoPresentacionPropuestas.hasta = $("#PPropuestaHasta").val();
    carteraProyectos.config.calendario.periodoEvaluacionPriorizacion.desde = $("#PEvalPriorDesde").val();
    carteraProyectos.config.calendario.periodoEvaluacionPriorizacion.hasta = $("#PEvalPriorHasta").val();
    carteraProyectos.config.calendario.fechaPublicacionAprobados = $("#PAprobados").val();

    //RRHH-RRFF
    carteraProyectos.config.rrff.cuantiaInversion = $("#my_amount").val();

    debugger;
    //Criterios
    var criterios = document.getElementById('crit_table');
    for (var i = 1; i < criterios.rows.length; i++) {
        carteraProyectos.config.criterios.push({ pond: criterios.rows[i].cells[0].innerText, desc: criterios.rows[i].cells[1].innerText });
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

        //Actualizar sessionStorage
        sessionStorage.setItem('carteraProyectos', JSON.stringify(carteraProyectos));
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