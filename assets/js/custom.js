//Ajax&API 

function buscarDefinicion () {

	$("#resultado").html("");
	var busqueda = $("#inputSearch").val();
	var definicion = 0;

	$.ajax({
      type: "GET",
	  url: `https://es.wikipedia.org/api/rest_v1/page/summary/${busqueda}`,
	  dataType: "json",
	  success: (response) => {

	  	definicion = response.extract;
	  	console.log(definicion);
	  }
	}).done (function (resultadoJson){

		$("#resultado").append(definicion);
		$("#resultado").css("background-color", "#263d4d");
		$("#resultado").css("color", "white");
	})
}

$("#botonSearch").click(buscarDefinicion);
$("#inputSearch").on('keypress', tecla);

function tecla (e) {
	if(e.which == 13) {
        buscarDefinicion();
    }
}

//Opciones desplegables

var instrumento =$("#selectInstrumentos");

$("#selectInstrumentos").change (mostrarTipoInstrumento);
$("#selectInstrumentos").change (cargarTipoInstrumento);

function mostrarTipoInstrumento () {

	$("#divTipoInstrumento").fadeIn(1000);
}
	
function cargarTipoInstrumento () {
	$("#tipoInstrumento").html("");

	if (instrumento.val() == "guitarras") {
		console.log("guitarra")

		$("#tipoInstrumento").append("<option value='clasica'>Guitarra Clásica</option>");
		$("#tipoInstrumento").append("<option value='acustica'>Guitarra Acústica</option>");


	} else if (instrumento.val()=="ukeleles") {
		
		$("#tipoInstrumento").append("<option value='soprano''>Ukelele Soprano</option>");
		$("#tipoInstrumento").append("<option value='tenor'>Ukelele Tenor</option>");
		$("#tipoInstrumento").append("<option value='baritono'>Ukelele Barítono</option>");

	}
}

var metodo = $("#metodo");


$("#metodo").change (function () {
	$("#cuotas").html("")

	function mostrarCuotas () {

	$("#cuotas").fadeIn(1000);
}

	if (metodo.val() == "credito") {
		console.log("Eligió crédito")

		mostrarCuotas ();

		$("#cuotas").append("<option value='1'>1 cuota sin interés</option>");
		$("#cuotas").append("<option value='3'>3 cuotas sin interés</option>");
		$("#cuotas").append("<option value='6'>6 cuotas sin interés</option>");
		$("#cuotas").append("<option value='9'>9 cuotas</option>");
		$("#cuotas").append("<option value='12'>12 cuotas</option>");

	} if (metodo.val() == "debito" || metodo.val() == "efectivo") {
			$("#cuotas").fadeOut(500);
	}
});

//Storage y JSON

var nombre = 0;
var apellido = 0;
var email = 0;
var telefono = 0;

function Cliente (nombre, apellido, email, telefono) {
	this.nombre = nombre;
	this.apellido = apellido;
	this.email = email;
	this.telefono = telefono;
}

$("#presupuesto").submit (function () {

var nombre = document.getElementById("nombre").value;
var apellido = document.getElementById("apellido").value;
var email = document.getElementById("emailpresupuesto").value;
var telefono = document.getElementById("telefono").value;

var cliente = new Cliente (nombre, apellido, email, telefono);
localStorage.setItem("Cliente", JSON.stringify(cliente));

console.log (cliente);
})

//Cálculos


var precioMateriales = 0;

$("#presupuesto").submit (function () {

	precioMateriales = 0;

	var tapa = $("#tapa").val();
	var fondo = $("#fondo").val();
	var diapason = $("#diapason").val();
	var cabeza = $("#cabeza").val();
	var mango = $("#mango").val();
	var puente = $("#puente").val();

	if (tapa == "abeto" || tapa == "cedro") {

		precioMateriales += 4300;
	}

	if (tapa == "sitka") {

		precioMateriales += 2700;
	}

	if (fondo == "brasil") {

		precioMateriales += 23300;		
	}

	if (fondo == "india") {

		precioMateriales += 10000;		
	}

	if (fondo == "maple") {

		precioMateriales += 4700;		
	}

	if (fondo == "cipres") {

		precioMateriales += 3200;		
	}
	
	if (fondo == "moradillo" || fondo == "bolivia") {

		precioMateriales += 4200;		
	}

	if (fondo == "caoba") {

		precioMateriales += 2100;		
	}

	if (fondo == "guayubira") {

		precioMateriales += 1300;		
	}

	if (fondo == "algarrobo") {

		precioMateriales += 1000;		
	}

	if (fondo == "nogal") {

		precioMateriales += 800;	
	}

	if (diapason == "ebano") {

		precioMateriales += 2000;		
	}

	if (diapason == "india") {

		precioMateriales += 1500;		
	}

	if (diapason == "moradillo") {

		precioMateriales += 870;		
	}

	if (diapason == "bolivia") {

		precioMateriales += 820;		
	}

	if (diapason == "nogal") {

		precioMateriales += 360;		
	}
	

	if (cabeza == "brasil") {

		precioMateriales += 900;		
	}

	if (cabeza == "ebano" || cabeza == "india") {

		precioMateriales += 600;		
	}

	if (cabeza == "bolivia") {

		precioMateriales += 200;		
	}

	if (cabeza == "nogal") {

		precioMateriales += 100;		
	}

	if (mango == "cedro") {

		precioMateriales += 500;
	}

	if (puente == "brasil") {

		precioMateriales += 900;
	}

	if (puente == "ebano" || puente == "india") {

		precioMateriales += 600;
	}

	if (puente == "bolivia") {

		precioMateriales += 200;
	}

	if (puente == "nogal") {

		precioMateriales += 100;
	} if (tapa == "" || fondo == "" || diapason == "" || cabeza == "" || mango == "" || puente == "") {
		$("#resultadoPresupuesto").append("<p> Por favor complete todos los campos</p>")
	}


	console.log("El precio de los materiales es de $" + precioMateriales);

});

