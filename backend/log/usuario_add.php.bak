<?php
// Normalizado por fix_all_includes.php (2025-09-18)
require_once __DIR__ . '/../config/path.php';
require_once CLASSES_PATH . '/Database.php';
require_once INCLUDES_PATH . '/Db.php';
require_once CONFIG_PATH   . '/db.php';
require_once INCLUDES_PATH . '/fconfig.php';










session_start();






// … el resto del código de cada archivo

session_start();
if (!isset($_SESSION['usuario']) || $_SESSION['grupo'] !== 'admin') {
    header("Location: ../index.php");
    exit;
}


if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $usuario = trim($_POST['usuario'] ?? '');
    $password = trim($_POST['contrasena'] ?? '');
    $grupo = $_POST['grupo'] ?? 'sanitario';

    if ($usuario && $password) {
        $db = new Database();
        $con = $db->getDb();

        $stmt = $con->prepare("INSERT INTO usuarios (usuario, contra, grupo) VALUES (:usuario, :contra, :grupo)");
        $stmt->execute([
            ':usuario' => $usuario,
            ':contra' => md5($password),
            ':grupo' => $grupo
        ]);

        header("Location: usuario.php");
        exit;
    }
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Añadir Usuario</title>
</head>
<body>
    <h1>Añadir Usuario</h1>
    <form method="POST">
        <label>Usuario: <input type="text" name="usuario" required></label><br>
        <label>Contraseña: <input type="password" name="contrasena" required></label><br>
        <label>Grupo: 
            <select name="grupo">
                <option value="sanitario">Sanitario</option>
                <option value="ver">Ver</option>
                <option value="editar">Editar</option>
                <option value="admin">Administrador</option>
            </select>
        </label><br><br>
        <button type="submit">Guardar</button>
    </form>
    <p><a href="usuario.php">⬅️ Volver al listado</a></p>
</body>
</html>
