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

    function init(){          
	    //get_estados();
        get_incidencias();
        new PeriodicalExecuter(get_incidencias, 10);  
		//new PeriodicalExecuter(get_estados, 2);
    }   
