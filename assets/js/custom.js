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
		$("#cuotas").append("<option value='6'>6 cuotas</option>");
		$("#cuotas").append("<option value='9'>9 cuotas</option>");
		$("#cuotas").append("<option value='12'>12 cuotas</option>");

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

var precioMateriales = 0;

$("#presupuesto").submit (function () {

	var tapa = $("#tapa").val();
	var fondo = $("#fondo").val();
	var diapason = $("#diapason").val();
	var cabeza = $("#cabeza").val();
	var mango = $("#mango").val();
	var puente = $("#puente").val();

	if (tapa == "abeto" || "cedro") {

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
	
	if (fondo == "moradillo" || "bolivia") {

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

	if (cabeza == "ebano" || "india") {

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

	if (puente == "ebano" || "india") {

		precioMateriales += 600;
	}

	if (puente == "bolivia") {

		precioMateriales += 200;
	}

	if (puente == "nogal") {

		precioMateriales += 100;
	}


	console.log("El precio de los materiales es de $" + precioMateriales);

});

$("#presupuesto").submit (mostrarPresupuesto);

function mostrarPresupuesto () {
	$("#resultadoPresupuesto").fadeIn (2000);
}

$("#presupuesto").submit (function () {

	var tipoDeInstrumento = $("#tipoInstrumento").val();
	var presupuesto = 0;

	if (precioMateriales > 10000 && tipoDeInstrumento == "clasica" || "acustica") {

		presupuesto = precioMateriales*10;
	}else if (precioMateriales < 10000 && tipoDeInstrumento == "clasica" || "acustica") {

		presupuesto = precioMateriales*12;
	}else if (precioMateriales > 10000 && tipoDeInstrumento == "tenor") {

		presupuesto = precioMateriales*5;
	}else if (precioMateriales < 10000 && tipoDeInstrumento == "tenor") {

		presupuesto = precioMateriales*8;
	} else {
		presupuesto = precioMateriales*7.2;
	}

	console.log("El precio final es de $" + presupuesto);

	$("#resultadoPresupuesto").append(presupuesto);
});

$("#borrar").click(function(){

	$("#resultadoPresupuesto").fadeOut(2000)
	});
