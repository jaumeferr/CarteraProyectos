var propuestas;

$(document).ready(function() {
    debugger;
    propJSON = sessionStorage.getItem('propuestas');
    if (propJSON = null) { //CAMBIAR A if(propJSON)
        this.propuestas = JSON.Parse(propJSON);
    } else {
        this.propuestas = [{
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
        ]
    }

    //Cargar propuestas en tabla
    var table = $("#prior_proy_table");
    this.propuestas.forEach(function(propuesta) {
        table.append("<tr><td>" + propuesta.titulo + "</td><td>" + "-" + "</td></tr>");
    });

});

/*Publicar proyectos financiados que se vana ejecutar. */
function onPublishButtonClick() {
    //Abrir ventana de evaluación solo si se ha seleccionado una línea.
}

/*Confirmar la revisión de la priorización, habiendo asignado financiación para
cada proyecto.*/
function onEvaluateButtonClick() {
    var criterios;
    var critJSON;
    var crit_table = $("#prior_crit_table");
    //Asegurarse de que se ha seleccionado una linea

    //Cargar detalle de proyecto en modal

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