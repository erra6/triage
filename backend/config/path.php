<?php

/**
 * Configuration for: Path
 *
 * For more information about constants please @see http://php.net/manual/en/function.define.php
 * If you want to know why we use "define" instead of "const" @see http://stackoverflow.com/q/2447791/1114320
 *
 * PATH: project general path
 */
define('PATH','http://triaje2.dev/');

function url($url=''){
    echo PATH.$url;
}
