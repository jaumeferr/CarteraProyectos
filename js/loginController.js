var users;
var userLogged;

$(document).ready(function() {
    if (!localStorage.getItem('users')) {
        var newsUsers = [{
                "user": "juanfrau",
                "password": "123",
                "role": "rector",
            },
            {
                "user": "jaumeferr",
                "password": "123",
                "role": "cd",
            },
            {
                "user": "romankarb",
                "password": "123",
                "role": "cio",
            },
            {
                "user": "migvidal",
                "password": "123",
                "role": "promotor",
            },
            {
                "user": "pautrias",
                "password": "123",
                "role": "solicitante",
            },
            {
                "user": "javieram",
                "password": "123",
                "role": "pm",
            },
            {
                "user": "migalberti",
                "password": "123",
                "role": "apoyo",
            },
            {
                "user": "bdunkin",
                "password": "123",
                "role": "oficina",
            }
        ];

        localStorage.setItem('users', JSON.stringify(newsUsers));
        users = JSON.parse(localStorage.getItem('users'));
    } else {
        users = JSON.parse(localStorage.getItem('users'));
    }
    if (!localStorage.getItem('faseCartera')) {
        localStorage.setItem('faseCartera', "1");
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
            localStorage.setItem('userLogged', JSON.stringify(userLogged));

            if (hasSomethingToDo()) {
                //Redireccionar a la página.
                url = "fase" + localStorage.getItem('faseCartera') + ".htm";
                location.href = url;
            } else {
                $('#NothingToDo').show();

            }
        }
    }

    if (!isValid) {
        $('#errorLogin').show();
    }
}

function hasSomethingToDo() {
    var rol = userLogged.role;
    switch (localStorage.getItem('faseCartera')) {
        case "1":
            if (rol === "cio" || rol === "rector" || rol === "cd") {
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
            if (rol === "oficina" || rol === "cio" || rol === "cd" || rol === "rector") {
                return true;
            } else {
                return false;
            }

        case "4":
            if (rol === "rector" || rol === "cio" || rol === "promotor") {
                return true;
            } else {
                return false;
            }
    }
}