$("#presupuesto").submit (mostrarPresupuesto);

function mostrarPresupuesto () {
	$("#resultadoPresupuesto").fadeIn (2000);
}

$("#presupuesto").submit (function () {

	$("#resultadoPresupuesto").html("");
	var tipoDeInstrumento = $("#tipoInstrumento").val();
	var presupuesto = 0;
	var cuotas = parseInt($("#cuotas").val());


	if ((precioMateriales > 10000 && tipoDeInstrumento == "clasica") || (precioMateriales > 10000 && tipoDeInstrumento == "acustica")) {

		presupuesto = precioMateriales*5;
		$("#resultadoPresupuesto").append(`<p> El costo por este instrumento es de $${presupuesto}`);

	}else if ((precioMateriales < 10000 && tipoDeInstrumento == "clasica") || (precioMateriales < 10000 && tipoDeInstrumento =="acustica")) {

		presupuesto = precioMateriales*8;
		$("#resultadoPresupuesto").append(`<p> El costo por este instrumento es de $${presupuesto}`);

	}else if ((precioMateriales > 13000 && tipoDeInstrumento == "tenor") ||(precioMateriales > 10000 && tipoDeInstrumento == "baritono") ) {

		presupuesto = precioMateriales*1.75;
		$("#resultadoPresupuesto").append(`<p> El costo por este instrumento es de $${presupuesto}`);

	}else if ((precioMateriales < 13000 && tipoDeInstrumento == "tenor") || (precioMateriales < 10000 && tipoDeInstrumento == "baritono")) {

		presupuesto = precioMateriales*2.16;
		$("#resultadoPresupuesto").append(`<p> El costo por este instrumento es de $${presupuesto}`);
	} else if (precioMateriales > 7000 && tipoDeInstrumento =="soprano") {
		presupuesto = precioMateriales*2;
		$("#resultadoPresupuesto").append(`<p> El costo por este instrumento es de $${presupuesto}`);
	} else if (precioMateriales < 7000 && tipoDeInstrumento =="soprano") {
		presupuesto = precioMateriales*2.6
		$("#resultadoPresupuesto").append(`<p> El costo por este instrumento es de $${presupuesto}`);
	}
	else {
		$("#resultadoPresupuesto").append(`<p> Por favor elija un instrumento</p>`);
	}

	if (cuotas == "9" || cuotas == "12") {

		presupuestoConInteres = presupuesto*1.55;

		$("#resultadoPresupuesto").html("");
		$("#resultadoPresupuesto").append(`<p> El costo por este instrumento es de $${presupuestoConInteres}`);
	}

	console.log("El precio final es de $" + presupuesto);

	if (metodo.val() == "credito") {

		if (cuotas == "1" || cuotas == "3" || cuotas == "6") {
			var cuotaFija = presupuesto/cuotas;
			$("#resultadoPresupuesto").append(`<p>, a pagar en ${cuotas} cuotas de $${cuotaFija}</p>`);
		} else {
			var cuotaInteres = presupuestoConInteres/cuotas;
			$("#resultadoPresupuesto").append(`<p>, a pagar en ${cuotas} cuotas de $${cuotaInteres}</p>`);
		}
	} else if (metodo.val() == "efectivo" || metodo.val() == "debito") {

		var anticipo = presupuesto/2;
		$("#resultadoPresupuesto").append(`<p>, pagando un anticipo de ${anticipo} </p>`);

	}

	console.log(cuotaInteres);
});


$("#borrar").click(function(){

	$("#resultadoPresupuesto").fadeOut(2000)
	});
