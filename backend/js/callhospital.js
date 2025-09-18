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
    * XMLHttpRequest de callhospital
    */
    var request_callhospital;

    /*
    * Funcion principal para llamar a que un hospital se "compruebe" -- pase al estado 2
    */
    function get_callhospital(hospital,incidencia) {
       var url_callhospital = "php/CallHospital.php";
       httpRequest_callhospital("POST", url_callhospital, true, hospital, incidencia);
       }

    /*
    * Manejo del XMLHttpRequest
    */
    function handleResponse_callhospital() {
       if (request_callhospital.readyState == 4) {
          if (request_callhospital.status == 200) {
             }
          else {
           //  alert("A problem occurred with communicating between the XMLHttpRequest object and the server program.");
             }
          }
       }

    /*
    * Determina el tipo de explorador con el que se trabaja e instancia XMLHttpRequest en consecuencia
    */
    function httpRequest_callhospital(reqType, url_callhospital, asynch, hospital, incidencia) {
       if (window.XMLHttpRequest) {
          request_callhospital = new XMLHttpRequest;
          }
       else if (window.ActiveXObject) {
          request_callhospital = new ActiveXObject("Microsoft.XMLHTTP");
          }
       if (request_callhospital) {
          initReq_callhospital(reqType, url_callhospital, asynch, hospital, incidencia);
          }
       else {
          alert("Your browser does not permit the use of all of this application's features!");
          }
       }

    /*
    * Inicializacion del objeto XMLHttpRequest
    */
    function initReq_callhospital(reqType, url_callhospital, bool, hospital, incidencia) {
       request_callhospital.onreadystatechange = handleResponse_callhospital;
       request_callhospital.open(reqType, url_callhospital, bool);
       request_callhospital.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
       request_callhospital.send("idhospital=" + hospital+"&idincidencia=" + incidencia);
       }


