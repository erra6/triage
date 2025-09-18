/**
* Panel control encierro
*
* @package front
* @version 1.3.0.1
* @author jonlegarrea@gmail.com
* copyright Jon Legarrea
*
**/
    var request_estados;
    function get_estados() {
       var url = "php/estadosPuesto.php";
       httpRequest_estados("GET", url, true);
       }
    function handleResponse_estados() {
       if (request_estados.readyState == 4) {
          if (request_estados.status == 200) {
             var word = request_estados.responseText;
             var word_array = word.split("&");             
             for (i = 0; i < word_array.length - 1; i++) {
                var estado = "estado" + (i + 1);                
                var html=document.getElementById(estado).innerHTML;                
                var cerrado=html.search("Cerrado");
                var abierto=html.search("Abierto");
                var comprobando=html.search("Comprobando");
                var listo=html.search("Listo");
                //si hay diferencia entre el valor del estado en pantalla y el recibido de la base de datos, dibuja ese estado de nuevo
                if (!((word_array[i]==0 && cerrado!=-1) || (word_array[i]==1 && abierto!=-1) || (word_array[i]==2 && comprobando!=-1) || (word_array[i]==3 && listo!=-1))){
                    document.getElementById(estado).innerHTML = div_style_estados(word_array[i], i + 1, estado);
                    }               
                }                              
             }
          else {
            // alert("A problem occurred with communicating between the XMLHttpRequest object and the server program.");
             }
          }
           
       }
    function div_style_estados(numero_estado, puesto, estado) {
       var text;
       text = "<div>";
       if (numero_estado == 0) {
          text = text + "<div><img src=\"images/gris.gif\" alt=\"boton_cerrado\"></img></div><div><small>Cerrado</small></div>";
          }
       else if (numero_estado == 1) {
          text = text + "<div><img class=\"img_borde\" src=\"images/blue.gif\" alt=\"boton_abierto\" ></img></a></div><div><small>Abierto</small></div>";
          }
       else if (numero_estado == 2) {
          text = text + "<div><img class=\"img_borde\" src=\"images/rosso.gif\" alt=\"boton_comprobando\"></img></a></div><div><small>Comprobando</small></div>";
          }
       else if (numero_estado == 3) {
          text = text + "<div><img class=\"img_borde\" src=\"images/berdea.gif\" alt=\"boton_listo\"></img></a></div><div>Listo</div>";
          }
       text = text + "</div>";
       return text;
       }    
    function httpRequest_estados(reqType, url, asynch) {
       if (window.XMLHttpRequest) {
          request_estados = new XMLHttpRequest;
          }
       else if (window.ActiveXObject) {
          request_estados = new ActiveXObject("Microsoft.XMLHTTP");
          }
       if (request_estados) {
          initReq_estados(reqType, url, asynch);
          }
       else {
          alert("Your browser does not permit the use of all of this application's features!");
          }
       }
    function initReq_estados(reqType, url, bool) {
       request_estados.onreadystatechange = handleResponse_estados;
       request_estados.open(reqType, url, bool);
       request_estados.send(null);
       }
