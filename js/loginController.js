var users;
var userLogged;

$(document).ready(function() {

    if (!sessionStorage.getItem('users')) {
        var newsUsers = [{
                "user": "juanfrau",
                "password": "123",
                "role": "dg",
                "name": "Juan Frau"
            },
            {
                "user": "jaumeferr",
                "password": "123",
                "role": "cd",
                "name": "Jaume Ferrer"
            },
            {
                "user": "romankarb",
                "password": "123",
                "role": "cio",
                "name": "Roman Karbushev"
            },
            {
                "user": "migvidal",
                "password": "123",
                "role": "promotor",
                "name": "Miguel Vidal"
            },
            {
                "user": "pautrias",
                "password": "123",
                "role": "solicitante",
                "name": "Pau Trias"
            },
            {
                "user": "javieram",
                "password": "123",
                "role": "pm",
                "name": "Javier Amengual"
            },
            {
                "user": "migalberti",
                "password": "123",
                "role": "apoyo",
                "name": "Miguel Alberti"
            },
            {
                "user": "bdunkin",
                "password": "123",
                "role": "oficina",
                "name": "Bo Dunkin"
            }
        ];

        sessionStorage.setItem('users', JSON.stringify(newsUsers));
        users = JSON.parse(sessionStorage.getItem('users'));
    } else {
        users = JSON.parse(sessionStorage.getItem('users'));
    }

    if (!sessionStorage.getItem('faseCartera')) {
        sessionStorage.setItem('faseCartera', "1");
        sessionStorage.setItem('estadoCartera', "crear_config");
    }

    if (!sessionStorage.getItem('propuestas')) {
        s = { propuestas: [] };
        sessionStorage.setItem('propuestas', JSON.stringify(s));
    }

    if (!sessionStorage.getItem('notificacionescio')) {
        s = { notificacionescio: [] };
        sessionStorage.setItem('notificacionescio', JSON.stringify(s));
    }

});

function login() {
    var user = $("#user").val();
    var pass = $("#password").val();

    var isValid = false;
    var url;

    for (i = 0;
        (i < users.length) && !isValid; i++) {
        if ((user === users[i].user) && (pass === users[i].password)) {
            isValid = true;
            userLogged = users[i];
            sessionStorage.setItem('userLogged', JSON.stringify(userLogged));

            if (hasSomethingToDo()) {
                //Redireccionar a la página.
                url = "fase" + sessionStorage.getItem('faseCartera') + ".htm";
                location.href = url;
            } else {
                location.href = "nothingtodo.htm";
            }
        }
    }

    if (!isValid) {
        $('#errorLogin').show();
    }
}

function hasSomethingToDo() {
    var rol = userLogged.role;
    switch (sessionStorage.getItem('faseCartera')) {
        case "1":
            if (rol === "cio" || rol === "dg" || rol === "cd") {
                return true;
            } else {
                return false;
            }

        case "2":
            if (rol === "promotor" || rol === "cio" || rol === "solicitante" || rol === "oficina") {
                return true;
            } else {
                return false;
            }

        case "3":
            var estado = sessionStorage.getItem('estadoCartera');
            if ((estado === "aprobar_config" || estado === "priorizar_proyectos") && rol === "cio") {
                return true
            } else if (estado == "financiar_proyectos" && (rol === "dg" || rol === "cd")) {
                return true;
            } else {
                return false;
            }

        case "4":
            if (rol === "dg" || rol === "cio" || rol === "promotor" || rol === "cd") {
                return true;
            } else {
                return false;
            }
    }
}