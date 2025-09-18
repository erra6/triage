/**
* Panel control encierro
*
* @package front
* @version 1.3.0.1
* @author jonlegarrea@gmail.com
* copyright Jon Legarrea
*
**/
window.onload=init;   
function periodical_incidencias(){
	var hospi=document.formhospital.hospitales.options[document.formhospital.hospitales.selectedIndex].value;
	get_incidencias(hospi);
}


function init(){         
	periodical_incidencias();
	new PeriodicalExecuter(function(){periodical_incidencias()}, 1);
}  

