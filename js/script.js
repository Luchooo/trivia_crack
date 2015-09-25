$(function()
{

    var preguntas = [];
    var tiempo = 0;
    var cuentaTiempo = 30;
    var numPregunta = 2;
    var buenas=0;

    var audios = [
					{
						sonido 	: 	"final.mp3", 
						label	: 	"final"
					},
					{
						sonido 	: 	"error.mp3", 
						label	: 	"error"
					}, 
					{
						sonido 	: 	"tada.mp3", 
						label	: 	"tada"
					}, 
					{
						sonido 	: 	"reloj.mp3", 
						label	: 	"reloj"
					}
				];



//Para cargar los audios del juego...
	for(var audio = 0; audio < audios.length; audio++)
	{
		createjs.Sound.registerSound("sonidos/" + audios[audio].sonido, audios[audio].label);
		

	}

	
    var cargarJson = function()
    {

        $.getJSON( "js/preguntas.json", function(data)
        {
            preguntas = data;
            cargarPregunta();
        });
    }();

    //Para cargar la pregunta...
    var cargarPregunta = function()
    {
        cuentaTiempo = 15;
        tiempo = setInterval(function()
        {
            cuentaTiempo--;
            $("#tiempo").html(" '" + cuentaTiempo);
            if(cuentaTiempo === 0)
            {

				createjs.Sound.play("reloj");
               	swal({

							title: "Perdiste",
							text:"Tiempo Agotado",
							imageUrl : "img/reloj.gif",
							timer: 3000,
							showConfirmButton: false   
							},
					function  () {

									
									$("#base2").delay(3000).fadeOut('slow', function() 
									{
										createjs.Sound.play("reloj");
										swal({   title: "Respuestas Correctas: "+buenas, imageUrl : "img/final.gif",  showConfirmButton: false })	
									
											$("#base2").delay(4000).fadeOut('slow', function() 
											{
											location.reload();
											});		
									});
							})
            }
        }, 1000);

        $("#pregunta").html(preguntas[numPregunta].pregunta);
        //Para cargar las opciones de respuesta...
        for(var i = 1; i <= preguntas[numPregunta].opciones.length; i++)
        {
            $("#opcion_" + i).html(preguntas[numPregunta].opciones[i - 1])
            .click(function(event) {
                var ind = Number(this.id.split("_")[1]);
                validar(ind);
            });
        }
    };

    function validar (ind)
    {
        clearInterval(tiempo);
        if (ind === preguntas[numPregunta].correcta)
        {

        	createjs.Sound.play("tada");
            swal({title: "!Bien Hecho!",   type: "success"}, function ()
            {
            	buenas++;
            	 nuevo();


            });
        }
        else
        {
        	createjs.Sound.play("error");
            swal({title: "Ooops",
            text: "La respuesta correcta era: " + preguntas[numPregunta].opciones[(preguntas[numPregunta].correcta)-1] ,
            type: "error"}, function ()
            {
                nuevo();
            });
        }
        $("#titulo").html("Pregunta N°(" + numPregunta + ")");
    }

    var nuevo = function ()
    {
        if(numPregunta + 1 < preguntas.length)
        {
            numPregunta++;
            cargarPregunta();
        }




        if (numPregunta===(preguntas.length)-1) 
      {


		
	
      		cuentaTiempo=1000;
      		$("#titulo").html("");
      		

	$("#base2").delay(100).fadeOut('slow', function() 
									{
							
							createjs.Sound.play("final");
										swal({   title: "!Se han acabado las preguntas!",   type:"info",     closeOnConfirm: false,   showLoaderOnConfirm: true, }, 
											function(){   setTimeout(function(){     
														createjs.Sound.play("final");
												swal({   title: "Respuestas Correctas: "+buenas, imageUrl : "img/final.gif",  showConfirmButton: false });}, 2000); 
										$("#base2").delay(6000).fadeOut('slow', function() 
																								{


																									location.reload();

															      								});
														});

									});	


	  }
    };
});