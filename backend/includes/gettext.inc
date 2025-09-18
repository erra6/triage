<?php
/**
 * Parche temporal para evitar errores si no existen archivos .mo
 * Devuelve el texto original en vez de fallar.
 */

if (!function_exists('T_')) {
    function T_($msgid) {
        return $msgid; // Devuelve el texto tal cual
    }
}

if (!function_exists('T_setlocale')) {
    function T_setlocale($category, $locale) {
        return $locale; // No hacemos cambios de locale
    }
}

if (!function_exists('T_bindtextdomain')) {
    function T_bindtextdomain($domain, $path) {
        return true; // Ignoramos la ruta de los dominios
    }
}

if (!function_exists('T_bind_textdomain_codeset')) {
    function T_bind_textdomain_codeset($domain, $codeset) {
        return true; // Ignoramos el codeset
    }
}

if (!function_exists('T_textdomain')) {
    function T_textdomain($domain) {
        return $domain; // Devuelve el dominio sin cambios
    }
}

if (!function_exists('T_gettext')) {
    function T_gettext($msgid) {
        return $msgid; // Devuelve el mensaje tal cual
    }
}

if (!function_exists('T_ngettext')) {
    function T_ngettext($singular, $plural, $number) {
        return ($number == 1) ? $singular : $plural;
    }
}

if (!function_exists('T_dgettext')) {
    function T_dgettext($domain, $msgid) {
        return $msgid;
    }
}

if (!function_exists('T_dngettext')) {
    function T_dngettext($domain, $singular, $plural, $number) {
        return ($number == 1) ? $singular : $plural;
    }
}

if (!function_exists('T_dcgettext')) {
    function T_dcgettext($domain, $msgid, $category) {
        return $msgid;
    }
}

if (!function_exists('T_dcngettext')) {
    function T_dcngettext($domain, $singular, $plural, $number, $category) {
        return ($number == 1) ? $singular : $plural;
    }
}

if (!function_exists('T_pgettext')) {
    function T_pgettext($context, $msgid) {
        return $msgid;
    }
}

if (!function_exists('T_dpgettext')) {
    function T_dpgettext($domain, $context, $msgid) {
        return $msgid;
    }
}

if (!function_exists('T_dcpgettext')) {
    function T_dcpgettext($domain, $context, $msgid, $category) {
        return $msgid;
    }
}

if (!function_exists('T_npgettext')) {
    function T_npgettext($context, $singular, $plural, $number) {
        return ($number == 1) ? $singular : $plural;
    }
}

if (!function_exists('T_dnpgettext')) {
    function T_dnpgettext($domain, $context, $singular, $plural, $number) {
        return ($number == 1) ? $singular : $plural;
    }
}

if (!function_exists('T_dcnpgettext')) {
    function T_dcnpgettext($domain, $context, $singular, $plural, $number, $category) {
        return ($number == 1) ? $singular : $plural;
    }
}

?>
