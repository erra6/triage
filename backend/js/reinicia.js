/**
* Panel control encierro
*
* @package front
* @version 1.3.0.1
* @author jonlegarrea@gmail.com
* copyright Jon Legarrea
*
**/
    window.onload=inicio;   

    function inicio(){          
        alert("NUNCA se debe hacer esto en medio de un operativo en marcha, reiniciar se encarga de \"limpiar/archivar\" los datos de un operativo anterior,  no hacer esto salvo que se este seguro de lo que se hace.");
    } 

    function valida(form) {  
           
         if( form.reiniciar.value == -1 ) {  
                alert("Debe seleccionar en el formulario el apartado que quiere reiniciar \"Estados puestos\" o \"Incidencias\"");
                return false;
         }        
           
    } 
