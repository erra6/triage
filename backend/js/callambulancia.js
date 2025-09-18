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
    * XMLHttpRequest de callambulancia
    */
    var request_callambulancia;

    /*
    * Funcion principal para llamar a que un ambulancia se "compruebe" -- pase al estado 2
    */
    function get_callambulancia(ambulancia,incidencia) {
       var url_callambulancia = "php/CallAmbulancia.php";
       httpRequest_callambulancia("POST", url_callambulancia, true, ambulancia, incidencia);
       }

    /*
    * Manejo del XMLHttpRequest
    */
    function handleResponse_callambulancia() {
       if (request_callambulancia.readyState == 4) {
          if (request_callambulancia.status == 200) {
             }
          else {
           //  alert("A problem occurred with communicating between the XMLHttpRequest object and the server program.");
             }
          }
       }

    /*
    * Determina el tipo de explorador con el que se trabaja e instancia XMLHttpRequest en consecuencia
    */
    function httpRequest_callambulancia(reqType, url_callambulancia, asynch, ambulancia, incidencia) {
       if (window.XMLHttpRequest) {
          request_callambulancia = new XMLHttpRequest;
          }
       else if (window.ActiveXObject) {
          request_callambulancia = new ActiveXObject("Microsoft.XMLHTTP");
          }
       if (request_callambulancia) {
          initReq_callambulancia(reqType, url_callambulancia, asynch, ambulancia, incidencia);
          }
       else {
          alert("Your browser does not permit the use of all of this application's features!");
          }
       }

    /*
    * Inicializacion del objeto XMLHttpRequest
    */
    function initReq_callambulancia(reqType, url_callambulancia, bool, ambulancia, incidencia) {
       request_callambulancia.onreadystatechange = handleResponse_callambulancia;
       request_callambulancia.open(reqType, url_callambulancia, bool);
       request_callambulancia.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
       request_callambulancia.send("idambulancia=" + ambulancia+"&idincidencia=" + incidencia);
       }


