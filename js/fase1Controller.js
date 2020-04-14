var userLogged;

$(document).ready(function() {
    userLogged = JSON.parse(localStorage.getItem('userLogged'));
    $("#userInfo").append("User: " + userLogged.user + "\n Role: " + userLogged.role);
});