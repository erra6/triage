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
    * XMLHttpRequest de foto
    */    
    var request_foto;
    var mi_incidencia;
    
    
   function num_color(num){
		var color="";
		switch (num) {
			case "0":
				color = 'negro';			
				break;
			case "1":
				color = 'rojo_negro';			
				break;
			case "2":
				color = 'rojo';
				break;
			case "3":
				color = 'amarillo';
				break;
			case "4":
				color = 'verde';
				break;
			} 
		return color;
	}

    
    
    /*
    * Funcion principal para chequear todas las foto
    */
    function get_foto(incidencia,idcolor) {
		
		var mensaje="<div><div class=\"cuadro cuadro_"+num_color(idcolor+'')+"\"><small>TARTEM</small> <big><b>"+incidencia+"</b></big> </div></div>";
		//mensaje+="<div><img style=\"margin-left:5px;width:600px;height:450px;\" id=\"smallImage\" src=\"\" /></div>";
		mensaje+="<div id=\"ambuimage_"+incidencia+"\"><div style=\"width:200px;margin:200px 0px 0px 200px;\"><img  id=\"smallImage\" src=\"images/loader.gif\" /><div style=\"float:right;margin-top:8px;\">Descargando imagen ...</div></div></div>";
		popUp2(mensaje,incidencia,490);
       var url_foto = "php/foto.php";
       mi_incidencia=incidencia;
       mi_idcolor=idcolor;
       httpRequest_foto("POST", url_foto, true, incidencia);
      
       }


    /*
    * Manejo del XMLHttpRequest
    */
    function handleResponse_foto() {
       if (request_foto.readyState == 4) {
          if (request_foto.status == 200) { 
                var foto = request_foto.responseText;
                var foto_array = foto.split("}"); 
                var nu=1;
                for (i = 0; i < foto_array.length - 1; i++) {
             
                    foto_array[i] = foto_array[i] + "}";   
                    var func = new Function("return " + foto_array[i]);
                    var objt = func();    
               
                    /*var smallImage = document.getElementById('smallImage');
					smallImage.style.display = 'block';
					smallImage.src = objt.photo;*/
					
				
                }
                
                //mensaje+="<div><img style=\"margin-left:5px;width:600px;height:450px;\" id=\"smallImage\" src=\""+objt.photo+"\" /></div>"
               /* var func = new Function("return " + foto_array[0]);
                var objt = func();
                mensaje=mensaje+parsear_resto(objt);*/
                var ambuimage = document.getElementById('ambuimage_'+mi_incidencia);
                ambuimage.innerHTML ="<img style=\"margin-left:5px;width:600px;height:450px;\" id=\"smallImage\" src=\""+objt.photo+"\" />";
                //popUp2(mensaje,mi_incidencia,altura); 
          } 
       }
    }
  
  

    function popUp(mensaje) {      
         var page = window.open('','foto','toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no,width=350,height=400,left=212,top=184');
         page.document.write("");
         page.document.close();
         var page = window.open('','foto','toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no,width=350,height=400,left=212,top=184');
         page.document.write(mensaje);
         page.document.close();
    }
    function popUp2(mensaje,incidencia,altura) {
        var win = new Window({className: "alphacube", title: "Foto", width:610, height:altura, wiredDrag: true,resizable: false, minimizable:false,maximizable:false});
        win.getContent().innerHTML = mensaje;
        win.setDestroyOnClose();
        //win.setLocation(100+incidencia, 100+incidencia);
        win.show();
        win.toFront();

    }
    /*
    * Determina el tipo de explorador con el que se trabaja e instancia XMLHttpRequest en consecuencia
    */
    function httpRequest_foto(reqType, url_foto, asynch, incidencia) {
       if (window.XMLHttpRequest) {
          request_foto = new XMLHttpRequest;
          }
       else if (window.ActiveXObject) {
          request_foto = new ActiveXObject("Microsoft.XMLHTTP");
          }
       if (request_foto) {
          initReq_foto(reqType, url_foto, asynch,incidencia);
          }
       else {
          alert("Your browser does not permit the use of all of this application's features!");
          }
       }

    /*
    * Inicializacion del objeto XMLHttpRequest
    */
    function initReq_foto(reqType, url_foto, bool, incidencia) {
       request_foto.onreadystatechange = handleResponse_foto;
       request_foto.open(reqType, url_foto, bool);
       request_foto.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
       request_foto.send("idincidencia=" + incidencia);
      
       }



