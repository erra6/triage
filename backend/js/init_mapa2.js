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
	    load();        
        new PeriodicalExecuter(load, 10); 
    }   
