var userLogged;

$(document).ready(function () {

    userLogged = JSON.parse(sessionStorage.getItem('userLogged'));
    role = userLogged.role;

    if (role == "solicitante") {
        $("#redactarpropuesta").show();
    } else if (role == "promotor") {
        jsonpropuestas = JSON.parse(sessionStorage.getItem('propuestas'));
        for (var i = 0; i < jsonpropuestas.propuestas.length; i++) {
            item = jsonpropuestas.propuestas[i];
            console.log(item);
            if (item.promotor == userLogged.user && item.estado == 1) {
                $("#tablepropuestas").append("<tr><td>" + item.titulo + "</td><td><button onclick='verpropuesta(\"" + item.titulo.toString() + "\")'>Ver propuesta</button></td></tr>");
            }
        }
        $("#mostrarpropuesta").show();
    } else if (role == "cio") {
        insertpropuestastable(3);
    } else if (role == "oficina") {
        insertpropuestastable(2);
    } else {
        $("#nothingToDo").show();
    }
});

function formpropuesta() {
    $("#formpropuesta").show();
}

function enviarpropuesta() {
    propuestatext = { estado: 1, titulo: $("#ftitlepropuesta").val(), descripcion: $("#fdescripciontextarea").val(), beneficios: $("#fbeneficiostextarea").val(),
     promotor: $("#fpromotorname").val(), solicitante: userLogged.user, director: "", costes: "", duracion: "", riesgos: "", hitos: "", entregables: "" };
    jsonpropuestas = JSON.parse(sessionStorage.getItem('propuestas'));
    jsonpropuestas.propuestas.push(propuestatext);
    sessionStorage.setItem('propuestas', JSON.stringify(jsonpropuestas));
    $("#formpropuesta").hide();
    $("#ftitlepropuesta").val("")
    $("#fdescripciontextarea").val("")
    $("#fbeneficiostextarea").val("")
    $("#fpromotorname").val("")
    jsonpropuestas = JSON.parse(sessionStorage.getItem('propuestas'));
    console.log(jsonpropuestas);
}

function aceptar() {

    if (userLogged.role == "promotor") {

        title = $("#titlepropuesta").text();
        jsonpropuestas = JSON.parse(sessionStorage.getItem('propuestas'));
        for (var i = 0; i < jsonpropuestas.propuestas.length; i++) {
            item = jsonpropuestas.propuestas[i];
            if (item.titulo == title) {
                $("#ftitlepropuestapromotor").text(item.titulo);
                $("#fnewtitlepropuestapromotor").val(item.titulo);
                $("#fdescripciontextareapromotor").val(item.descripcion);
                $("#fbeneficiostextareapromotor").val(item.beneficios);
                $("#solicitantepropuestapromotor").text(item.solicitante);
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
            if (item.promotor == userLogged.user && item.estado == 1) {
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
            }else if (userLogged.role == "oficina" || userLogged.role == "cio") {
                $("#hidetopromotor").show();
            }   
            
            $("#containerpropuesta").show();

        }
    }
}


function redirectlogin() {
    location.href = "login.htm";
}

function cambiarestado(nuevoestado) {
    title = $("#titlepropuesta").text();
    jsonpropuestas = JSON.parse(sessionStorage.getItem('propuestas'));
    for (var i = 0; i < jsonpropuestas.propuestas.length; i++) {
        if (jsonpropuestas.propuestas[i].titulo == title) {
            debugger;
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
            $("#tablepropuestas").append("<tr><td>" + item.titulo + "</td><td><button onclick='verpropuesta(\"" + item.titulo.toString() + "\")'>Ver propuesta</button></td></tr>");
        }
    }
    $("#mostrarpropuesta").show();
}

function enviarpropuestapromotor() {
    debugger;
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
        console.log(item);
        if (item.promotor == userLogged.user && item.estado == 1) {
            $("#tablepropuestas").append("<tr><td>" + item.titulo + "</td><td><button onclick='verpropuesta(\"" + item.titulo.toString() + "\")'>Ver propuesta</button></td></tr>");
        }
    }
    $("#mostrarpropuesta").show();
}