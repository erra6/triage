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
    * XMLHttpRequest de callpuesto
    */
    var request_callpuesto;

    /*
    * Funcion principal para llamar a que un puesto se "compruebe" -- pase al estado 2
    */
    function get_callpuesto(puesto) {
       var url_callpuesto = "php/CallPuesto.php";
       httpRequest_callpuesto("POST", url_callpuesto, true, puesto);
       }

    /*
    * Manejo del XMLHttpRequest
    */
    function handleResponse_callpuesto() {
       if (request_callpuesto.readyState == 4) {
          if (request_callpuesto.status == 200) {
             }
          else {
            // alert("A problem occurred with communicating between the XMLHttpRequest object and the server program.");
             }
          }
       }

    /*
    * Determina el tipo de explorador con el que se trabaja e instancia XMLHttpRequest en consecuencia
    */
    function httpRequest_callpuesto(reqType, url_callpuesto, asynch, puesto) {
       if (window.XMLHttpRequest) {
          request_callpuesto = new XMLHttpRequest;
          }
       else if (window.ActiveXObject) {
          request_callpuesto = new ActiveXObject("Microsoft.XMLHTTP");
          }
       if (request_callpuesto) {
          initReq_callpuesto(reqType, url_callpuesto, asynch, puesto);
          }
       else {
          alert("Your browser does not permit the use of all of this application's features!");
          }
       }

    /*
    * Inicializacion del objeto XMLHttpRequest
    */
    function initReq_callpuesto(reqType, url_callpuesto, bool, puesto) {
       request_callpuesto.onreadystatechange = handleResponse_callpuesto;
       request_callpuesto.open(reqType, url_callpuesto, bool);
       request_callpuesto.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
       request_callpuesto.send("puesto=" + puesto);
       }


