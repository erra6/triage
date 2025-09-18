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
    * XMLHttpRequest de ambulancias
    */    
    var request_ambulancias;
    
    /*
    * Funcion principal para chequear todas las ambulancias
    */
    function get_ambulancias() {
       var url_ambulancias = "php/ambulancias.php";
       httpRequest_ambulancias("GET", url_ambulancias, true);
      
       }

    /*
    * Manejo del XMLHttpRequest
    */
    function handleResponse_ambulancias() {
       if (request_ambulancias.readyState == 4) {
          if (request_ambulancias.status == 200) { 
              var word = request_ambulancias.responseText;            
                var word_array = word.split("}"); 
                for (var h = 0; h < word_array.length - 1; h++) {
                        word_array[h] = word_array[h] + "}";         
                }               
                var inci = document.getElementById("incidencias").innerHTML;
                var inci_array = inci.split(",");
                for (var i = 0; i < inci_array.length - 1; i++) {
                    var select=document.getElementById("ambulancia"+inci_array[i]);                    
                    anadir_eltos_ambulancia(word_array,select);
                }                  
             } 
          }
       }  
    function anadir_eltos_ambulancia(word_array,select){ 
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
            if (text!="[Asignar]"){
                var nuevo2=new Option("[sin Asignar]", -1);
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
            var nuevo=new Option(objt.IndicativoSOS, objt.IDAmbulancia);
            try {
                select.add(nuevo, null); // standards compliant; doesn't work in IE
            }
            catch(ex) {
                select.add(nuevo); // IE only
            }
        }
                    
    }

    /*
    * Determina el tipo de explorador con el que se trabaja e instancia XMLHttpRequest en consecuencia
    */
    function httpRequest_ambulancias(reqType, url_ambulancias, asynch) {
       if (window.XMLHttpRequest) {
          request_ambulancias = new XMLHttpRequest;
          }
       else if (window.ActiveXObject) {
          request_ambulancias = new ActiveXObject("Microsoft.XMLHTTP");
          }
       if (request_ambulancias) {
          initReq_ambulancias(reqType, url_ambulancias, asynch);
          }
       else {
          alert("Your browser does not permit the use of all of this application's features!");
          }
       }

    /*
    * Inicializacion del objeto XMLHttpRequest
    */
    function initReq_ambulancias(reqType, url_ambulancias, bool) {
       request_ambulancias.onreadystatechange = handleResponse_ambulancias;
       request_ambulancias.open(reqType, url_ambulancias, bool);
       request_ambulancias.send(null);
      
       }



