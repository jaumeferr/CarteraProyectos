var userLogged;

$(document).ready(function () {

    userLogged = JSON.parse(sessionStorage.getItem('userLogged'));
    role = userLogged.role;
    $("#userInfo").append("Usuario: " + userLogged.name);

    if (userLogged.role == "dg") {
        mostrarnotificaciones();
    }

    showprojects("aprobado");
});



function showprojects(priority) {
    $("#tableproyectoshead").empty();
    $("#tableproyectosbody").empty();

    s = "<tr><th>Título</th><th>Fecha inicio</th><th>Fecha fin</th><th>Presupuesto</th><th>Detalles del proyecto</th><th>Comentarios</th>";

    if (priority == "aprobado") {
        s += "<th>Estado del proyecto</th>";
    } else if (priority == "aplazado") {

    } else if (priority == "finalizado") {
        s += "<th>Informe evaluación</th>";
    }
    s += "</tr>"
    $("#tableproyectoshead").append(s);

    jsonpropuestas = JSON.parse(sessionStorage.getItem('propuestas'));
    for (var i = 0; i < jsonpropuestas.propuestas.length; i++) {
        item = jsonpropuestas.propuestas[i];
        if (item.estado == 5 && item.seguimiento == priority) {

            s = "<tr><td>" + item.titulo + "</td><td></td><td></td><td>" + item.costes + "</td>";
            s += "<td><button class='btn btn-secondary' onclick='verdetalles(\"" + item.titulo.toString() + "\")'>Ver detalles</button></td>";
            s += "<td><button class='btn btn-secondary' onclick='vercomentarios(\"" + item.titulo.toString() + "\")'>Ver comentarios</button></td>";

            if (item.seguimiento == "aprobado") {
                s += "<td><select id='ejecucionproyecto' name='ejecucionproyecto' class='form-control' style='width: 100px;' disabled><option value='bien' style='background-color:green'>Bien</option>";
                s += "<option value='regular' style='background-color:yellow'>Regular</option><option value='mal' style='background-color:red'>Mal</option></select></td>";
            } else if (item.seguimiento == "aplazado") {

            } else if (item.seguimiento == "finalizado") {
                s += "<td><button class='btn btn-secondary' onclick='verevaluacion(\"" + item.titulo.toString() + "\")'>Ver informe</button></td>";
            }

            s += "</tr>";
            $("#tableproyectosbody").append(s);
            if (item.ejecucion == "bien") {
                $("#ejecucionproyecto option[value='bien']").prop("selected", true);
                $("#ejecucionproyecto").css("background-color", "green");
            } else if (item.ejecucion == "regular") {
                $("#ejecucionproyecto option[value='regular']").prop("selected", true);
                $("#ejecucionproyecto").css("background-color", "yellow");
            } else {
                $("#ejecucionproyecto option[value='mal']").prop("selected", true);
                $("#ejecucionproyecto").css("background-color", "red");
            }

        }
    }



    if (userLogged.role == "promotor") {
        $("#ejecucionproyecto").prop("disabled", false);

        $('#ejecucionproyecto').change(function (e) {
            estado = $('#ejecucionproyecto').val()
            if (estado == "bien") {
                $("#ejecucionproyecto").css("background-color", "green");
            } else if (estado == "regular") {
                $("#ejecucionproyecto").css("background-color", "yellow");
            } else {
                $("#ejecucionproyecto").css("background-color", "red");
            }
        });
    }

    $("#tableproyectos").show();
}



$('#ejecucionproyecto').change(function (e) {
    print("cojooonses");
    debugger;
    estado = $('#ejecucionproyecto').val()
    if (estado == "bien") {
        $("#ejecucionproyecto").css("background-color", "green");
    } else if (estado == "regular") {
        $("#ejecucionproyecto").css("background-color", "yellow");
    } else {
        $("#ejecucionproyecto").css("background-color", "red");
    }
});


