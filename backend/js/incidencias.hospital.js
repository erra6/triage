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
 * XMLHttpRequest de incidencias
 */
var request_incidencias;
var id_hospital;

/*
 * Check Int
 */
function isInt(value) { 
    return !isNaN(parseInt(value,10)) && (parseFloat(value,10) == parseInt(value,10)); 
}


/*
 * MysqlDateToJavascriptDate
 */

Date.createFromMysql = function(mysql_string) {
    var t, result = null;

    if (typeof mysql_string === 'string') {
        t = mysql_string.split(/[- :]/);
        //when t[3], t[4] and t[5] are missing they defaults to zero
        result = new Date(t[0], t[1] - 1, t[2], t[3] || 0, t[4] || 0, t[5] || 0);
    }

    return result;
}

function pad(number) {
    var result = "" + number;
    if (result.length < 2) {
        result = "0" + result;
    }
    return result;
}

function millisToDaysHoursMinutes(millis) {
    var seconds = millis / 1000;
    var totalMinutes = seconds / 60;
    var days = Math.floor(totalMinutes / 1440);
    totalMinutes -= 1440 * days;
    var hours = Math.floor(totalMinutes / 60);
    totalMinutes -= hours * 60;
    var minutes = Math.floor(totalMinutes);
    totalMinutes -= minutes;
    var totalSeconds = Math.floor(totalMinutes * 60)
    var dtext = "";
    if (days > 0) {
        dtext = days + "d" + pad(hours) + "h" + pad(minutes) + "m";
    } else {
        dtext = pad(hours) + "h" + pad(minutes) + "m" + pad(totalSeconds) + "s";
    }

    return dtext;
}

function burbuja(miArray)
{
	for(var i=1;i<miArray.length;i++)
	{
		for(var j=0;j<(miArray.length-i);j++)
		{
			if(miArray[j][0]>miArray[j+1][0])
			{
				k=miArray[j+1];
				miArray[j+1]=miArray[j];
				miArray[j]=k;
			}
		}
	}
	return miArray;
}




/*
 * Funcion principal para chequear todas las incidencias
 */
function get_incidencias(hospital) {
    var url_incidencias = "php/incidencias.hospital.php";
    id_hospital = hospital;
    httpRequest_incidencias("GET", url_incidencias, true);
}

/*
 * Manejo del XMLHttpRequest
 */
function handleResponse_incidencias() {
    if (request_incidencias.readyState == 4) {
        if (request_incidencias.status == 200) {
            var word = request_incidencias.responseText;
            var word_array = word.split("}");

            var divinci = document.getElementById("incidencias");


            var div_text = "";
            var divinci_text = "";
            var divsintomas_text = "";
            var values = new Array();
            for (i = 0; i < word_array.length - 1; i++) {
                word_array[i] = word_array[i] + "}";
                var func = new Function("return " + word_array[i]);
                var objt = func();
                datos_hospital(objt.IDHospital, objt, values);
                if (objt.IDHospital != null) {
                    datos_hospital(0, objt, values);
                }
            }

            var div = document.getElementById("incidencias");
            if (id_hospital in values) {
                div.innerHTML = div_style_main(values[id_hospital]);
            } else {
                div.innerHTML = "";
            }
            
            var mayor=0;
            var cusid_ele = document.getElementsByClassName('clip5');
			for (var i = 0; i < cusid_ele.length; ++i) {
				if(cusid_ele[i].scrollHeight>mayor){
					mayor=cusid_ele[i].scrollHeight;
				}
			}
			var divmayor = document.getElementById("mayor");
			if(parseInt(divmayor.innerHTML)+40<mayor){
				divmayor.innerHTML=mayor;
			}
            
            
            
            
            var divheader = document.getElementById("hospiheader");
            var divcolorheader = document.getElementById("colorheader");

            var itine = "";
            var itinecolor = "";
            var total = 0;
            var total_color = 0;
            //contar colores
            var colores = new Array();
            var color = ["Negros", "Rojo/negros", "Rojos", "Amarillos", "Verdes"]
            for (i = 0; i < 5; i++) {
                colores[i] = 0;
            }
            var num_inci = values[0]['num_incidencias'].split(",");
            for (i = 0; i < num_inci.length - 1; i++) {
                colores[values[0][num_inci[i]]['IDColor']] += 1;
                total_color += 1;
            }

            for (i = 0; i < 5; i++) {
                if (colores[i] != 0) {
                    itinecolor += color[i] + ": " + colores[i] + " | ";
                }
            }
            itinecolor += "TOTAL: " + total_color;
            if (total_color != 0) divcolorheader.innerHTML = itinecolor;

				for (var z in values){
					if (isInt(z) && z!=0){
						var num_inci = values[z]['num_incidencias'].split(",");
						var nombre = values[z][num_inci[0]]['hospital'];
						num_inci = num_inci.length - 1;
						total += num_inci;
						itine += nombre + ": " + num_inci + " | ";
					}
                }


            itine += "TOTAL: " + total;
            if (total != 0) divheader.innerHTML = itine;
        }
    }
}

