<?php
require_once __DIR__ . '/../config/path.php';
/**
 * TriajeConfig

 * getsimple
 *
 * The base configurations for triaje
 *
 * @package Triaje
 */

/** Prevent direct access */
if (basename($_SERVER['PHP_SELF']) == 'fconfig.php') { 
    header("location:index.php");
}; 

# PATH
define('PATH',__DIR__);

# Autoload -- using an anonymous function as of PHP 5.3.0
spl_autoload_register(function ($class) {
    $classpath = PATH.'/includes/'.$class.'.php';
    if(file_exists($classpath)) {require_once($classpath);} else {die('Class '.$class.' not found');}
});

# INFO $ ERROR
$log = new Logger(PATH.'/logs', LogLevel::INFO);

# DEBUG & INFO $ ERROR
$log = new Logger(PATH.'/logs', LogLevel::DEBUG);

# Log Examples
# $log->info('Returned a million search results'); //Prints to the log file
# $log->error('Oh dear.'); //Prints to the log file
# $log->debug('x = 5'); //Prints nothing due to current severity threshhold

# Define default locale
define( 'LOCALE', 'es' );


date_default_timezone_set('Europe/Berlin');

$langs = array(
  'ca' => array('ca', 'Català'),
  'es' => array('es', 'Español'),
  'ar' => array('ar', 'Aranés'),
  'fr' => array('fr', 'Français'),
  'en' => array('en', 'English'),
  'eu' => array('eu', 'Euskara'),
);



# DB config parameters
define( 'DB_HOST', 'localhost' );
define( 'DB_USER', 'fermin' );
define( 'DB_PASS', 'Stro4pass.' );
define( 'DB_NAME', 'front' );











/*# Apply GSADMIN env
if (defined('GSADMIN')) {
	$GSADMIN = GSADMIN;
} else {
	$GSADMIN = 'admin';
}*/








# Extra salt to secure your password with. Default is empty for backwards compatibility.
#define('FLOGINSALT', 'your_unique_phrase');

# Turn off auto-generation of SALT and use a custom value. Used for cookies & upload security.
#define('FUSECUSTOMSALT', 'your_new_salt_value_here');

# Default thumbnail width of uploaded image
#define('FIMAGEWIDTH', '200');

# Change the administrative panel folder name
#define('FADMIN', 'admin');

# Ping search engines upon sitemap generation?
#define('FDONOTPING', 1);

# Turn off CSRF protection. Uncomment this if you keep receiving the error message "CSRF error detected..."
#define('FNOCSRF', TRUE);

# Set override CHMOD mode
#define('FCHMOD', 0755);

# Enable Canonical Redirects?
#define('FCANONICAL', 1);

# Use Uploadify to upload files?
#define('FNOUPLOADIFY', 1);

# WYSIWYG editor height (default 500)
#define('FEDITORHEIGHT', '400');

# WYSIWYG toolbars (advanced, basic or [custom config]) 
#define('FEDITORTOOL', 'advanced');

# WYSIWYG editor language (default en)
#define('FEDITORLANG', 'en');

# WYSIWYG Editor Options
#define('FEDITOROPTIONS', '');

# Set email from address
#define('FFROMEMAIL', 'noreply@get-simple.info');

# Autosave within edit.php. Value is the autosave interval in seconds
#define('FAUTOSAVE', 900);

# Enable the External API to be shown on settinF page 
#define('FEXTAPI', 1);
	
# Set PHP locale
# http://php.net/manual/en/function.setlocale.php
#setlocale(LC_ALL, 'en_US');

# Define default timezone of server, accepts php timezone string
# valid timeszones can be found here http://www.php.net/manual/en/timezones.php
# define('FTIMEZONE', 'America/Chicago');

# Disable loading of external CDN versions of scripts (jQuery/jQueryUI)
#define("FNOCDN",true);

# Disable Codemirror theme editor
#define("FNOHIGHLIGHT",true);

# Forces suppression of php errors when FDEBUG is false, despite php ini settinF
#define('SUPPRESSERRORS',true);

# Disable check for Apache web server, default false
#define('FNOAPACHECHECK', true);

# Disable header version check
#define('FNOVERCHECK', true);

# Enable alternate admin styles, current style constants are
# FSTYLE can be a comma delimied list of flaF
# note: stylesheets are cached, flush cache after changing
#
# style flaF:
# FSTYLEWIDE = wide fluid
# FSTYLE_SBFIXED = fixed sidemenu
# 
# eg. 
# define('FSTYLE',FSTYLE_SBFIXED);
# define('FSTYLE',FSTYLEWIDE);
#define('FSTYLE',implode(',',array(FSTYLEWIDE,FSTYLE_SBFIXED)));

# Disable Sitemap generation and menu items
# define('FNOSITEMAP',true);

# Enable auto meta descriptions from content excerpts when empty
# define('FAUTOMETAD',true);

# Set default language for missing lang token merge, 
# accepts a lang string, default is 'en_US', false to disable
# define('FMERGELANG',false);

?>
