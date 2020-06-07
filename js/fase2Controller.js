var userLogged;

$(document).ready(function() {

    userLogged = JSON.parse(sessionStorage.getItem('userLogged'));
    role = userLogged.role;
    $("#userInfo").append("Usuario: " + userLogged.name);
    $("#buttoncambiarfase").hide();
    $("#buttonredactarpropuesta").hide();

    if (role == "solicitante") {
        $("#buttonredactarpropuesta").show();
    } else if (role == "promotor") {
        jsonpropuestas = JSON.parse(sessionStorage.getItem('propuestas'));
        for (var i = 0; i < jsonpropuestas.propuestas.length; i++) {
            item = jsonpropuestas.propuestas[i];
            console.log(item);
            if (item.promotor == userLogged.name && item.estado == 1) {
                $("#tablepropuestas").append("<tr><td style='padding-top:15px;padding-left:50px;'>" + item.titulo + "</td><td style='text-align: center; padding:10px;'><button class='btn btn-secondary' onclick='verpropuesta(\"" + item.titulo.toString() + "\")'>Ver propuesta</button></td></tr>");
            }
        }
        $("#mostrarpropuesta").show();
    } else if (role == "cio") {
        $("#buttoncambiarfase").show();
        insertpropuestastable(3);
    } else if (role == "oficina") {
        insertpropuestastable(2);
    }
});

function formpropuesta() {
    $("#formpropuesta").show();
}

function enviarpropuesta() {
    propuestatext = {
        estado: 1,
        titulo: $("#ftitlepropuesta").val(),
        descripcion: $("#fdescripciontextarea").val(),
        beneficios: $("#fbeneficiostextarea").val(),
        promotor: $("#fpromotorname").val(),
        solicitante: userLogged.name,
        director: "",
        costes: "",
        duracion: "",
        riesgos: "",
        hitos: "",
        entregables: "",
        ejecucion: "bien"
    };
    jsonpropuestas = JSON.parse(sessionStorage.getItem('propuestas'));
    jsonpropuestas.propuestas.push(propuestatext);
    sessionStorage.setItem('propuestas', JSON.stringify(jsonpropuestas));
    $("#formpropuesta").hide();
    $("#ftitlepropuesta").val("")
    $("#fdescripciontextarea").val("")
    $("#fbeneficiostextarea").val("")
    $("#fpromotorname").val("")

}

function aceptar() {

    if (userLogged.role == "promotor") {

        $("#tablepropuestas").hide();
        title = $("#titlepropuesta").text();
        jsonpropuestas = JSON.parse(sessionStorage.getItem('propuestas'));
        for (var i = 0; i < jsonpropuestas.propuestas.length; i++) {
            item = jsonpropuestas.propuestas[i];
            if (item.titulo == title) {
                $("#ftitlepropuestapromotor").text(item.titulo);
                $("#fnewtitlepropuestapromotor").val(item.titulo);
                $("#fdescripciontextareapromotor").val(item.descripcion);
                $("#fbeneficiostextareapromotor").val(item.beneficios);
                $("#solicitantepropuestapromotor").val(item.solicitante);
            }
        }
        $("#formpropuestapromotor").show();

    } else if (userLogged.role == "oficina") {
        cambiarestado(3);
        insertpropuestastable(2);
    } else if (userLogged.role == "cio") {
        cambiarestado(4);
        insertpropuestastable(3);
    }

    $("#containerpropuesta").hide();

}

function rechazar() {

    if (userLogged.role == "promotor") {
        cambiarestado(0);
        $("#tablepropuestas").empty();
        jsonpropuestas = JSON.parse(sessionStorage.getItem('propuestas'));
        for (var i = 0; i < jsonpropuestas.propuestas.length; i++) {
            item = jsonpropuestas.propuestas[i];
            console.log(item);
            if (item.promotor == userLogged.name && item.estado == 1) {
                $("#tablepropuestas").append("<tr><td>" + item.titulo + "</td><td><button onclick='verpropuesta(\"" + item.titulo.toString() + "\")'>Ver propuesta</button></td></tr>");
            }
        }
        $("#mostrarpropuesta").show();
    } else if (userLogged.role == "oficina") {
        cambiarestado(1);
        insertpropuestastable(2);
    } else if (userLogged.role == "cio") {
        cambiarestado(2);
        insertpropuestastable(3);
    }
    $("#containerpropuesta").hide();

}



