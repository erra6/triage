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
    * XMLHttpRequest de hospitales
    */    
    var request_hospitales;
    
    /*
    * Funcion principal para chequear todas las hospitales
    */
    function get_hospitales() {
       var url_hospitales = "php/hospitales.php";
       httpRequest_hospitales("GET", url_hospitales, true);
      
       }

    /*
    * Manejo del XMLHttpRequest
    */
    function handleResponse_hospitales() {
       if (request_hospitales.readyState == 4) {
          if (request_hospitales.status == 200) { 
                var word = request_hospitales.responseText;            
                var word_array = word.split("}"); 
                for (var h = 0; h < word_array.length - 1; h++) {
                        word_array[h] = word_array[h] + "}";         
                }
               
                var inci = document.getElementById("incidencias").innerHTML;
                var inci_array = inci.split(",");
                for (var i = 0; i < inci_array.length - 1; i++) {
                    var select=document.getElementById("hospital"+inci_array[i]); 
                    anadir_eltos_hospital(word_array,select);                 
                }
             } 
          }
       }  
    function anadir_eltos_hospital(word_array,select){
        var entrar=false;                   
        if (select.selectedIndex!=null){
            var value=select.options[select.selectedIndex].value;
            var text=select.options[select.selectedIndex].text;  
            entrar=true;
        }
        while(select.hasChildNodes()){
            for (var j=0; j < select.childNodes.length; j++){
                    select.removeChild(select.lastChild);
            }
        }
        if(entrar){
            var nuevo=new Option(text, value);
            try {
                select.add(nuevo, null); // standards compliant; doesn't work in IE
            }
            catch(ex) {
                select.add(nuevo); // IE only
            }
            if(text!="[Asignar]"){
                var nuevo2=new Option('[sin Asignar]',-1);
                try {
                    select.add(nuevo2, null); // standards compliant; doesn't work in IE
                }
                catch(ex) {
                    select.add(nuevo2); // IE only
                }
            }
        }else{
            var nuevo=new Option("[Asignar]", -1);
            try {
                select.add(nuevo, null); // standards compliant; doesn't work in IE
            }
            catch(ex) {
                select.add(nuevo); // IE only
            }
        }
        for (var h = 0; h < word_array.length - 1; h++) {                        
            var func = new Function("return " + word_array[h]);
            var objt = func();
            if (value != objt.IDHospital){
                var nuevo=new Option(objt.hospital,objt.IDHospital);               
                try {
                    select.add(nuevo, null); // standards compliant; doesn't work in IE
                }
                catch(ex) {
                    select.add(nuevo); // IE only
                }
            } 
        }        
    }

    /*
    * Determina el tipo de explorador con el que se trabaja e instancia XMLHttpRequest en consecuencia
    */
    function httpRequest_hospitales(reqType, url_hospitales, asynch) {
       if (window.XMLHttpRequest) {
          request_hospitales = new XMLHttpRequest;
          }
       else if (window.ActiveXObject) {
          request_hospitales = new ActiveXObject("Microsoft.XMLHTTP");
          }
       if (request_hospitales) {
          initReq_hospitales(reqType, url_hospitales, asynch);
          }
       else {
          alert("Your browser does not permit the use of all of this application's features!");
          }
       }

    /*
    * Inicializacion del objeto XMLHttpRequest
    */
    function initReq_hospitales(reqType, url_hospitales, bool) {
       request_hospitales.onreadystatechange = handleResponse_hospitales;
       request_hospitales.open(reqType, url_hospitales, bool);
       request_hospitales.send(null);
      
       }



