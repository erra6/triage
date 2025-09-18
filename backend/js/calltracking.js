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
    * XMLHttpRequest de calltracking
    */
    var mi_incidencia;
    var request_calltracking;

    /*
    * Funcion principal para llamar a que un tracking se "compruebe" -- pase al estado 2
    */
    function get_calltracking(tracking,incidencia) {
       if (tracking==8 || tracking==10){
		var seguro=confirm("¿Esta seguro de anular el TARTEM?");
		if (seguro==true){
       			var url_calltracking = "php/CallTracking.php";
		       	mi_incidencia=incidencia;
	       		httpRequest_calltracking("POST", url_calltracking, true, tracking, incidencia);
			
		}
       }else{
	if (tracking>=1 && tracking<=10){
       		var url_calltracking = "php/CallTracking.php";
	       	mi_incidencia=incidencia;
       		httpRequest_calltracking("POST", url_calltracking, true, tracking, incidencia);
	}
       }
        
       }

    /*
    * Manejo del XMLHttpRequest
    */
    function handleResponse_calltracking() {
       if (request_calltracking.readyState == 4) {
          if (request_calltracking.status == 200) {
                document.getElementById("incidencia" + mi_incidencia).innerHTML="";
                get_incidencias();
             }
          else {
           //  alert("A problem occurred with communicating between the XMLHttpRequest object and the server program.");
             }
          }
       }

    function sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds){
                break;
            }
        }
    }

    /*
    * Determina el tipo de explorador con el que se trabaja e instancia XMLHttpRequest en consecuencia
    */
    function httpRequest_calltracking(reqType, url_calltracking, asynch, tracking, incidencia) {
       if (window.XMLHttpRequest) {
          request_calltracking = new XMLHttpRequest;
          }
       else if (window.ActiveXObject) {
          request_calltracking = new ActiveXObject("Microsoft.XMLHTTP");
          }
       if (request_calltracking) {
          initReq_calltracking(reqType, url_calltracking, asynch, tracking, incidencia);
          }
       else {
          alert("Your browser does not permit the use of all of this application's features!");
          }
       }

    /*
    * Inicializacion del objeto XMLHttpRequest
    */
    function initReq_calltracking(reqType, url_calltracking, bool, tracking, incidencia) {
       request_calltracking.onreadystatechange = handleResponse_calltracking;
       request_calltracking.open(reqType, url_calltracking, bool);
       request_calltracking.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
       request_calltracking.send("idtracking=" + tracking+"&idincidencia=" + incidencia);
       }


