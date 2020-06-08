var userLogged;
var propuestas;
var estado;
var lista_priorizada;
var carteraProyectos;
var criterios;

$(document).ready(function() {

    userLogged = JSON.parse(sessionStorage.getItem('userLogged'));
    role = userLogged.role;
    $("#userInfo").append("Usuario: " + userLogged.name);

    var estado = sessionStorage.getItem('estadoCartera');
    if (estado == "aprobar_config") {
        estado = "priorizar_proyectos";
    }

    if (!estado) {
        estado = "priorizar_proyectos";
    }

    if (estado == "priorizar_proyectos") {
        var propJSON = sessionStorage.getItem('propuestas');
        var carteraJSON = sessionStorage.getItem("carteraProyectos");

        propuestas = JSON.parse(propJSON);
        propuestas = propuestas.propuestas;
        carteraProyectos = JSON.parse(carteraJSON);
        criterios = carteraProyectos.config.criterios;

        //Cargar propuestas en tabla (PRIORIZAR)
        var table = $("#prior_proy_table");
        propuestas.forEach(function(propuesta) {
            if (propuesta.estado == 4) {
                table.append("<tr><td style='padding-top:15px;'>" + propuesta.titulo + "</td><td style='padding-top:15px;padding-left:20px;'>" + propuesta.score + "</td><td style='text-align: center; padding:10px;'><button class='btn btn-secondary' onclick='onEvaluateButtonClick(\"" + propuesta.titulo.toString() + "\")'>Evaluar</button></td></tr>");
            }
        });

        $("#prior_proy_table_panel").show();
        $("#publishButton").hide();
        $("#rejectButton").hide();
        $("#changeCritsButton").hide();

    } else if (estado == "financiar_proyectos") {
        var carteraJSON = sessionStorage.getItem("carteraProyectos");
        priorJSON = sessionStorage.getItem('lista_priorizada');

        carteraProyectos = JSON.parse(carteraJSON);
        criterios = carteraProyectos.config.criterios;
        lista_priorizada = JSON.parse(priorJSON);

        //Cargar lista priorizada en tabla (FINANCIAR)
        var table = $("#financ_proy_table");
        lista_priorizada.forEach(function(propuesta) {
            table.append("<tr><td style='padding-top:15px;padding-left:50px;'>" + propuesta.titulo + "</td><td style='padding-top:15px;padding-left:50px;'>" + propuesta.score + "</td><td style='text-align: center; padding:10px;'><button onclick='onFinanceButtonClick(\"" + propuesta.titulo.toString() + "\")'>Financiar</button></td></tr>");
        });

        $("#financ_proy_table_panel").show();
        $("#sendButton").hide();
    }

});

/*Publicar proyectos financiados que se vana ejecutar. */
function onPublishButtonClick() {
    //Cambiar fase de la cartera
    sessionStorage.setItem('faseCartera', "4");
    alert("Se ha publicado la lista priorizada de proyectos");
    $("#publishButton").hide();
}

/*Rechazar propuesta de priorizacion de proyectos*/
function onRejectButtonClick() {
    /*var modal = document.getElementById("rejectForm");
    modal.style.display = "block";*/
}

function onExitButtonClick() {
    //Redireccionar a la página de login.
    url = "login.htm";
    location.href = url;
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

    //Borrar criterios y score
    $("#proy_score_modal").val("0");
    var count = $('#prior_crit_table tr').length;

    for (var x = 1; x < count; x++) {
        $("#prior_crit_table tr:last").remove();
    }

    //Cargar criterios
    for (var i = 0; i < criterios.length; i++) {
        var id = "crit_" + i;
        crit_table.append("<tr><td>" + '<input type="checkbox" onchange="onChangeCriteriosCheckbox(this, ' + criterios[i].pond.toString() + ')" id="' + id + '"/>' + "</td><td>" + criterios[i].desc + "</td></tr>");
    }

    var modal = document.getElementById("prior_proy_modal");
    modal.style.display = "block";

    crit_table.show();
    $("#saveFinancModalButton").hide();
}

function onFinanceButtonClick(titulo) {
    var finan_panel = $("#finan_panel");

    //Cargar detalle de proyecto en modal
    for (var i = 0; i < lista_priorizada.length; i++) {
        if (lista_priorizada[i].titulo == titulo) {
            $("#proy_score_modal").val(lista_priorizada[i].score);
            $("#proy_tit").val(lista_priorizada[i].titulo);
            $("#proy_desc").val(lista_priorizada[i].descripcion);
            $("#proy_benf").val(lista_priorizada[i].beneficios);
            $("#proy_costs").val(lista_priorizada[i].costes);
            $("#proy_dur").val(lista_priorizada[i].duracion);
            $("#proy_hit").val(lista_priorizada[i].hitos);
            $("#proy_entr").val(lista_priorizada[i].entregables);
            $("#proy_riesgos").val(lista_priorizada[i].riesgos);
        }
    }

    var modal = document.getElementById("prior_proy_modal");
    modal.style.display = "block";

    finan_panel.show();
    $("#savePriorModalButton").hide();
    //$("#proy_score_modal").hide();
}

