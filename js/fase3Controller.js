var propuestas;

$(document).ready(function() {
    propJSON = sessionStorage.getItem('propuestas');
    if (propJSON) {
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
    propuestas.forEach(function(propuesta) {
        table.append("<tr><td>" + propuesta.titulo + "</td><td>" + "-" + "</td></tr>");
    });

});

/*Publicar proyectos financiados que se vana ejecutar. */
function onPublishButtonClick() {
    //Abrir ventana de evaluación solo si se ha seleccionado una línea.
}

/*Confirmar la revisión de la priorización, habiendo asignado financiación para
cada proyecto.*/
function onAssignButtonClick() {

}


/*Enviar propuesta de lista priorizada de proyectos. */
function onSendButtonClick() {

}