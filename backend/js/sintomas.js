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
    * XMLHttpRequest de sintomas
    */    
    var request_sintomas;
    var mi_incidencia;
    /*
    * Funcion principal para chequear todas las sintomas
    */
    function get_sintomas(incidencia) {
       var url_sintomas = "php/sintomas.php";
       mi_incidencia=incidencia;
       httpRequest_sintomas("POST", url_sintomas, true, incidencia);
      
       }

    /*
    * Manejo del XMLHttpRequest
    */
    function handleResponse_sintomas() {
       if (request_sintomas.readyState == 4) {
          if (request_sintomas.status == 200) { 
                var sintomas = request_sintomas.responseText;
                var sintomas_array = sintomas.split("}"); 
                var altura=370;
                var mensaje=""; 
                var nu=1;
                for (i = 0; i < sintomas_array.length - 1; i++) {
                    altura=altura+80;
                    sintomas_array[i] = sintomas_array[i] + "}";   
                    var func = new Function("return " + sintomas_array[i]);
                    var objt = func();    
                    if (nu==1) { 
                      
                       mensaje=mensaje+"<div style=\"text-align:center; \"><big><big><b>Nº: <big>";
                       mensaje=mensaje+objt.IDIncidencia+"</big></b></big></big></div><br>";   
                       nu=0;
                    }       
                    mensaje=mensaje+parsear_sintomas(objt);
                }
                var func = new Function("return " + sintomas_array[0]);
                var objt = func();
                mensaje=mensaje+parsear_resto(objt);
                popUp2(mensaje,mi_incidencia,altura); 
          } 
       }
    }
    function parsear_sintomas(objt){
        var text="";       
        if (objt.anatomia!="comun"){ 
          text="<big><b>"+objt.sintoma.toUpperCase()+"</b></big><br>";                
          text=text+"Causa: "+objt.causa+"<br>";
          var lugar=objt.anatomia.replace("hombre","");
          lugar=lugar.replace("mujer","");
          var parte="";
          if(objt.anatomia.search("delantera")!=-1){
              parte="delantera";
              lugar=lugar.replace("delantera","");
          }  
          if(objt.anatomia.search("trasera")!=-1){
              parte="trasera";
              lugar=lugar.replace("trasera","");
          }
          if (parte!="") text=text+"Parte: "+parte+"<br>";
          text=text+"Lugar: "+lugar+"<br>";
          text=text+"<br>";        
    }else{
      if(objt.IDsintoma==4 || objt.IDsintoma==14 || objt.IDsintoma==21 || objt.IDsintoma==22 || objt.IDsintoma==23 || objt.IDsintoma==24){
        if (objt.IDsintoma==23) text=text+"<div class=\"red\">";
        text=text+"<big><big><b>"+objt.sintoma.toUpperCase()+"</b></big></big><br>";
        if (objt.IDsintoma==23) text=text+"</div>";
      }else{
        text=text+"<big><b>"+objt.sintoma.toUpperCase()+"</b></big><br>";
      }
    }
        return text;
    }
    function parsear_resto(objt){
        var text;        
        var sex;
        if(objt.sexo==0){
            sex="Mujer";
        }else{
            sex="Hombre";
        }
        text="<br>";
        text=text+"<b>Paciente</b><br>";
        text=text+"Sexo: "+sex+"<br>";
        text=text+"Edad: "+objt.tramoEdad+"<br>";


        text=text+"<br>";
        text=text+"<b>Ambulancia</b><br>";
        var tipo="";
        if(objt.tipoAmbulancia!=null){
            tipo=objt.tipoAmbulancia;
        }
        text=text+"Tipo: "+tipo+"<br>";
        var IndicativoSOS="*por asignar*";
        if(objt.IndicativoSOS!=null){
            IndicativoSOS=objt.IndicativoSOS;
        }
        text=text+"Ambulancia: "+IndicativoSOS+"<br>";
        var organizacion="";
        if(objt.organizacion!=null){
            organizacion=objt.organizacion;
        }        
        text=text+"Organización: "+organizacion+"<br>";
        text=text+"Estado: "+objt.tracking+"<br>";
        text=text+"<br>";
        text=text+"<b>Ruta</b><br>";
        var hospi="*por asignar*";
        if (objt.hospital!=null){
            hospi=objt.hospital;
        }                
        text=text+"Puesto: "+objt.nombre+"<br>";
        text=text+"Hospital: "+hospi+"<br>";
        text=text+"<br>";
        text=text+"<b>Numero Incidencia:</b>";
        text=text+objt.IDIncidencia;
        text=text+"<br>";
        return text;    
    }
  

    function popUp(mensaje) {      
         var page = window.open('','Sintomas','toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no,width=350,height=400,left=212,top=184');
         page.document.write("");
         page.document.close();
         var page = window.open('','Sintomas','toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no,width=350,height=400,left=212,top=184');
         page.document.write(mensaje);
         page.document.close();
    }
    function popUp2(mensaje,incidencia,altura) {
        var win = new Window({className: "alphacube", title: "Sintomas", width:220, height:altura, wiredDrag: true,resizable: false, minimizable:false,maximizable:false});
        win.getContent().innerHTML = mensaje;
        win.setDestroyOnClose();
        //win.setLocation(100+incidencia, 100+incidencia);
        win.show();
        win.toFront();
    }
    /*
    * Determina el tipo de explorador con el que se trabaja e instancia XMLHttpRequest en consecuencia
    */
    function httpRequest_sintomas(reqType, url_sintomas, asynch, incidencia) {
       if (window.XMLHttpRequest) {
          request_sintomas = new XMLHttpRequest;
          }
       else if (window.ActiveXObject) {
          request_sintomas = new ActiveXObject("Microsoft.XMLHTTP");
          }
       if (request_sintomas) {
          initReq_sintomas(reqType, url_sintomas, asynch,incidencia);
          }
       else {
          alert("Your browser does not permit the use of all of this application's features!");
          }
       }

    /*
    * Inicializacion del objeto XMLHttpRequest
    */
    function initReq_sintomas(reqType, url_sintomas, bool, incidencia) {
       request_sintomas.onreadystatechange = handleResponse_sintomas;
       request_sintomas.open(reqType, url_sintomas, bool);
       request_sintomas.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
       request_sintomas.send("idincidencia=" + incidencia);
      
       }



