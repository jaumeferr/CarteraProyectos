var propuestas;

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
            score: "",
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
            score: "",
            seguimiento: ""
        }
    ])

    sessionStorage.setItem('propuestas', props);
    propJSON = sessionStorage.getItem('propuestas');
    if (propJSON) { //CAMBIAR A if(propJSON)
        propuestas = JSON.parse(propJSON);
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
    debugger;
    var criterios;
    var critJSON;
    var crit_table = $("#prior_crit_table");

    //Cargar detalle de proyecto en modal
    for (var i = 0; i < propuestas.Length; i++) {
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
    critJSON = sessionStorage.getItem('carteraProyectos.config.criterios');
    if (critJSON) {
        criterios = JSON.Parse(critJSON);
    }
    for (var i = 0; i < criterios.Length; i++) {
        crit_table.append("<tr><td>" + criterios[i].desc + "</td><td>" + '<input type="checkbox" id="crit_' + i + '"/>' + "</td></tr>");
    }

    var modal = document.getElementById("prior_proy_modal");
    modal.style.display = "block";
}


/*Enviar propuesta de lista priorizada de proyectos. */
function onSendButtonClick() {

}


//MODAL BUTTON
function onExitModalButtonClick() {
    var modal = document.getElementById("prior_proy_modal");
    modal.style.display = "none";
}

function onSaveModalButtonClick() {

}