function verpropuesta(titulo) {
    jsonpropuestas = JSON.parse(sessionStorage.getItem('propuestas'));
    for (var i = 0; i < jsonpropuestas.propuestas.length; i++) {
        item = jsonpropuestas.propuestas[i];
        if (item.titulo == titulo) {
            $("#titlepropuesta").text(item.titulo);
            $("#solicitantepropuesta").text(item.solicitante);
            $("#descripciontext").text(item.descripcion);
            $("#dproyectopropuesta").text(item.director);
            $("#promotorpropuesta").text(item.promotor);
            $("#beneficiostext").text(item.beneficios);
            $("#costespropuesta").text(item.costes);
            $("#duracionpropuesta").text(item.duracion);
            $("#riesgospropuesta").text(item.riesgos);
            $("#hitospropuesta").text(item.hitos);
            $("#entrgablespropuesta").text(item.entregables);
            if (userLogged.role == "promotor") {
                $("#hidetopromotor").hide();
            } else if (userLogged.role == "oficina" || userLogged.role == "cio") {
                $("#hidetopromotor").show();
            }

            $("#containerpropuesta").show();

        }
    }
}


function cambiarestado(nuevoestado) {
    title = $("#titlepropuesta").text();
    jsonpropuestas = JSON.parse(sessionStorage.getItem('propuestas'));
    for (var i = 0; i < jsonpropuestas.propuestas.length; i++) {
        if (jsonpropuestas.propuestas[i].titulo == title) {
            jsonpropuestas.propuestas[i].estado = nuevoestado;
            sessionStorage.setItem('propuestas', JSON.stringify(jsonpropuestas));
        }
    }
}


function insertpropuestastable(estado) {
    $("#tablepropuestas").empty();
    jsonpropuestas = JSON.parse(sessionStorage.getItem('propuestas'));
    for (var i = 0; i < jsonpropuestas.propuestas.length; i++) {
        item = jsonpropuestas.propuestas[i];
        console.log(item);
        if (item.estado == estado) {
            $("#tablepropuestas").append("<tr><td style='padding-top:15px;padding-left:50px;'>" + item.titulo + "</td><td style='text-align: center; padding:10px;'><button class='btn btn-secondary' onclick='verpropuesta(\"" + item.titulo.toString() + "\")'>Ver propuesta</button></td></tr>");
        }
    }
    $("#mostrarpropuesta").show();
}

function enviarpropuestapromotor() {

    title = $("#ftitlepropuestapromotor").text();
    jsonpropuestas = JSON.parse(sessionStorage.getItem('propuestas'));
    for (var i = 0; i < jsonpropuestas.propuestas.length; i++) {
        if (jsonpropuestas.propuestas[i].titulo == title) {
            jsonpropuestas.propuestas[i].titulo = $("#fnewtitlepropuestapromotor").val();
            jsonpropuestas.propuestas[i].descripcion = $("#fdescripciontextareapromotor").val();
            jsonpropuestas.propuestas[i].director = $("#fdproyectosname").val();
            jsonpropuestas.propuestas[i].estado = 2;
            jsonpropuestas.propuestas[i].beneficios = $("#fbeneficiostextareapromotor").val();
            jsonpropuestas.propuestas[i].costes = $("#fcostespropuestapromotor").val();
            jsonpropuestas.propuestas[i].duracion = $("#fduracionpropuestapromotor").val();
            jsonpropuestas.propuestas[i].riesgos = $("#friesgospropuestapromotor").val();
            jsonpropuestas.propuestas[i].hitos = $("#fhitospropuestapromotor").val();
            jsonpropuestas.propuestas[i].entregables = $("#fentregablespropuestapromotor").val();

            sessionStorage.setItem('propuestas', JSON.stringify(jsonpropuestas));
        }
    }

    $("#formpropuestapromotor").hide();
    $("#fdproyectosname").val("");
    $("#fcostespropuestapromotor").val("");
    $("#fduracionpropuestapromotor").val("");
    $("#friesgospropuestapromotor").val("");
    $("#fhitospropuestapromotor").val("");
    $("#fentregablespropuestapromotor").val("");

    $("#tablepropuestas").empty();
    jsonpropuestas = JSON.parse(sessionStorage.getItem('propuestas'));
    for (var i = 0; i < jsonpropuestas.propuestas.length; i++) {
        item = jsonpropuestas.propuestas[i];
        if (item.promotor == userLogged.name && item.estado == 1) {
            $("#tablepropuestas").append("<tr><td style='padding-top:15px;padding-left:50px;'>" + item.titulo + "</td><td style='text-align: center; padding:10px;'><button class='btn btn-secondary' onclick='verpropuesta(\"" + item.titulo.toString() + "\")'>Ver propuesta</button></td></tr>");
        }
    }
    $("#tablepropuestas").show();
}

function cambiarfase3() {
    sessionStorage.setItem('faseCartera', "3");
    location.href = "fase3.htm"
}