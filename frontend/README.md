Aplicación de Triage - vall de aran revision septiembre 2025


### Estructura del proyecto

---

### 1️⃣ Backend (PHP)

* Carpeta **api/** → scripts PHP que manejan login, tartem, síntomas, tracking, etc.
* Carpeta **php/** → scripts PHP para hospitales, incidencias, mapas, foto, etc.
* Archivos raíz PHP: `index.php`, `editar.php`, `ges.php`, `sanitario.php`, `fconfig.php`…
* Carpeta **includes/** → clases y librerías, incluyendo `gettext.inc` y `streams.php`.
* Carpeta **config/** → configuración (`db.php`, `path.php`).
* Carpeta **classes/** → clases, p. ej. `Database.php`.
* Carpeta **locale/** → traducciones, archivos `.mo` y `.pot`.

---

### 2️⃣ Frontend (HTML/JS/CSS)

* Carpeta **triageapp/** → contiene todo el frontend para dispositivos móviles:

  * `index.html` → inicio del login y navegación interna.
  * subcarpetas **css/**, **js/**, **img/**.
* Otros JS y CSS globales también están en `js/` y `css/` fuera de `triageapp/`.

---

### 3️⃣ Logs

* Carpeta **logs/** y **log/** para almacenar logs de acciones y usuarios.

---

### Cómo probar todo en local

#### Paso 1: Servidor local PHP

1. Abre Terminal y ve a la raíz de tu proyecto:

```bash
cd /ruta/a/triage
```

2. Lanza un servidor PHP embebido:

```bash
php -S localhost:8080
```

Esto levantará tu backend en `http://localhost:8080`.

> Nota: Tu backend está en PHP, no necesitas APKs para probarlo en local.

---

#### Paso 2: Acceder al frontend

* Abre el navegador y carga el frontend con la ruta del servidor PHP:

```
http://localhost:8080/triageapp/index.html
```

* Desde ahí puedes interactuar con los formularios que llamarán a los scripts PHP en `api/` o `php/`.

---

#### Paso 3: Configuración de fconfig.php

* Asegúrate de que `fconfig.php` tenga los datos correctos de tu base de datos (host, usuario, password, DB).
* Si no tienes DB, algunas funciones no funcionarán.

---

#### Paso 4: Verificar logs y permisos

* Carpeta **logs/** debe ser escribible:

```bash
chmod -R 777 logs
```

* Lo mismo para cualquier carpeta donde subas fotos desde el frontend (`photo-content`).

---

 

### estructura al comienzo

.
├── api
│   ├── login.php
│   ├── photo.php
│   ├── sintomas_change.php
│   ├── sintomas_list.php
│   ├── tartem_primera.php
│   ├── tartem.php
│   ├── tracking.php
│   └── triage.php
├── classes
│   └── Database.php
├── config
│   ├── db.php
│   └── path.php
├── css
│   ├── alphacube.css
│   ├── border-radius.htc
│   ├── default.css
│   ├── estilo.css
│   ├── login.css
│   ├── style.css
│   ├── style.hospital.css
│   └── view.css
├── editar.php
├── fconfig.php
├── ges.php
├── hospital.php
├── images
│   ├── 1_USVA_ARAN.png
│   ├── 10_HELICOPTERO_SAMU_FRANCIA.png
│   ├── 2_USVB_ARAN.png
│   ├── 3_HELICOPTERO_ARAN.png
│   ├── 4_USVA_SEM.png
│   ├── 5_USVB_SEM.png
│   ├── 6_HELICOPTERO_SEM.png
│   ├── 7_HELICOPTERO_BOMBERS.png
│   ├── 8_HELICOPTERO_ GC.png
│   ├── 9_USVB_SAMU_FRANCIA.png
│   ├── acr_min.png
│   ├── alphacube
│   │   ├── bottom-left-c.gif
│   │   ├── bottom-middle.gif
│   │   ├── bottom-right-c.gif
│   │   ├── button-close-focus.gif
│   │   ├── button-max-focus.gif
│   │   ├── button-min-focus.gif
│   │   ├── convert.sh
│   │   ├── frame-left.gif
│   │   ├── frame-right.gif
│   │   ├── left-top.gif
│   │   ├── right-top.gif
│   │   └── top-middle.gif
│   ├── amarillo_txiki.png
│   ├── amarillo.png
│   ├── ambu2.gif
│   ├── ambuCR.gif
│   ├── ambuDYA.gif
│   ├── ambulancias.xcf
│   ├── ambupc.gif
│   ├── ambupc.xcf
│   ├── ambuprivada.gif
│   ├── berdea.gif
│   ├── blank.gif
│   ├── blue.gif
│   ├── bottom.png
│   ├── button-close-focus.gif
│   ├── chn.gif
│   ├── clip.gif
│   ├── clip1.gif
│   ├── clip2.gif
│   ├── close.gif
│   ├── control.gif
│   ├── cruz_roja.gif
│   ├── cruz_roja2.gif
│   ├── current-bg.gif
│   ├── de.gif
│   ├── dot.png
│   ├── doty.png
│   ├── encierro.gif
│   ├── escut
│   │   ├── escut_normal.png
│   │   ├── ESCUT.BMP
│   │   └── escut.xcf
│   ├── escut.png
│   ├── flechas.png
│   ├── flechast.png
│   ├── foto.png
│   ├── gris.gif
│   ├── heli
│   │   ├── 109aragon.jpg
│   │   ├── 7_HELICOPTERO_BOMBERS_new.png
│   │   └── 7_HELICOPTERO_BOMBERS.png
│   ├── hospi.gif
│   ├── hospital.gif
│   ├── iz.gif
│   ├── learner.gif
│   ├── linea_h.gif
│   ├── linea.gif
│   ├── linea3.gif
│   ├── linea4.gif
│   ├── loader.gif
│   ├── login-sprite.png
│   ├── menu-bg.gif
│   ├── menu-bg.png.old
│   ├── n120.gif
│   ├── n3_120.gif
│   ├── n3_48.gif
│   ├── n3_480.gif
│   ├── n48.gif
│   ├── negro_txiki.png
│   ├── negro.png
│   ├── plus.gif
│   ├── PMA.png
│   ├── PMAoriginal.png
│   ├── raya.png
│   ├── raya.xcf
│   ├── rojo_negro_cuadro.png
│   ├── rojo_negro_cuadro2.png
│   ├── rojo_negro_txiki.png
│   ├── rojo_negro.png
│   ├── rojo_txiki.png
│   ├── rojo.png
│   ├── rosso.gif
│   ├── Rotulacion_112_Navarra.jpg
│   ├── shadow.gif
│   ├── sintomas.gif
│   ├── sintomas.gif.old
│   ├── sos.gif
│   ├── tarjeta.png
│   ├── top.png
│   ├── verde_txiki.png
│   └── verde.png
├── incidenciaCPC.php
├── includes
│   ├── AbstractLogger.php
│   ├── Db.php
│   ├── gettext.inc
│   ├── gettext.php
│   ├── Logger.php
│   ├── LoggerInterface.php
│   ├── LogLevel.php
│   └── streams.php
├── index.php
├── js
│   ├── ambulancias.js
│   ├── callambulancia.js
│   ├── callhospital.js
│   ├── callpuesto.js
│   ├── calltracking.js
│   ├── dump.js
│   ├── effects.js
│   ├── es.js
│   ├── estados.js
│   ├── estados.ver.js
│   ├── foto.js
│   ├── historial.js
│   ├── hospitales.js
│   ├── inci.js
│   ├── incidencias.hospital.js
│   ├── incidencias.js
│   ├── incidencias.sanitario.js
│   ├── incidencias.ver.js
│   ├── index.html
│   ├── init_mapa.js
│   ├── init_mapa2.js
│   ├── init.hospitales.js
│   ├── init.js
│   ├── popmenu.js
│   ├── prototype.js
│   ├── reinicia.js
│   ├── sintomas.js
│   ├── sintomenos.js
│   ├── view.js
│   ├── window_effects.js
│   └── window.js
├── LICENSE
├── locale
│   ├── ca
│   │   └── LC_MESSAGES
│   ├── commands.txt
│   ├── es
│   │   └── LC_MESSAGES
│   ├── eu
│   │   └── LC_MESSAGES
│   ├── fr
│   │   └── LC_MESSAGES
│   └── index.pot
├── log
│   ├── dir.php
│   ├── loglog.php
│   ├── rei.php
│   ├── reiniciar.php
│   ├── salir.php
│   └── usuario.php
├── logs
│   ├── 2018-10-16_front.txt
│   └── 2025-09-17_front.txt
├── php
│   ├── ambulancias.php
│   ├── CallAmbulancia.php
│   ├── CallHistorial.php
│   ├── CallHospital.php
│   ├── CallPuesto.php
│   ├── CallTracking.php
│   ├── estadosPuesto.php
│   ├── foto.php
│   ├── geo.php
│   ├── hospitales.php
│   ├── incidencias.hospital.php
│   ├── incidencias.hospital.php.old
│   ├── incidencias.hospital.php.old.2
│   ├── incidencias.hospital.php.used.2011
│   ├── incidencias.php
│   ├── index.html
│   ├── mapa_xml.php
│   ├── mapa2_xml.php
│   ├── sintomas.hospital.php
│   └── sintomas.php
├── README.md
├── resources
│   └── apache
│       └── front
├── sanitario.php
├── sintomasCPC.php
├── tabla.php
├── triageapp
│   ├── css
│   │   ├── aran.css
│   │   ├── images
│   │   ├── index.css
│   │   ├── jquery.mobile-1.4.5.css
│   │   └── jquery.mobile.icons.min.css
│   ├── img
│   │   ├── 18-.png
│   │   ├── 18-rojo.png
│   │   ├── 40-.png
│   │   ├── 40-rojo.png
│   │   ├── 75-.png
│   │   ├── 75-rojo.png
│   │   ├── 75+.png
│   │   ├── 75+rojo.png
│   │   ├── 8-.png
│   │   ├── 8-rojo.png
│   │   ├── a.png
│   │   ├── abcde.png
│   │   ├── amarillo.gif
│   │   ├── amarillo.png
│   │   ├── ambus
│   │   ├── atras.png
│   │   ├── b.png
│   │   ├── borrar.png
│   │   ├── c.png
│   │   ├── c1.png
│   │   ├── c10.png
│   │   ├── c11.png
│   │   ├── c12.png
│   │   ├── c13.png
│   │   ├── c14.png
│   │   ├── c15.png
│   │   ├── c16.png
│   │   ├── c17.png
│   │   ├── c18.png
│   │   ├── c2.png
│   │   ├── c3.png
│   │   ├── c4.png
│   │   ├── c5.png
│   │   ├── c6.png
│   │   ├── c7.png
│   │   ├── c8.png
│   │   ├── c9.png
│   │   ├── cero.png
│   │   ├── cinco.png
│   │   ├── close.gif
│   │   ├── colores.png
│   │   ├── cuatro.png
│   │   ├── cuerpo.png
│   │   ├── d.png
│   │   ├── de.gif
│   │   ├── de.png
│   │   ├── dos.png
│   │   ├── e.png
│   │   ├── hombre.png
│   │   ├── hospital.gif
│   │   ├── iz.gif
│   │   ├── iz.png
│   │   ├── logo.png
│   │   ├── mujer.png
│   │   ├── negro.gif
│   │   ├── negro.png
│   │   ├── nueve.png
│   │   ├── ocho.png
│   │   ├── rojo_negro.gif
│   │   ├── rojo_negro.png
│   │   ├── rojo.gif
│   │   ├── rojo.png
│   │   ├── seis.png
│   │   ├── sexo_blanco_2.png
│   │   ├── sexo_blanco.png
│   │   ├── sexo.png
│   │   ├── siete.png
│   │   ├── sintomas.gif
│   │   ├── tres.png
│   │   ├── uno.png
│   │   ├── verde.gif
│   │   └── verde.png
│   ├── index.html
│   └── js
│       ├── api.js
│       ├── camara.js
│       ├── fastclick.min.js
│       ├── index.js
│       ├── jquery.js
│       ├── jquery.mobile-1.4.5.js
│       └── vista.js
└── ver.php

31 directories, 285 files

----

**mapa de correspondencia entre los campos del frontend y las columnas de la tabla `tartem`**. qué envía cada input y cómo lo recibe la base de datos.

---

### 1️⃣ Columnas de la tabla `tartem` (MySQL)

| Columna      | Tipo                 | Comentario                                   |
| ------------ | -------------------- | -------------------------------------------- |
| `id`         | int auto\_increment  | PK, generado automáticamente                 |
| `id_usuario` | int                  | FK al usuario que crea el tartem             |
| `fecha`      | timestamp            | Se asigna automáticamente CURRENT\_TIMESTAMP |
| `sexo`       | enum('M','F','Otro') | Sexo del paciente                            |
| `edad`       | int                  | Edad del paciente                            |
| `abcde`      | varchar(10)          | ABCDE clasificación                          |
| `sintomas`   | text                 | Lista de síntomas                            |

---

### 2️⃣ Inputs del frontend (triageapp/index.html)

| Input / Elemento | ID / Name                        | Lo que representa   | Notas                                                         |
| ---------------- | -------------------------------- | ------------------- | ------------------------------------------------------------- |
| Usuario          | `loginname`                      | Nombre de usuario   | Para login, no se inserta en `tartem` directamente            |
| Contraseña       | `loginpass`                      | Password            | Para login                                                    |
| Sexo             | `sexo` (canvas o imagen)         | 'M', 'F', 'Otro'    | Debe coincidir con enum de tabla                              |
| Edad             | `edad` o similar                 | Edad numérica       | Problema previo: frontend enviaba `IDEdad` → cambiar a `edad` |
| ABCDE            | `abcde` (canvas o input)         | ABCDE clasificación | varchar(10)                                                   |
| Síntomas         | `sintomas` (checkboxes o select) | Texto con síntomas  | Debe ser enviado como texto separado por comas                |

---

### 3️⃣ Posible flujo JS → PHP → MySQL

1. JS captura datos: sexo, edad, ABCDE, síntomas.
2. JS hace `POST` al PHP que procesa tartem (`php/tartem.php` o `api/tartem.php`).
3. PHP recibe el `$_POST` y hace `INSERT INTO tartem (...) VALUES (...)`.
4. MySQL espera las columnas: `id_usuario`, `sexo`, `edad`, `abcde`, `sintomas`.
5. **Error común:** JS enviaba `IDEdad` en lugar de `edad`. MySQL no reconoce `IDEdad`.

---

### 4️⃣ Qué debes corregir

1. **En el JS** (triageapp/js/index.js o api.js) reemplazar cualquier referencia a `IDEdad` por `edad`.
2. **En el PHP** (php/tartem.php o api/tartem.php) asegurarte de que:

```php
$sexo = $_POST['sexo'] ?? 'M'; // default
$edad = $_POST['edad'] ?? 0;   // default
$abcde = $_POST['abcde'] ?? '';
$sintomas = $_POST['sintomas'] ?? '';

$sql = "INSERT INTO tartem (id_usuario, sexo, edad, abcde, sintomas)
        VALUES (:id_usuario, :sexo, :edad, :abcde, :sintomas)";
```

3. Comprobar que el `POST` del frontend tenga las **keys correctas**: `sexo`, `edad`, `abcde`, `sintomas`.

---
