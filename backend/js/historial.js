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
    * XMLHttpRequest de callhistorial
    */
    var request_callhistorial;
    var ano;
    var dia;

    /*
    * Funcion principal para llamar a que un historial se "compruebe" -- pase al estado 2
    */
    function get_callhistorial(obj,obj2) {               
       ano=obj.options[obj.selectedIndex].value;
       dia=obj2.options[obj2.selectedIndex].value;
       var url_callhistorial = "php/CallHistorial.php";
       httpRequest_callhistorial("POST", url_callhistorial, true, ano, dia);
       }

    /*
    * Manejo del XMLHttpRequest
    */
    function handleResponse_callhistorial() {
       if (request_callhistorial.readyState == 4) {
          if (request_callhistorial.status == 200) {
                document.getElementById("tabla").innerHTML=request_callhistorial.responseText;
                
             }
          else {
           //  alert("A problem occurred with communicating between the XMLHttpRequest object and the server program.");
             }
          }
       }

    /*
    * Determina el tipo de explorador con el que se trabaja e instancia XMLHttpRequest en consecuencia
    */
    function httpRequest_callhistorial(reqType, url_callhistorial, asynch, ano, dia) {
       if (window.XMLHttpRequest) {
          request_callhistorial = new XMLHttpRequest;
          }
       else if (window.ActiveXObject) {
          request_callhistorial = new ActiveXObject("Microsoft.XMLHTTP");
          }
       if (request_callhistorial) {
          initReq_callhistorial(reqType, url_callhistorial, asynch, ano, dia);
          }
       else {
          alert("Your browser does not permit the use of all of this application's features!");
          }
       }

    /*
    * Inicializacion del objeto XMLHttpRequest
    */
    function initReq_callhistorial(reqType, url_callhistorial, bool, ano, dia) {
       request_callhistorial.onreadystatechange = handleResponse_callhistorial;
       request_callhistorial.open(reqType, url_callhistorial, bool);
       request_callhistorial.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
       request_callhistorial.send("ano=" + ano+"&dia=" + dia);
       }


