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
    * XMLHttpRequest de sintomenos
    */    
    var request_sintomenos;
    var mi_incidencia;
    /*
    * Funcion principal para chequear todas las sintomenos
    */
    function get_sintomenos(incidencia) {
       var url_sintomenos = "php/sintomas.php";
       mi_incidencia=incidencia;
       httpRequest_sintomenos("POST", url_sintomenos, true, incidencia);
      
       }

    /*
    * Manejo del XMLHttpRequest
    */
    function handleResponse_sintomenos() {
       if (request_sintomenos.readyState == 4) {
          if (request_sintomenos.status == 200) { 
                var sintomenos = request_sintomenos.responseText;
                var sintomenos_array = sintomenos.split("}"); 
                var altura=120;
                var mensaje=""; 
                var nu=1;
                for (i = 0; i < sintomenos_array.length - 1; i++) {                    
                    sintomenos_array[i] = sintomenos_array[i] + "}";   
                    var func = new Function("return " + sintomenos_array[i]);
                    var objt = func();    
                    if (nu==1) { 
                      
                       mensaje=mensaje+"<div style=\"text-align:center; \"><big><big><b>Nº: <big>";
                       mensaje=mensaje+objt.IDIncidencia+"</big></b></big></big></div><br>"; 
                       mensaje=mensaje+"<form method=\"post\" action=\"api/sintomas.php\"><select name=\"IDSintoma\">";
                       nu=0;
                    }       
                    mensaje=mensaje+parsear_sintomenos(objt);
                }
                var func = new Function("return " + sintomenos_array[0]);
                var objt = func();
                mensaje=mensaje+"</select>";
                mensaje=mensaje+"<select style=\"visibility:hidden\" name=\"IDIncidencia\">";           
                mensaje=mensaje+"<option value=\""+objt.IDIncidencia+"\" selected=\"selected\">Desconocida</option></select>";             
                mensaje=mensaje+"<select style=\"visibility:hidden\" name=\"accion\">";            
                mensaje=mensaje+"<option value=\"menos\" selected=\"selected\">Desconocida</option></select>"; 
                mensaje=mensaje+"<input type=\"submit\" name=\"submit\" value=\"Enviar\"/></form>"; 
                popUp2_menos(mensaje,mi_incidencia,altura); 
          } 
       }
    }
    function parsear_sintomenos(objt){
        return "<option value=\""+objt.IDsintoma+"\" >"+objt.sintoma.toUpperCase()+"</option>"; 
    }
   

    function popUp_menos(mensaje) {      
         var page = window.open('','sintomenos','toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no,width=350,height=400,left=212,top=184');
         page.document.write("");
         page.document.close();
         var page = window.open('','sintomenos','toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no,width=350,height=400,left=212,top=184');
         page.document.write(mensaje);
         page.document.close();
    }
    function popUp2_menos(mensaje,incidencia,altura) {
        var win = new Window({className: "alphacube", title: "quitar sintoma", width:340, height:altura, wiredDrag: true,resizable: false, minimizable:false,maximizable:false});
        win.getContent().innerHTML = mensaje;
        win.setDestroyOnClose();
        //win.setLocation(100+incidencia, 100+incidencia);
        win.show();
        win.toFront();
    }
    /*
    * Determina el tipo de explorador con el que se trabaja e instancia XMLHttpRequest en consecuencia
    */
    function httpRequest_sintomenos(reqType, url_sintomenos, asynch, incidencia) {
       if (window.XMLHttpRequest) {
          request_sintomenos = new XMLHttpRequest;
          }
       else if (window.ActiveXObject) {
          request_sintomenos = new ActiveXObject("Microsoft.XMLHTTP");
          }
       if (request_sintomenos) {
          initReq_sintomenos(reqType, url_sintomenos, asynch,incidencia);
          }
       else {
          alert("Your browser does not permit the use of all of this application's features!");
          }
       }

    /*
    * Inicializacion del objeto XMLHttpRequest
    */
    function initReq_sintomenos(reqType, url_sintomenos, bool, incidencia) {
       request_sintomenos.onreadystatechange = handleResponse_sintomenos;
       request_sintomenos.open(reqType, url_sintomenos, bool);
       request_sintomenos.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
       request_sintomenos.send("idincidencia=" + incidencia);
      
       }



