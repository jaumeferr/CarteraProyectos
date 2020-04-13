var userList;
var userLogged;

$(document).ready(function() {
    userList = [{
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

    localStorage.setItem('userList', userList);
});

function login() {

    var user = $("#user").val();
    var pass = $("#password").val();

    var found = false;
    debugger;
    for (i = 0;
        (i < userList.length) && !found; i++) {
        if ((user === userList[i].user) && (pass === userList[i].password)) {
            found = true;
            userLogged = userList[i];
            $('#login').hide();
            $('#main').show();
        }
    }

    if (!found) {
        $('#errorLogin').show();
    }
};