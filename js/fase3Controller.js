var propuestas;

$(document).ready(function() {
    propJSON = sessionStorage.getItem('propuestas');
    if (propJSON) {
        this.propuestas = JSON.Parse(propJSON);
    }

});