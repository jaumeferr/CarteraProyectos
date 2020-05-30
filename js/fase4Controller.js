var userLogged;

$(document).ready(function () {

    userLogged = JSON.parse(sessionStorage.getItem('userLogged'));
    role = userLogged.role;
    $("#userInfo").append("Usuario: " + userLogged.name);

    propuestatext = {
        estado: 5, titulo: "aaaaaaaaaa", descripcion: "des", beneficios: "ben",
        promotor: "prom", solicitante: "sol", director: "dir", costes: "111", duracion: "12", riesgos: "molts", hitos: "tambe", entregables: "cap", ejecucion: "mal", seguimiento:"aprobado"
    };
    jsonpropuestas = JSON.parse(sessionStorage.getItem('propuestas'));
    jsonpropuestas.propuestas.push(propuestatext);
    sessionStorage.setItem('propuestas', JSON.stringify(jsonpropuestas));

    jsonpropuestas = JSON.parse(sessionStorage.getItem('propuestas'));
    console.log(jsonpropuestas)

    if (userLogged.role == "dg") {
        mostrarnotificaciones();
    }

    showprojects("aprobado");
});



function showprojects(priority) {
    $("#tableproyectos").empty();
    jsonpropuestas = JSON.parse(sessionStorage.getItem('propuestas'));
    for (var i = 0; i < jsonpropuestas.propuestas.length; i++) {
        item = jsonpropuestas.propuestas[i];
        if (item.estado == 5 && item.seguimiento == priority) { // y otra condicion : ha sido aceptado en la fase 3
            s = "<tr><td>" + item.titulo + "</td><td></td><td></td><td>" + item.costes + "</td>";
            s += "<td><button class='btn btn-secondary' onclick='verdetalles(\"" + item.titulo.toString() + "\")'>Ver detalles</button></td>";
            s += "<td><button class='btn btn-secondary' onclick='vercomentarios(\"" + item.titulo.toString() + "\")'>Ver comentarios</button></td>";
            s += "<td><select id='ejecucionproyecto' name='ejecucionproyecto' disabled><option value='bien' style='background-color:green'>Bien</option><option value='regular' style='background-color:yellow'>Regular</option>";
            s += "<option value='mal' style='background-color:red'>Mal</option></select></td></tr>";
            $("#tableproyectos").append(s);
            if (item.ejecucion == "bien") {
                $("#ejecucionproyecto option[value='bien']").prop("selected", true);
            } else if (item.ejecucion == "regular") {
                $("#ejecucionproyecto option[value='regular']").prop("selected", true);
            } else {
                $("#ejecucionproyecto option[value='mal']").prop("selected", true);
            }

        }
    }

    if (userLogged.role == "promotor") {
        $("#ejecucionproyecto").prop("disabled", false);
    }
}

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

            $("#detalleproyecto").show();

            if (userLogged.role == "cd" || userLogged.role == "cio" || userLogged.role == "rector") {
                $("#reconfigurarbutton").show();
            }
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

    notificaciones = JSON.parse(sessionStorage.getItem('notificacionescio'));
    console.log(notificaciones)

    $("#tableprojects").show();
    $("#detalleproyecto").hide();
}

function cancelarproyecto() {
    notificaciones = JSON.parse(sessionStorage.getItem('notificacionescio'));
    titulo = $("#titleproyecto").val();
    mensajetext = { titulo: $("#titleproyecto").val(), tipo: "Cancelación" };
    notificaciones = JSON.parse(sessionStorage.getItem('notificacionescio'));
    notificaciones.notificacionescio.push(mensajetext);
    sessionStorage.setItem('notificacionescio', JSON.stringify(notificaciones));

    $("#tableprojects").show();
    $("#detalleproyecto").hide();
}

function mostrarnotificaciones() {
    notificaciones = JSON.parse(sessionStorage.getItem('notificacionescio'));
    for (var i = 0; i < notificaciones.notificacionescio.length; i++) {
        mensaje = notificaciones.notificacionescio[i];
        s = "<p>Notificación para la <b>" + mensaje.tipo + "</b> del proyecto <b>" + mensaje.titulo + "</b>";
        s += "<button onclick='aceptarcio(" + i + ")'>Aceptar</button><button onclick='rechazarcio(" + i + ")'>Rechazar</button>"
        $("#notificacionesaceptaciondg").append(s)
    }
    $("#notificacionesaceptaciondg").show();
}

function aceptarcio(i) {
    notificaciones = JSON.parse(sessionStorage.getItem('notificacionescio'));
    mensaje = notificaciones.notificacionescio[i];
    jsonpropuestas = JSON.parse(sessionStorage.getItem('propuestas'));
    for (var i = 0; i < jsonpropuestas.propuestas.length; i++) {
        item = jsonpropuestas.propuestas[i];
        if (item.titulo == mensaje.titulo) {

            if (mensaje.tipo = "Cancelación") {
                //item. = cancelar
            } else if (mensaje.tipo = "Paralización") {

            } else {

            }
        }
    }

    notificaciones = JSON.parse(sessionStorage.getItem('notificacionescio'));
    notificaciones.notificacionescio[i].remove();
    sessionStorage.setItem('notificacionescio', JSON.stringify(notificaciones));
    mostrarnotificaciones();
}

function rechazarcio(i) {
    notificaciones = JSON.parse(sessionStorage.getItem('notificacionescio'));
    notificaciones.notificacionescio[i].remove();
    sessionStorage.setItem('notificacionescio', JSON.stringify(notificaciones));
    mostrarnotificaciones();
}

function showtypeproject(priority) {
    if (priority == "aprobado") {
        showprojects("aprobado");
    } else if (priority = "apalzado") {
        showprojects("aplazado");
    }
}

function goback(){
    $("#tableprojects").show();
    $("#detalleproyecto").hide();
    
}

function guardarcambios(){

}