function verdetalles(titulo) {
    $("#tableprojects").hide();

    jsonpropuestas = JSON.parse(sessionStorage.getItem('propuestas'));
    for (var i = 0; i < jsonpropuestas.propuestas.length; i++) {
        item = jsonpropuestas.propuestas[i];
        if (item.titulo == titulo) {
            $("#titleproyecto").val(item.titulo);
            $("#solicitanteproyecto").val(item.solicitante);
            $("#descripcionproyecto").val(item.descripcion);
            $("#directorproyecto").val(item.director);
            $("#promotorproyecto").val(item.promotor);
            $("#beneficiosproyecto").val(item.beneficios);
            $("#costesproyecto").val(item.costes);
            $("#duracionproyecto").val(item.duracion);
            $("#riesgosproyecto").val(item.riesgos);
            $("#hitosproyecto").val(item.hitos);
            $("#entregablesproyecto").val(item.entregables);

            $("#reconfigurarbutton").hide();
            if ((item.seguimiento != "finalizado") && (userLogged.role == "cd" || userLogged.role == "cio" || userLogged.role == "dg")){
                $("#reconfigurarbutton").show();
            }
            $("#detalleproyecto").show();
            break;
        }
    }
}

function reconfigurar() {
    //$("#titleproyecto").prop("disabled", false);
    //$("#solicitanteproyecto").prop("disabled", false);
    $("#descripcionproyecto").prop("disabled", false);
    //$("#directorproyecto").prop("disabled", false);
    //$("#promotorproyecto").prop("disabled", false);
    $("#beneficiosproyecto").prop("disabled", false);
    $("#costesproyecto").prop("disabled", false);
    $("#duracionproyecto").prop("disabled", false);
    $("#riesgosproyecto").prop("disabled", false);
    $("#hitosproyecto").prop("disabled", false);
    $("#entregablesproyecto").prop("disabled", false);

    $("#divbuttons").show();

    $("#reconfigurarbutton").hide();

}

function pararproyecto() {
    notificaciones = JSON.parse(sessionStorage.getItem('notificacionescio'));
    titulo = $("#titleproyecto").val();
    mensajetext = { titulo: $("#titleproyecto").val(), tipo: "Paralización" };
    notificaciones = JSON.parse(sessionStorage.getItem('notificacionescio'));
    notificaciones.notificacionescio.push(mensajetext);
    sessionStorage.setItem('notificacionescio', JSON.stringify(notificaciones));

    goback();
    mostrarnotificaciones();
}

function cancelarproyecto() {
    notificaciones = JSON.parse(sessionStorage.getItem('notificacionescio'));
    titulo = $("#titleproyecto").val();
    mensajetext = { titulo: $("#titleproyecto").val(), tipo: "Cancelación" };
    notificaciones = JSON.parse(sessionStorage.getItem('notificacionescio'));
    notificaciones.notificacionescio.push(mensajetext);
    sessionStorage.setItem('notificacionescio', JSON.stringify(notificaciones));

    goback();
    mostrarnotificaciones();
}

function mostrarnotificaciones() {
    $("#notificacionesaceptaciondg").empty();
    notificaciones = JSON.parse(sessionStorage.getItem('notificacionescio'));
    for (var i = 0; i < notificaciones.notificacionescio.length; i++) {
        mensaje = notificaciones.notificacionescio[i];
        s = "<p>Notificación para la <b>" + mensaje.tipo + "</b> del proyecto <b>" + mensaje.titulo + "</b>&nbsp;&nbsp;&nbsp;";
        s += "<button class='btn-sm btn-info' onclick='aceptarcio(" + i + ")'>Aceptar</button>&nbsp;&nbsp;<button class='btn-sm btn-info' onclick='rechazarcio(" + i + ")'>Rechazar</button>"
        $("#notificacionesaceptaciondg").append(s)
    }
    $("#notificacionesaceptaciondg").show();
}

function aceptarcio(i) {
    notificaciones = JSON.parse(sessionStorage.getItem('notificacionescio'));
    mensaje = notificaciones.notificacionescio[i];
    jsonpropuestas = JSON.parse(sessionStorage.getItem('propuestas'));
    for (var i = 0; i < jsonpropuestas.propuestas.length; i++) {
        if (jsonpropuestas.propuestas[i].titulo == mensaje.titulo) {
            debugger;
            if (mensaje.tipo == "Cancelación") {
                jsonpropuestas.propuestas[i].seguimiento = "cancelado";
            } else if (mensaje.tipo == "Paralización") {
                jsonpropuestas.propuestas[i].seguimiento = "aplazado";
            } 
            break;
        }
    }

    sessionStorage.setItem('propuestas', JSON.stringify(jsonpropuestas));
    notificaciones = JSON.parse(sessionStorage.getItem('notificacionescio'));
    notificaciones.notificacionescio.splice(i)
    sessionStorage.setItem('notificacionescio', JSON.stringify(notificaciones));
    mostrarnotificaciones();
    showprojects("aprobado");
}

