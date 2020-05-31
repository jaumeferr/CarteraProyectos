var propuestas;
var criterios;

$(document).ready(function() {
    props = JSON.stringify([{
            titulo: "AAA",
            descripcion: "Este es el proyecto AAA y trata de esto.",
            director: "Alguien Importante",
            estado: 0,
            beneficios: "35000",
            costes: "30000",
            duracion: "50 días",
            riesgos: "Muchos",
            hitos: "Algunos habrá",
            entregables: "También bastantes",
            rrhh: [],
            rrff: [],
            cuantia: 100000,
            score: "0",
            seguimiento: ""
        },
        {
            titulo: "BBB",
            descripcion: "Este es el proyecto BBB y trata de esto.",
            director: "Alguien Más Importante",
            estado: 0,
            beneficios: "400000",
            costes: "25000",
            duracion: "90 días",
            riesgos: "Muchísimos",
            hitos: "Algunos habrá también",
            entregables: "También muchos",
            rrhh: [],
            rrff: [],
            cuantia: 1324000,
            score: "0",
            seguimiento: ""
        }
    ]);

    crits = JSON.stringify([{
            desc: "criterio 1",
            pond: "25"
        },
        {
            desc: "criterio 2",
            pond: "75"
        }
    ]);

    sessionStorage.setItem('carteraProyectos.criterios', crits);
    sessionStorage.setItem('propuestas', props);
    propJSON = sessionStorage.getItem('propuestas');
    critJSON = sessionStorage.getItem("carteraProyectos.criterios");

    if (propJSON && critJSON) { //CAMBIAR A if(propJSON)
        propuestas = JSON.parse(propJSON);
        criterios = JSON.parse(critJSON);
    } else {

    }

    //Cargar propuestas en tabla
    var table = $("#prior_proy_table");
    propuestas.forEach(function(propuesta) {
        table.append("<tr><td style='padding-top:15px;padding-left:50px;'>" + propuesta.titulo + "</td><td style='padding-top:15px;padding-left:50px;'>" + propuesta.score + "</td><td style='text-align: center; padding:10px;'><button onclick='onEvaluateButtonClick(\"" + propuesta.titulo.toString() + "\")'>Evaluar</button></td></tr>");
    });

});

/*Publicar proyectos financiados que se vana ejecutar. */
function onPublishButtonClick() {
    //Abrir ventana de evaluación solo si se ha seleccionado una línea.
}

/*Confirmar la revisión de la priorización, habiendo asignado financiación para
cada proyecto.*/
function onEvaluateButtonClick(titulo) {
    var crit_table = $("#prior_crit_table");


    //Cargar detalle de proyecto en modal
    for (var i = 0; i < propuestas.length; i++) {
        if (propuestas[i].titulo == titulo) {
            $("#proy_tit").val(propuestas[i].titulo);
            $("#proy_desc").val(propuestas[i].descripcion);
            $("#proy_benf").val(propuestas[i].beneficios);
            $("#proy_costs").val(propuestas[i].costes);
            $("#proy_dur").val(propuestas[i].duracion);
            $("#proy_hit").val(propuestas[i].hitos);
            $("#proy_entr").val(propuestas[i].entregables);
            $("#proy_riesgos").val(propuestas[i].riesgos);
        }
    }

    //Cargar criterios
    for (var i = 0; i < criterios.length; i++) {
        var id = "crit_" + i;
        crit_table.append("<tr><td>" + '<input type="checkbox" onchange="onChangeCriteriosCheckbox(this, ' + criterios[i].pond.toString() + ')" id="' + id + '"/>' + "</td><td>" + criterios[i].desc + "</td></tr>");
    }

    var modal = document.getElementById("prior_proy_modal");
    modal.style.display = "block";
}


/*Enviar propuesta de lista priorizada de proyectos. */
function onSendButtonClick() {

}


//MODAL events
function onExitModalButtonClick() {
    var modal = document.getElementById("prior_proy_modal");
    modal.style.display = "none";
}

function onSaveModalButtonClick() {
    var score = document.getElementById("proy_score_modal").value;

    //Actualizar datos propuesta
    for (var i = 0; i < propuestas.length; i++) {
        if (propuestas[i].titulo == $("#proy_tit").val()) {
            propuestas[i].score = score;
        }
    }

    //Actualizar session storage
    sessionStorage.setItem('propuestas', propuestas);

    debugger;
    //Actualizar tabla
    var table = $("#prior_proy_table");
    var count = $('#prior_proy_table tr').length;

    for (var x = 1; x < count; x++) {
        $("#table tr:last").remove();
    }

    propuestas.forEach(function(propuesta) {
        table.append("<tr><td style='padding-top:15px;padding-left:50px;'>" + propuesta.titulo + "</td><td style='padding-top:15px;padding-left:50px;'>" + propuesta.score + "</td><td style='text-align: center; padding:10px;'><button onclick='onEvaluateButtonClick(\"" + propuesta.titulo.toString() + "\")'>Evaluar</button></td></tr>");
    });

    //Cerrar ventana
    var modal = document.getElementById("prior_proy_modal");
    modal.style.display = "none";
}

function onChangeCriteriosCheckbox(checkbox, pond) {
    var score = document.getElementById("proy_score_modal");
    var score_value = parseInt(score.value);

    if (checkbox.checked) {
        //Sumar ponderación a score
        score_value = score_value + pond;
    } else {
        score_value = score_value - pond;
    }

    score.value = score_value;

}