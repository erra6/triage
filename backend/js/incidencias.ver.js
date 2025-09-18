/**
* Panel control encierro
*
* @package front
* @version 1.3.0.1
* @author jonlegarrea@gmail.com
* copyright Jon Legarrea
*
**/
    /*
    * XMLHttpRequest de incidencias
    */    
    var request_incidencias;
    
    /*
    * Funcion principal para chequear todas las incidencias
    */
    function get_incidencias() {
       var url_incidencias = "php/incidencias.php";
       httpRequest_incidencias("GET", url_incidencias, true);
       }

    /*
    * Manejo del XMLHttpRequest
    */
    function handleResponse_incidencias() {
       if (request_incidencias.readyState == 4) {
          if (request_incidencias.status == 200) {
             var word = request_incidencias.responseText;
             var word_array = word.split("}");
             var num_incidencias=new Array(0,0,0,0,0,0,0,0);
             var divinci = document.getElementById("incidencias");
           
             for (i = 1; i < 9; i++) {
                var div = document.getElementById("incidencias" + i);                
                div.innerHTML = "";
                }            
            divinci.innerHTML="";
            divinci.style.visibility = 'hidden';
        
             for (i = 0; i < word_array.length - 1; i++) {
                word_array[i] = word_array[i] + "}";
                var func = new Function("return " + word_array[i]);
                var objt = func();
                var div = document.getElementById("incidencias" + objt.IDPuesto);
                if (document.getElementById("incidencia"+objt.IDIncidencia)==null){
                    num_incidencias[objt.IDPuesto-1]=num_incidencias[objt.IDPuesto-1]+1;
                    div.innerHTML = div.innerHTML + div_style_incidencias(objt);                
                    divinci.innerHTML = divinci.innerHTML + objt.IDIncidencia + ",";
                }                
             }                       
             for (i = 1; i < 9; i++) {
                document.getElementById("num_incidencias" + i).innerHTML="<small>Nº Incidencias: "+num_incidencias[i-1]+"</small>";                
             }                 
          }          
       }
    }

    /*
    * Formatea en HTML las incidencias
    */
    function div_style_incidencias(objt) {
        var text;
        var organiza="<div>&nbsp;</div>";
        var indiambu="<div>&nbsp;</div>";
        var tracking_color;
        var tracking_label;
       
       /*
       * Definir segun tracking color del recuadro y estado traking
       */
       if (objt.IDTracking == 1) {
          tracking_color = "yellow1";
          tracking_label = "Solicitada";
          }
       else if (objt.IDTracking == 2) {
          tracking_color = "yellow2";
          tracking_label = "Asignada";
          }
       else if (objt.IDTracking == 3) {
          tracking_color = "yellow3";
          tracking_label = "P.enterado";
          }
       else if (objt.IDTracking == 4) {
          tracking_color = "yellow4";
          tracking_label = "En puesto";
          }
       else if (objt.IDTracking == 5) {
          tracking_color = "yellow5";
          tracking_label = "Cargada";
          }
       else if (objt.IDTracking == 6) {
          tracking_color = "orange1";
          tracking_label = "C.sanitario";
          }
       else if (objt.IDTracking == 8) {
          tracking_color = "blue1";
          tracking_label = "Anulando";
          }
        /*
        * Contenedor principal
        */
        text = "<div id=\"incidencia"+objt.IDIncidencia+"\" class=\"" + tracking_color + "\">";
       
        /*
        * Flecha izquierda
        */
        var atras=parseInt(objt.IDTracking)-1;
        text=text+"<div class=\"estadorow\" ><div class=\"left larrow\">";
        text=text+"</div>";

        /*
        * Titulo estado incidencia
        */
        if (objt.IDTracking != null) {
           text = text + "<div class=\"estado\" title=\"Estado\"><b>" + tracking_label.toUpperCase() + "</b></div>";
        }

        /*
        * Flecha derecha
        */
        var alante=parseInt(objt.IDTracking)+1; 
        text=text+"<div class=\"left rarrow\" >";
        text=text+"</div></div>";

        /*
        * Subcontenedor
        */
        text = text + "<div style=\"margin-left:4px\">";

        /*
        * Logos ambulancia y hospital
        */
        text = text + "<div class=\"left\">";
        if (objt.organizacion != null) {
            organiza = objt.organizacion.substring(0,9);
				if(organiza.search("Cruz Roja")!=-1){
				 	text = text + "<div><img class=\"ambu\" src=\"images/ambuCR.gif\" alt=\"Logotipo Ambulancia\" title=\"Ambulancia\" /></div>";
				}
				if(organiza.search("DYA")!=-1){
						text = text + "<div><img class=\"ambu\" src=\"images/ambuDYA.gif\" alt=\"Logotipo Ambulancia\" title=\"Ambulancia\" /></div>";
				}
				if((organiza.search("Cruz Roja")==-1)&&(organiza.search("DYA")==-1)){
				 		text = text + "<div><img class=\"ambu\" src=\"images/ambu2.gif\" alt=\"Logotipo Ambulancia\" title=\"Ambulancia\" /></div>";
				}
		}
	    //text = text + "<div><img src=\"images/ambu.gif\" alt=\"Logotipo Ambulancia\" title=\"Ambulancia\" /></div>";
	    //text = text + "<div><img src=\"images/hospi.gif\" alt=\"Logotipo Hospital\" title=\"Hospital\" /></div></div>";
        text = text + "<div>Nº:</div><div>"+objt.IDIncidencia+"</div></div>";
        
        /*
        * Desplegable de seleccion de ambulancia
        */
        text = text + "<div class=\"left\" style=\"margin-left:3px;\"><div>";
        text = text + "<div title=\"Selección de ambulancia\">";
        if (objt.IDAmbulancia !=null){
            text = text + "<div>"+objt.IndicativoSOS+"</div>";
        }else{
            text = text + "<div> </div>"; 
        }       
        text=text +"</div>";

        /*
        * Desplegable de seleccion de ambulancia
        */
        text = text + "<div title=\"Selección de hospital\">";
        if (objt.IDHospital!=null){
            text = text + "<div>"+objt.hospital+"</div>";
        }else{
            text = text + "<div> </div>"; 
        } 
        text = text + "</div></div>";

        /*
        * Organizacion de la ambulancia
        */
        if (objt.organizacion != null) {
            organiza = objt.organizacion.substring(0,9);
         /*   if(organiza.search("Cruz Roja")!=-1){
                organiza="<div class=\"red\"><b>Cruz Roja</b></div>";
            }else{
                organiza="<div>"+organiza+"</div>";
            }*/
        }
        text = text + "<div><div id=\"organizacion"+objt.IDIncidencia+"\"><small>"+organiza+"</small></div>";
        /*
        * Indicativo de la ambulancia
        */
        if (objt.indicativoAmbulancia != null) {
            indiambu = objt.indicativoAmbulancia;
            if(organiza.search("Cruz Roja")!=-1){
                indiambu="<div class=\"red\"><b>"+objt.indicativoAmbulancia+"</b></div>";
            }else{
                indiambu="<div>"+objt.indicativoAmbulancia+"</div>";
            }
        }       
      	text = text + "<div id=\"indicativo"+objt.IDIncidencia+"\"><small>"+indiambu+"</small></div></div></div>";

        /*
        * Alinear parte inferior
        */
        text = text +"<div class=\"clearingBR\"></div>";   
       
        /*
        * Boton cancelacion incidencia
        */
        text = text + "<div style=\"margin-top:3px\">";
        
        /*
        * Enlace para ver los sintomas
        */
        if (objt.IDLesion!=null){
            text = text + "<div class=\"left left5\" onclick=\"get_sintomas("+objt.IDIncidencia+")\">";
            text = text + "<img src=\"images/sintomas.gif\" alt=\"Boton sintomas\" title=\"Ver sintomas\" /></div></div>";
        }else{
            text = text + "<div class=\"left left10 grey\"><small>SINTOMAS</small></div></div>";
        }
            text=text+"</div></div>";
    
        return text;
    }
   
    
    /*
    * Determina el tipo de explorador con el que se trabaja e instancia XMLHttpRequest en consecuencia
    */
    function httpRequest_incidencias(reqType, url_incidencias, asynch) {
       if (window.XMLHttpRequest) {
          request_incidencias = new XMLHttpRequest;
          }
       else if (window.ActiveXObject) {
          request_incidencias = new ActiveXObject("Microsoft.XMLHTTP");
          }
       if (request_incidencias) {
          initReq_incidencias(reqType, url_incidencias, asynch);
          }
       else {
          alert("Your browser does not permit the use of all of this application's features!");
          }
       }

    /*
    * Inicializacion del objeto XMLHttpRequest
    */
    function initReq_incidencias(reqType, url_incidencias, bool) {
       request_incidencias.onreadystatechange = handleResponse_incidencias;
       request_incidencias.open(reqType, url_incidencias, bool);
       request_incidencias.send(null);
       }