function rechazarcio(i) {
    notificaciones = JSON.parse(sessionStorage.getItem('notificacionescio'));
    notificaciones.notificacionescio.splice(i)
    sessionStorage.setItem('notificacionescio', JSON.stringify(notificaciones));
    mostrarnotificaciones();
    showprojects("aprobado");
}


function goback() {
    $("#detalleproyecto").hide();
    $("#descripcionproyecto").prop("disabled", true);
    $("#beneficiosproyecto").prop("disabled", true);
    $("#costesproyecto").prop("disabled", true);
    $("#duracionproyecto").prop("disabled", true);
    $("#riesgosproyecto").prop("disabled", true);
    $("#hitosproyecto").prop("disabled", true);
    $("#entregablesproyecto").prop("disabled", true);
    $("#divbuttons").hide();
    $("#tableprojects").show();
}

function guardarcambios() {

    title = $("#titleproyecto").val();
    jsonpropuestas = JSON.parse(sessionStorage.getItem('propuestas'));
    for (var i = 0; i < jsonpropuestas.propuestas.length; i++) {
        if (jsonpropuestas.propuestas[i].titulo == title) {
            jsonpropuestas.propuestas[i].descripcion = $("#descripcionproyecto").val();
            jsonpropuestas.propuestas[i].beneficios = $("#beneficiosproyecto").val();
            jsonpropuestas.propuestas[i].costes = $("#costesproyecto").val();
            jsonpropuestas.propuestas[i].duracion = $("#duracionproyecto").val();
            jsonpropuestas.propuestas[i].riesgos = $("#riesgosproyecto").val();
            jsonpropuestas.propuestas[i].hitos = $("#hitosproyecto").val();
            jsonpropuestas.propuestas[i].entregables = $("#entregablesproyecto").val();

            sessionStorage.setItem('propuestas', JSON.stringify(jsonpropuestas));
        }
    }

    goback();
}

function verevaluacion(titulo) {
    $("#tableprojects").hide();
    $("#notificacionesaceptaciondg").hide();
    jsonpropuestas = JSON.parse(sessionStorage.getItem('propuestas'));
    for (var i = 0; i < jsonpropuestas.propuestas.length; i++) {
        item = jsonpropuestas.propuestas[i];
        if (item.titulo == titulo) {
            $("#vertituloinforme").text(titulo);
            $("#verinformefinalizado").text(item.informe);
            break;
        }
    }
    $("#verinformeevaluacion").show();
}

function finalizarproyecto() {
    titulo = $("#titleproyecto").val();
    $("#titleproyectoinforme").append(titulo);
    jsonpropuestas = JSON.parse(sessionStorage.getItem('propuestas'));
    goback();
    $("#tableprojects").hide();
    $("#informeevaluacion").show();
}


function enviarinforme(){
    titulo = $("#titleproyecto").val();
    informe = $("#finformeproyecto").val();
    $("#informeevaluacion").hide();
    $("#titleproyectoinforme").empty();
    $("#finformeproyecto").val("");
    $("#tableproyectos").show();
    for (var i = 0; i < jsonpropuestas.propuestas.length; i++) {
        if (jsonpropuestas.propuestas[i].titulo == titulo) {
            jsonpropuestas.propuestas[i].seguimiento = "finalizado";
            jsonpropuestas.propuestas[i].informe = informe;
            sessionStorage.setItem('propuestas', JSON.stringify(jsonpropuestas));
            break;
        }
    }
    $("#tableprojects").show();
}

function volverdeinforme(){
    $("#verinformeevaluacion").hide();
    $("#notificacionesaceptaciondg").show();
    $("#tableprojects").show();
}