/*Enviar propuesta de lista priorizada de proyectos. */
function onSendButtonClick() {
    //Ordenar por score
    var lista_prior = propuestas;
    lista_prior.sort(function(a, b) {
        if (a.score > b.score) {
            return 1;
        }
        if (a.score < b.score) {
            return -1;
        }
        // a must be equal to b
        return 0;
    });

    //Crear lista priorizada en session storage
    sessionStorage.setItem('lista_priorizada', JSON.stringify(lista_prior));

    //Actualizar estado
    sessionStorage.setItem('estadoCartera', "financiar_proyectos");
    sessionStorage.setItem('faseCartera', "3");
    alert("La lista priorizada se ha enviado correctamente");

    $("#sendButton").hide();
}

function onChangeCritsButtonClick() {
    //Abrir modal 
    var modal = document.getElementById("ajuste_crit_modal");
    modal.style.display = "block";

    //Borrar info tabla y cargar criterios
    var table = $("#ajuste_crit_table");
    var count = criterios.length;
    var num_rows = $("#ajuste_crit_table tr").length;

    for (var x = 1; x < num_rows; x++) {
        $("#ajuste_crit_table tr:last").remove();
    }

    var i = 0;
    criterios.forEach(function(criterio) {
        table.append("<tr><td style='padding-top:15px;width:450px;'><input type='text' id='crit_adj_" + i + "' style='width:400px;'></td><td style='padding-top:15px;'><input type='text' id='pond_adj_" + i + "'></td></tr>");
        i++;
    });

    for (var j = 0; j < count; j++) {
        var crit = "#crit_adj_" + j;
        var pond = "#pond_adj_" + j;

        $(crit).val(criterios[j].desc);
        $(pond).val(criterios[j].pond);
    }
}


//MODAL events
function onAplicarAjusteCritButtonClick() {
    criterios = [];
    var count = $("#ajuste_crit_table tr").length;

    for (var i = 1; i < count; i++) {
        var crit = "#crit_adj_" + (i - 1);
        var pond = "#pond_adj_" + (i - 1);

        criterios.push({ desc: $(crit).val(), pond: $(pond).val() });
    }
    //Guardar criterios
    carteraProyectos.config.criterios = criterios;
    sessionStorage.setItem('carteraProyectos', JSON.stringify(carteraProyectos));

    //Cerrar modal
    var modal = document.getElementById("ajuste_crit_modal");
    modal.style.display = "none";

    alert("Los criterios de evaluación se han modificado con éxito.");
}

function onExitAjusteCritButtonClick() {
    //Cerrar modal
    var modal = document.getElementById("ajuste_crit_modal");
    modal.style.display = "none";
}

function onExitModalButtonClick() {
    var modal = document.getElementById("prior_proy_modal");
    modal.style.display = "none";
}

function onSavePriorModalButtonClick() {
    var score = document.getElementById("proy_score_modal").value;

    //Actualizar datos propuesta
    for (var i = 0; i < propuestas.length; i++) {
        if (propuestas[i].titulo == $("#proy_tit").val()) {
            propuestas[i].score = score;
        }
    }

    //Actualizar session storage
    sessionStorage.setItem('propuestas', JSON.stringify(propuestas));

    //Actualizar tabla
    var table = $("#prior_proy_table");
    var count = $('#prior_proy_table tr').length;

    for (var x = 1; x < count; x++) {
        $("#prior_proy_table tr:last").remove();
    }

    propuestas.forEach(function(propuesta) {
        table.append("<tr><td style='padding-top:15px;padding-left:50px;'>" + propuesta.titulo + "</td><td style='padding-top:15px;padding-left:50px;'>" + propuesta.score + "</td><td style='text-align: center; padding:10px;'><button onclick='onEvaluateButtonClick(\"" + propuesta.titulo.toString() + "\")'>Evaluar</button></td></tr>");
    });

    //Cerrar ventana
    var modal = document.getElementById("prior_proy_modal");
    modal.style.display = "none";
}

function onSaveFinanModalButtonClick() {
    var seg;

    //Guardar rrhh seleccionados para el proyecto
    var selectedRRHH = $("#rrhh_finan").val();
    //Guardar la cuantia 
    var cuantia = $("#cuantia_finan").val();
    var fInicio = $("#fecha_inicio").val();

    //Actualizar lista priorizados
    for (var i = 0; i < lista_priorizada.length; i++) {
        if (lista_priorizada[i].titulo == $("#proy_tit").val()) {
            lista_priorizada[i].cuantiaFinanciacion = cuantia;
            lista_priorizada[i].rrhh = selectedRRHH;
            lista_priorizada[i].fInicio = fInicio;

            //Cambiar el estado del proyecto
            if (seg = $("#seguimiento").val()) {
                lista_priorizada[i].seguimiento = seg;
            }
        }
    }

    //Borrar propuestas

    //Actualizar session storage
    sessionStorage.setItem('lista_priorizada', JSON.stringify(lista_priorizada));
    alert("El proyecto se ha financiado exitosamente");

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

//Informe Rechazar Lista
function onSendRejectionButtonClick() {
    //Cambiar a fase 3.1
}