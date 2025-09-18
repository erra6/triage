<?php
// Normalizado por fix_all_includes.php (2025-09-18)
require_once __DIR__ . '/../config/path.php';
require_once CLASSES_PATH . '/Database.php';
require_once CONFIG_PATH   . '/db.php';
require_once INCLUDES_PATH . '/fconfig.php';










session_start();






// … el resto del código de cada archivo

session_start();

if (!isset($_SESSION['usuario']) || !isset($_SESSION['grupo'])) {
    header("Location: ../index.php");
    exit;
}
if ($_SESSION['grupo'] !== 'admin') {
    header("Location: ../index.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <title>Reiniciar sistema - Pompiers</title>
    <link rel="stylesheet" href="../css/style.css"/>
    <style>
        body { font-family: Arial, sans-serif; }
        table { margin: 20px auto; border-collapse: collapse; background: #f9f9f9; }
        td { padding: 10px; }
        .btn { padding: 8px 16px; background: #007BFF; color: white; border: none; cursor: pointer; }
        .btn:hover { background: #0056b3; }
    </style>
</head>
<body>
    <!-- Logotipos -->
    <div class="logo">
        <div class="left">
            <div class="left logo2" style="margin:10px 10px 0 0">
                <img src="../images/flechast.png" alt="Logotipo" />
            </div>
        </div>
    </div>
    <div class="left logo2">
        <img src="../images/escut.png" alt="Logotipo" />
    </div>
    <div class="left" style="margin:40px 0 0 20px;font-size:26px">
        Emergencies Pompièrs d'Aran
    </div>

    <br class="clearingBR"/><br class="clearingBR"/>

    <!-- Formulario -->
    <div style="margin:30px auto; width: 400px;">
        <form method="post" action="rei.php" onsubmit="return validarForm();">
            <table border="1" cellpadding="5" cellspacing="0">
                <tr>
                    <td colspan="2" style="text-align:center; background:#ACCCFF;">
                        <strong>¿Seguro que quiere reiniciar?</strong><br>
                        <small>Esta acción borrará los datos activos y creará un backup.</small>
                    </td>
                </tr>
                <tr>
                    <td>Usuario</td>
                    <td><input type="text" name="usuario" id="usuario" required></td>
                </tr>
                <tr>
                    <td>Contraseña</td>
                    <td><input type="password" name="contrasena" id="contrasena" required></td>
                </tr>
                <tr>
                    <td>Reiniciar</td>
                    <td>
                        <select name="reiniciar" id="reiniciar" required>
                            <option value="">Seleccione...</option>
                            <option value="0">Estados de puestos</option>
                            <option value="1">Tartenes (incidencias)</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" style="text-align:center;">
                        <button type="submit" class="btn">Reiniciar</button>
                    </td>
                </tr>
            </table>
        </form>
    </div>

    <script>
        function validarForm() {
            const user = document.getElementById("usuario").value.trim();
            const pass = document.getElementById("contrasena").value.trim();
            const reiniciar = document.getElementById("reiniciar").value;

            if (!user || !pass || !reiniciar) {
                alert("Por favor, complete todos los campos.");
                return false;
            }
            return confirm("⚠️ Esta acción es irreversible. ¿Seguro que quiere continuar?");
        }
    </script>
</body>
</html>