function num_color(num) {
    var color = "";
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
 * recoge los datos de un hospital
 */
function datos_hospital(num, objt, values) {
    if (!(num in values)) {
        values[num] = new Array();
        values[num]['num_incidencias'] = "";
    }
    if (!(objt.IDIncidencia in values[num])) {
        values[num][objt.IDIncidencia] = new Array();
        values[num]['num_incidencias'] += objt.IDIncidencia + ",";
        values[num][objt.IDIncidencia]['lesiones'] = new Array();
        values[num][objt.IDIncidencia]['lesiones']['num_lesiones'] = "";
        values[num][objt.IDIncidencia]['IDIncidencia'] = objt.IDIncidencia;
        values[num][objt.IDIncidencia]['IDColor'] = objt.IDColor;
        values[num][objt.IDIncidencia]['IDPuesto'] = objt.IDPuesto;
        values[num][objt.IDIncidencia]['IDAmbulancia'] = objt.IDAmbulancia;
        values[num][objt.IDIncidencia]['IndicativoSOS'] = objt.IndicativoSOS;
        values[num][objt.IDIncidencia]['organizacion'] = objt.organizacion;
        values[num][objt.IDIncidencia]['indicativoAmbulancia'] = objt.indicativoAmbulancia;
        values[num][objt.IDIncidencia]['tipoAmbulancia'] = objt.tipoAmbulancia;
        values[num][objt.IDIncidencia]['IDHospital'] = objt.IDHospital;
        values[num][objt.IDIncidencia]['hospital'] = objt.hospital;
        values[num][objt.IDIncidencia]['IDTracking'] = objt.IDTracking;
        values[num][objt.IDIncidencia]['nombre'] = objt.nombre;
        values[num][objt.IDIncidencia]['sexo'] = objt.sexo;
        values[num][objt.IDIncidencia]['tramoEdad'] = objt.tramoEdad;
        values[num][objt.IDIncidencia]['situacion'] = objt.situacion;
        values[num][objt.IDIncidencia]['Pruebas'] = 0;
        values[num][objt.IDIncidencia]['photolength'] = objt.photolength;
        values[num][objt.IDIncidencia]['time'] = objt.time;
        values[num][objt.IDIncidencia]['timeend'] = objt.timeend;
        values[num][objt.IDIncidencia]['inicio'] = objt.inicio;
    }
    if (!(objt.IDLesion in values[num][objt.IDIncidencia]['lesiones']) && (objt.IDLesion != null)) {
        values[num][objt.IDIncidencia]['lesiones'][objt.IDLesion] = new Array();
        values[num][objt.IDIncidencia]['lesiones']['num_lesiones'] += objt.IDLesion + ",";
        values[num][objt.IDIncidencia]['lesiones'][objt.IDLesion]['sintoma'] = objt.sintoma;
        values[num][objt.IDIncidencia]['lesiones'][objt.IDLesion]['anatomia'] = objt.anatomia;
        values[num][objt.IDIncidencia]['lesiones'][objt.IDLesion]['causa'] = objt.causa;
        values[num][objt.IDIncidencia]['lesiones'][objt.IDLesion]['IDsintoma'] = objt.IDsintoma;
        values[num][objt.IDIncidencia]['lesiones'][objt.IDLesion]['inicio'] = objt.inicio;
    }
}


/*
 * Formatea en HTML las incidencias
 */



function div_style_main(data) {
    var text = "";
    var num_inci = data['num_incidencias'].split(",");
    var mayor = document.getElementById("mayor").innerHTML;
    //rojo 2, rojo/negro 1, amarillos 3, verdes 4, negro 0
    var colortabla=["2","1","3","4","0"];  
    var ordencolor=new Array();
    var ordenadascolor=[];
    for (i = 0; i < num_inci.length - 1; i++) {
		if (num_inci[i].length>0){			
			var par=[colortabla.indexOf(data[num_inci[i]].IDColor),num_inci[i]];
			ordencolor.push(par);			
		}
	}
    ordenadascolor=burbuja(ordencolor);
    for (i = 0; i < ordenadascolor.length; i++) {
        text += div_style_incidencias(data[ordenadascolor[i][1]],mayor);
    }
    return text;
}

function div_style_incidencias(objt,mayor) {
    var text;
    var organiza = "<div>&nbsp;</div>";
    var indiambu = "<div>&nbsp;</div>";
    var tracking_color;
    var tracking_label=" ";

    /*
     * Definir segun tracking color del recuadro y estado traking
     */
    if (objt.IDTracking == 1) {
        tracking_color = "yellow1";
        tracking_label = "Solicitada";
    } else if (objt.IDTracking == 2) {
        tracking_color = "yellow2";
        tracking_label = "Asignada";
    } else if (objt.IDTracking == 3) {
        tracking_color = "yellow3";
        tracking_label = "P.enterado";
    } else if (objt.IDTracking == 4) {
        tracking_color = "yellow4";
        tracking_label = "En puesto";
    } else if (objt.IDTracking == 5) {
        tracking_color = "yellow5";
        tracking_label = "Evacuada";
    } else if (objt['IDTracking'] == 6) {
        tracking_color = "orange1";
        tracking_label = "C.sanitario";
    } else if (objt['IDTracking'] == 7) {
        tracking_color = "white1";
        tracking_label = "Tramitada";
    } else if (objt['IDTracking'] == 8) {
        tracking_color = "blue1";
        tracking_label = "Anulando";
    } else if (objt['IDTracking'] == 10) {
        tracking_color = "blue1";
        tracking_label = "Anulada";
    }
    /*
     * Contenedor principal
     */
    text = "<div class=\"left\" style=\"width:170px\"><div id=\"incidencia" + objt['IDIncidencia'] + "\" class=\"" + tracking_color + "\">";



    /*
     * Titulo estado incidencia
     */
    if (objt['IDTracking'] != null) {
        text = text + "<div class=\"estado\" title=\"Estado\"><b>" + tracking_label.toUpperCase() + "</b></div>";
    }



    /*
     * Subcontenedor
     */
    text = text + "<div style=\"margin-left:4px\">";


    /*
     * Hora / conteador
     */
    var tdate = Date.createFromMysql(objt['time']);
    var now;
    var tdiff;
    var tdateend;
    if (objt['timeend'].length==0){
		now = new Date();
		tdiff=millisToDaysHoursMinutes(Math.abs(now-tdate));
	}else{
		tdateend = Date.createFromMysql(objt['timeend']);
		tdiff=millisToDaysHoursMinutes(Math.abs(tdateend-tdate));
	}
    
    
    text = text + "<div style=\"margin-top:5px; margin-left:5px; width:125px;\" class=\"left\">Hora: " + tdate.toLocaleTimeString() + "<div style=\"margin-left:8px;\">" + tdiff + "</div></div>";

    /*
     * Logos ambulancia y hospital
     */
    text = text + "<div class=\"left\">";

    if (objt.organizacion != null) {
        organiza = objt.organizacion;
        if (organiza.search("USVA ARAN") != -1) {
            text = text + "<div class=\"left left10 top2\"><img class=\"ambu\" src=\"images/1_USVA_ARAN.png\" alt=\"Logotipo Ambulancia\" title=\"Ambulancia\" /></div>";
        }
        if (organiza.search("USVB ARAN") != -1) {
            text = text + "<div class=\"left left10 top2\"><img class=\"ambu\" src=\"images/2_USVB_ARAN.png\" alt=\"Logotipo Ambulancia\" title=\"Ambulancia\" /></div>";
        }
        if (organiza.search("HELICOPTERO ARAN") != -1) {
            text = text + "<div class=\"left left10 top2\"><img class=\"ambu\" src=\"images/3_HELICOPTERO_ARAN.png\" alt=\"Logotipo Ambulancia\" title=\"Ambulancia\" /></div>";
        }
        if (organiza.search("USVA SEM") != -1) {
            text = text + "<div class=\"left left10top2\"><img class=\"ambu\" src=\"images/4_USVA_SEM.png\" alt=\"Logotipo Ambulancia\" title=\"Ambulancia\" /></div>";
        }
        if (organiza.search("USVB SEM") != -1) {
            text = text + "<div class=\"left left10 top2\"><img class=\"ambu\" src=\"images/5_USVB_SEM.png\" alt=\"Logotipo Ambulancia\" title=\"Ambulancia\" /></div>";
        }
        if (organiza.search("HELICOPTERO SEM") != -1) {
            text = text + "<div class=\"left left10 top2\"><img class=\"ambu\" src=\"images/6_HELICOPTERO_SEM.png\" alt=\"Logotipo Ambulancia\" title=\"Ambulancia\" /></div>";
        }
        if (organiza.search("HELICOPTERO BOMBERS") != -1) {
            text = text + "<div class=\"left left10 top2\" style=\"margin-left:10px\"><img class=\"ambu\" src=\"images/7_HELICOPTERO_BOMBERS.png\" alt=\"Logotipo Ambulancia\" title=\"Ambulancia\" /></div>";
        }
        if (organiza.search("HELICOPTERO GC") != -1) {
            text = text + "<div class=\"left left10 top2\"><img class=\"ambu\" src=\"images/8_HELICOPTERO_ GC.png\" alt=\"Logotipo Ambulancia\" title=\"Ambulancia\" /></div>";
        }
        if (organiza.search("USVB SAMU FRANCIA") != -1) {
            text = text + "<div class=\"left left10 top2\"><img class=\"ambu\" src=\"images/9_USVB_SAMU_FRANCIA.png\" alt=\"Logotipo Ambulancia\" title=\"Ambulancia\" /></div>";
        }
        if (organiza.search("HELICOPTERO FRANCIA") != -1) {
            text = text + "<div class=\"left left10 top2\"><img class=\"ambu\" src=\"images/10_HELICOPTERO_SAMU_FRANCIA.png\" alt=\"Logotipo Ambulancia\" title=\"Ambulancia\" /></div>";
        }

    }
    if (d(objt.photolength) > 0) {
        text = text + "<div  class=\"left\" style=\"margin-left: 40px;\" onclick=\"get_foto(" + objt.IDIncidencia + "," + objt.IDColor + ")\"><img src=\"images/foto.png\"></img></div>";
    }
    text = text + "<div class=\"clearfix\"></div>";


    objt.IndicativoSOS
    text = text + "<div style=\"margin-top:4px;margin-left:1px;\"><small><b>" + d(objt.IndicativoSOS) + "</b></small></div>";
    text = text + "<div style=\"margin-top:4px;margin-left:1px;\"><small><b>" + d(objt.hospital) + "</b></small></div>";

    text = text + "</div>";

    text = text + "<div class=\"left\" style=\"margin-top:6px;margin-left:8px; margin-rigth:1px;\">";

    /*
     * Organizacion de la ambulancia
     */
    if (objt['organizacion'] != null) {
        organiza = objt['organizacion'].substring(0, 9);
        if (organiza.search("bomberos") != -1) {
            organiza = "<div>" + organiza.substr(0, 1).toUpperCase() + organiza.substr(1) + "</div>";
        } else {
            organiza = "<div>" + organiza + "</div>";
        }

    }
    text = text + "<div><div id=\"organizacion" + objt['IDIncidencia'] + "\"><small></small></div>";
    /*
     * Indicativo de la ambulancia
     */
    if (objt.indicativoAmbulancia != null) {
        tipoambu = objt.tipoAmbulancia;
        if (tipoambu.search("SAMU UCI") != -1) {
            indiambu = "<div class=\"red\"><b> </b></div>";
        } else {
            indiambu = "<div> </div>";
        }
    }
    text = text + "<div id=\"indicativo" + objt.IDIncidencia + "\"><small> </small></div></div></div></div>";



    text = text + "</div>";


    text += "<div class=\"clip1\"><img class=\"clip2\" src=\"images/clip.gif\"></img><div class=\"clip3\"><div class=\"clip4\"></div>";
    if (mayor==0){
		text += "<div class=\"clip5\">";
	}else{
		text += "<div class=\"clip5\" style=\"height:"+mayor+"px;\">";
	}

    text += div_style_sintomas_main(objt);


    text += "</div></div></div>";

    text += "</div></div>";


    return text;
}

function d(data) {
    var devolver = "";
    if (data != null) {
        devolver = data;
    }
    return devolver;
}

function div_style_sintomas_main(objt) {
    var text = "";
    var sex;
    if (objt.sexo == 0) {
        sex = "Mujer";
    } else {
        sex = "Hombre";
    }
    text += "<div><div class=\"cuadro cuadro_" + num_color(objt['IDColor']) + "\"><small>TARTEM</small> <big><b>" + objt['IDIncidencia'] + "</b></big> </div></div>";
    text += "<div style=\"text-align:center;\"><small></small></div><hr>";
    if (objt.Pruebas == 1) {

        text = text + "<div style=\"text-align:center\" ";
        text = text + "> <big><b>PRUEBAS<br>SISTEMA</b></big><br>";
        text = text + "</div><hr><hr>";

    }
    if (objt['lesiones']['num_lesiones'] != null) {
        var numlesiones = objt['lesiones']['num_lesiones'].split(",");
        /*cambio imprimir primero la sintomatologia general*/
	var inicio=new Array();
        for (j = 0; j < numlesiones.length - 1; j++) {
	   var lesion=objt['lesiones'][numlesiones[j]];
	   if (lesion.inicio=="1"){
		//inicio[j]=new Array(); 
		inicio[lesion.IDsintoma] = lesion;		 
	   }
        }
	for (x=0;x<inicio.length;x++){
	    if (inicio[x] !== undefined) {
	            text += div_style_sintomas(0, inicio[x]);
	    }
	}
	var oltabla=['AP','BP','CP','DP','A','B','C','D','E'];
	var ordenlesiones = new Array();
	var ordenadaslesiones=[];
	if (numlesiones[0].length>0){
        for (j = 0; j < numlesiones.length - 1; j++) {
			var elto;
			if (objt['lesiones'][numlesiones[j]]['anatomia'].length>2){
				elto=oltabla.indexOf('E');
			}else{
				elto=oltabla.indexOf(objt['lesiones'][numlesiones[j]]['anatomia']);
			}
            var par=[elto,parseInt(numlesiones[j])];
            ordenlesiones.push(par);
        }	
        ordenadaslesiones=burbuja(ordenlesiones);
     }   
     if (ordenadaslesiones.length>0){
		for (j = 0; j < ordenadaslesiones.length; j++) {
            text += div_style_sintomas(1, objt['lesiones'][ordenadaslesiones[j][1]]);
        }
	 }else{   
        for (j = 0; j < numlesiones.length - 1; j++) {
            text += div_style_sintomas(1, objt['lesiones'][numlesiones[j]]);
        }
     }
    }
    if (objt['situacion']) {
        text += "<small>Lugar TARTEM:</small>";
        text += "<div class=\"left5\">- " + d(objt.situacion) + "<br></div>";
    }

    text += "<small>Itinerario ambulancia:</small>";
    text += "<div class=\"left5\">- " + d(objt.nombre) + "<br>- " + d(objt.hospital);




    text += "<br></div>";
    text += "<hr><small>Ambulancia:</small>";
    text += "<div class=\"left5\"> " + d(objt.IndicativoSOS) + "</div>";


    return text;
}

function div_style_sintomas(comun, data) {
    var text = "";
    if (comun == 0) {
        if (data.inicio == "1") {
            //if (data.IDsintoma == 4 || data.IDsintoma == 14 || data.IDsintoma == 21 || data.IDsintoma == 22 || data.IDsintoma == 23 || data.IDsintoma == 24 || data.IDsintoma == 31) {
            if (data.IDsintoma == 47 || data.IDsintoma==48 || data.IDsintoma==49 || data.IDsintoma==58 || data.IDsintoma==59 || data.IDsintoma==60 || data.IDsintoma==61) {
		text = text + "<div style=\"text-align:center\" class=\"red\"> <big><b>" + data.sintoma.toUpperCase() + "</b></big><br>";
                text = text + "</div><hr><hr>";
	    }else{
                text = text + "<div><small>" + data.sintoma.toUpperCase() + "</small><br>";
                text = text + "</div><hr>";
	    }
            //}
        }
    } else {
        if (data.inicio != "1") {

            var lugar = data.anatomia.replace("hombre", "");
            lugar = lugar.replace("mujer", "");
            var parte = "";
            if (data.anatomia.search("delantera") != -1) {
                parte = "delantera";
                lugar = lugar.replace("delantera", "");
            }
            if (data.anatomia.search("trasera") != -1) {
                parte = "trasera";
                lugar = lugar.replace("trasera", "");
            }

            if (lugar.length > 1) {
                //text+="<big><b>"+data.sintoma+"</b></big><br>";		
                text += "<div style=\"text-align:center\"><small><b>E - " + data.sintoma.toUpperCase() + "</b></small></div>"
                //text+="<div class=\"left5\"><small>CAUSA: </small>"+data.causa+"<br>";
                text += "<div class=\"left5\">";
                text += "<small>LUGAR: </small>" + lugar + "<br>";
            }else{
                text += "<div style=\"text-align:center\"><small><b>" +lugar+" - "+data.sintoma.toUpperCase() + "</b></small></div>"
                text += "<div class=\"left5\">";
            }
            if (parte != "") text += "<small>PARTE: </small>" + parte;
            text += "</div><hr>";
        }
    }

    return text;
}



function parsear_sintomas(objt) {
    var text = "";
    if (objt.IDLesion != null) {
        if (objt.anatomia != "comun") {
            //text=text+"Causa: "+objt.causa+"<br>";

            var lugar = objt.anatomia.replace("hombre", "");
            lugar = lugar.replace("mujer", "");
            var parte = "";
            if (objt.anatomia.search("delantera") != -1) {
                parte = "delantera";
                lugar = lugar.replace("delantera", "");
            }
            if (objt.anatomia.search("trasera") != -1) {
                parte = "trasera";
                lugar = lugar.replace("trasera", "");
            }
            if (lugar.length > 1) {
                text = "<big><b>" + objt.sintoma.toUpperCase() + "</b></big><br>";
                text = text + "Lugar: " + lugar + "<br>";
            }else{
                text = "<big><b>"+lugar.toUpperCase()+" - "+ objt.sintoma.toUpperCase() + "</b></big><br>";
            }
            if (parte != "") text = text + "Parte: " + parte + "<br>";
            text = text + "<br>";
        } else {

            if (objt.IDsintoma == 4 || objt.IDsintoma == 14 || objt.IDsintoma == 21 || objt.IDsintoma == 22 || objt.IDsintoma == 23 || objt.IDsintoma == 24) {
                if (objt.IDsintoma == 23) text = text + "<div class=\"red\">";
                text = text + "<big><big><b>" + objt.sintoma.toUpperCase() + "</b></big></big><br>";
                if (objt.IDsintoma == 23) text = text + "</div>";
            }


        }
    }
    return text;
}

function parsear_resto(objt) {
    var text = "";
    var sex;
    if (objt.sexo == 0) {
        sex = "Mujer";
    } else {
        sex = "Hombre";
    }
    text = "<br><b>Paciente</b><br>";
    text = text + "Sexo: " + objt.sexo + "<br>";
    text = text + "Edad: " + objt.tramoEdad + "<br>";


    text = text + "<br>";
    text = text + "<b>Ambulancia</b><br>";
    var tipo = "";
    if (objt.tipoAmbulancia != null) {
        tipo = objt.tipoAmbulancia;
    }
    text = text + "Tipo: " + tipo + "<br>";
    var IndicativoSOS = "*por asignar*";
    if (objt.IndicativoSOS != null) {
        IndicativoSOS = objt.IndicativoSOS;
    }
    text = text + "Ambulancia: " + IndicativoSOS + "<br>";
    var organizacion = "";
    if (objt.organizacion != null) {
        organizacion = objt.organizacion;
    }
    text = text + "Organización: " + organizacion + "<br>";
    text = text + "<br>";
    text = text + "<b>Ruta</b><br>";
    var hospi = "*por asignar*";
    if (objt.hospital != null) {
        hospi = objt.hospital;
    }
    text = text + "Puesto: " + objt.nombre + "<br>";
    text = text + "Hospital: " + hospi + "<br>";
    text = text + "<br>";
    text = text + "<b>Numero TARTEM:</b>";
    text = text + objt.IDIncidencia;
    text = text + "<br>";
    return text;
}

/*
 * Determina el tipo de explorador con el que se trabaja e instancia XMLHttpRequest en consecuencia
 */
function httpRequest_incidencias(reqType, url_incidencias, asynch) {
    if (window.XMLHttpRequest) {
        request_incidencias = new XMLHttpRequest;
    } else if (window.ActiveXObject) {
        request_incidencias = new ActiveXObject("Microsoft.XMLHTTP");
    }
    if (request_incidencias) {
        initReq_incidencias(reqType, url_incidencias, asynch);
    } else {
        alert("Your browser does not permit the use of all of this application's features!");
    }
}

/*
 * Inicializacion del objeto XMLHttpRequest
 */
function initReq_incidencias(reqType, url_incidencias, bool) {
    request_incidencias.onreadystatechange = handleResponse_incidencias;
    request_incidencias.open(reqType, url_incidencias, bool);
    request_incidencias.send(null);
}
