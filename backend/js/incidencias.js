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
    * MysqlDateToJavascriptDate
    */  

Date.createFromMysql = function(mysql_string)
{ 
   var t, result = null;

   if( typeof mysql_string === 'string' )
   {
      t = mysql_string.split(/[- :]/);
      //when t[3], t[4] and t[5] are missing they defaults to zero
      result = new Date(t[0], t[1] - 1, t[2], t[3] || 0, t[4] || 0, t[5] || 0);          
   }

   return result;   
}



function pad(number) {
    var result = "" + number;
    if (result.length < 2) {
        result = "0" + result;
    }
    return result;
}

function millisToDaysHoursMinutes(millis) {
    var seconds = millis / 1000;
    var totalMinutes = seconds / 60;
    var days = Math.floor(totalMinutes / 1440);
    totalMinutes -= 1440 * days;
    var hours = Math.floor(totalMinutes / 60);
    totalMinutes -= hours * 60; 
    var minutes = Math.floor(totalMinutes);
    totalMinutes -= minutes;
    var totalSeconds = Math.floor(totalMinutes*60)
    var dtext="";
    if (days>0){
        dtext=days + "d" + pad(hours) + "h" + pad(minutes)+ "m";
    }else{
        dtext=pad(hours) + "h" + pad(minutes)+ "m"+ pad(totalSeconds)+ "s";
    }

    return dtext;
}


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
	   var w = window.innerWidth-360+"px";
       if (request_incidencias.readyState == 4) {
          if (request_incidencias.status == 200) {
             var word = request_incidencias.responseText;
             var word_array = word.split("}");
             var num_incidencias=new Array(0,0,0,0,0,0,0,0);
             var divinci = document.getElementById("incidencias");
           
             for (i = 1; i < 7; i++) {
                var div = document.getElementById("incidencias" + i);
                div.style.width = w;
                div.innerHTML = "";
                }            
            divinci.innerHTML="";
            divinci.style.visibility = 'hidden';
        
             for (i = 0; i < word_array.length - 1; i++) {
                word_array[i] = word_array[i] + "}";
                var func = new Function("return " + word_array[i]);
                var objt = func();
		if (objt.IDPuesto >= 1 && objt.IDPuesto <= 6) {
                	var div = document.getElementById("incidencias" + objt.IDPuesto);                
                	if (document.getElementById("incidencia"+objt.IDIncidencia)==null){
                   		num_incidencias[objt.IDPuesto-1]=num_incidencias[objt.IDPuesto-1]+1;
                    	div.innerHTML = div.innerHTML + div_style_incidencias(objt);
                    	divinci.innerHTML = divinci.innerHTML + objt.IDIncidencia + ",";  
                	}              
		}
                                
             }  
             get_ambulancias();   
             get_hospitales();                       
            /* for (i = 1; i < 6; i++) {
                document.getElementById("num_incidencias" + i).innerHTML="<small>Nº Incidencias: "+num_incidencias[i-1]+"</small>";                
             }*/                 
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
          tracking_label = "Evacuada";
          }
       else if (objt.IDTracking == 6) {
          tracking_color = "orange1";
          tracking_label = "C.sanitario";
          }
       else if (objt.IDTracking == 7) {
          tracking_color = "white1";
          tracking_label ="Tramitada";
       }

       else if (objt.IDTracking == 8) {
          tracking_color = "blue1";
          tracking_label = "Anulando";
          }
       else if (objt['IDTracking'] == 10) {
          tracking_color = "blue1";
          tracking_label = "Anulada";
          }
        /*
        * Contenedor principal
        */
        text = "<div id=\"incidencia"+objt.IDIncidencia+"\" class=\"" + tracking_color + "\">";


        //text = text + "<div style=\"margin-left:10px;\">Tartem <big><b>"+objt.IDIncidencia+"</b></big></div>";
		text+="<div><div class=\"cuadro cuadro_"+objt.IDColor+"\"><small>TARTEM</small> <big><b>"+objt['IDIncidencia']+"</b></big> </div></div>";
        /*
        * Flecha izquierda
        */
        var atras=parseInt(objt.IDTracking)-1;
        if(atras!=7){
			if(atras!=9){
				text=text+"<div class=\"estadorow\" ><div class=\"left left3 larrow\" onclick=\"get_calltracking("+atras+","+objt.IDIncidencia+")\">";
				text=text+"<img src=\"images/iz.gif\" alt=\"flecha izq\" title=\"Retroceder ESTADO\"></img></div>";
			}else{
				text=text+"<div class=\"estadorow\" ><div class=\"left left3 larrow\"></div>";
			}
		}else{
			text=text+"<div class=\"estadorow\" ><div class=\"left left3 larrow\"></div>";
		}
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
        if(alante!=8){if(alante!=9){if(alante!=11){
			text=text+"<div class=\"left rarrow\"  onclick=\"get_calltracking("+alante+","+objt.IDIncidencia+")\" >";
			text=text+"<img src=\"images/de.gif\" alt=\"flecha der\" title=\"Avanzar ESTADO\"></img></div></div>";
		}}}
        /*
        * Subcontenedor
        */
        text = text + "<div style=\"margin-left:4px\">";

        /*
        * Logos ambulancia y hospital
        */
        text = text + "<div class=\"left\">";

    if (objt.organizacion != null) {
            organiza = objt.organizacion;
				if(organiza.search("USVA ARAN")!=-1){
				 	text = text + "<div><img class=\"ambu\" src=\"images/1_USVA_ARAN.png\" alt=\"Logotipo Ambulancia\" title=\"Ambulancia\" /></div>";
				}
				if(organiza.search("USVB ARAN")!=-1){
						text = text + "<div><img class=\"ambu\" src=\"images/2_USVB_ARAN.png\" alt=\"Logotipo Ambulancia\" title=\"Ambulancia\" /></div>";
				}
				if(organiza.search("HELICOPTERO ARAN")!=-1){
				 	text = text + "<div><img class=\"ambu\" src=\"images/3_HELICOPTERO_ARAN.png\" alt=\"Logotipo Ambulancia\" title=\"Ambulancia\" /></div>";
				}
				if(organiza.search("USVA SEM")!=-1){
				 	text = text + "<div><img class=\"ambu\" src=\"images/4_USVA_SEM.png\" alt=\"Logotipo Ambulancia\" title=\"Ambulancia\" /></div>";
				}
				if(organiza.search("USVB SEM")!=-1){
				 	text = text + "<div><img class=\"ambu\" src=\"images/5_USVB_SEM.png\" alt=\"Logotipo Ambulancia\" title=\"Ambulancia\" /></div>";
				}
				if(organiza.search("HELICOPTERO SEM")!=-1){
				 	text = text + "<div><img class=\"ambu\" src=\"images/6_HELICOPTERO_SEM.png\" alt=\"Logotipo Ambulancia\" title=\"Ambulancia\" /></div>";
				}
				if(organiza.search("HELICOPTERO BOMBERS")!=-1){
				 	text = text + "<div><img class=\"ambu\" src=\"images/7_HELICOPTERO_BOMBERS.png\" alt=\"Logotipo Ambulancia\" title=\"Ambulancia\" /></div>";
				}
				if(organiza.search("HELICOPTERO GC")!=-1){
				 	text = text + "<div><img class=\"ambu\" src=\"images/8_HELICOPTERO_ GC.png\" alt=\"Logotipo Ambulancia\" title=\"Ambulancia\" /></div>";
				}
				if(organiza.search("USVB SAMU FRANCIA")!=-1){
				 	text = text + "<div><img class=\"ambu\" src=\"images/9_USVB_SAMU_FRANCIA.png\" alt=\"Logotipo Ambulancia\" title=\"Ambulancia\" /></div>";
				}
				if(organiza.search("HELICOPTERO FRANCIA")!=-1){
				 	text = text + "<div><img class=\"ambu\" src=\"images/10_HELICOPTERO_SAMU_FRANCIA.png\" alt=\"Logotipo Ambulancia\" title=\"Ambulancia\" /></div>";
				}
			
		}
        text = text + "</div></div>";

        
        /*
        * Desplegable de seleccion de ambulancia
        */
        text = text + "<div class=\"left\" style=\"margin-left:3px;\"><div><form action=\"javascript:void%200\">";
        text = text + "<div title=\"Selección de ambulancia\"><select id=\"ambulancia"+objt.IDIncidencia+"\" onChange=\"set_ambulancia(this,"+objt.IDIncidencia+")\" style=\"width:80px;height:24px;\">";
        if (objt.IDAmbulancia !=null){
            text = text + "<option value=\""+objt.IDAmbulancia+"\">"+objt.IndicativoSOS+"</option>";
        }else{
            text = text + "<option value=\"-1\">[Asignar]</option>"; 
        }       
        text=text +"</select></div>";

        /*
        * Desplegable de seleccion de ambulancia
        */
        text = text + "<div title=\"Selección de hospital\"><select id=\"hospital"+objt.IDIncidencia+"\" onChange=\"set_hospital(this,"+objt.IDIncidencia+")\" style=\"width:80px;height:24px;\">";
        if (objt.IDHospital!=null){
            text = text + "<option value=\""+objt.IDHospital+"\">"+objt.hospital+"</option>";
        }else{
            text = text + "<option value=\"-1\">[Asignar]</option>"; 
        } 
        text = text + "</select></div></form></div>";
        text = text +"</div>";

        /*
        * Alinear parte inferior
        */
        text = text +"<div class=\"clearingBR\"></div>";   
       
        /*
        * Boton cancelacion incidencia
        */
        if (objt.IDTracking == 10) {
			text = text + "<div style=\"margin-top:3px;margin-left:4px;\"><div class=\"left\" onclick=\"get_calltracking(9,"+objt.IDIncidencia;
			text = text + ")\"><img src=\"images/de.gif\" alt=\"Retomar incidencia\" title=\"Retomar incidencia\" /></div>";
		}else{
				text = text + "<div style=\"margin-top:3px\"><div class=\"left\" onclick=\"get_calltracking(10,"+objt.IDIncidencia;
				text = text + ")\"><img src=\"images/close.gif\" alt=\"Cancelar incidencia\" title=\"Cancelar incidencia\" /></div>";
		}
        
        var tdate = Date.createFromMysql(objt.time);
        var now;
        var tdiff;
        var tdateend;
        if (objt.timeend==null){
			now = new Date();
			tdiff=millisToDaysHoursMinutes(Math.abs(now-tdate));
		}else{
			tdateend = Date.createFromMysql(objt.timeend);
			tdiff=millisToDaysHoursMinutes(Math.abs(tdateend-tdate));
		}
        text = text + "</div><div style=\"margin-top:-18px; margin-left:5px; width:125px;\" class=\"left\">Hora: "+tdate.toLocaleTimeString()+"<div style=\"margin-left:8px;\">"+tdiff+"</div></div>";
        text=text+"</div></div>";
      
        return text;
    }

    /*
    * Solocita la ambulancia para una incidencia
    */
    function set_ambulancia(obj,num_inci){        
        var ambu=obj.options[obj.selectedIndex].value;
        get_callambulancia(ambu,num_inci);
        get_ambulancias();        
    }
    
    /*
    * Designa el hospital para una ambulancia
    */
    function set_hospital(obj,num_inci){
        var hospi=obj.options[obj.selectedIndex].value;
        get_callhospital(hospi,num_inci);
        get_hospitales();
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



