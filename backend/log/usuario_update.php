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


$db = new Database();
$con = $db->getDb();

$id = $_GET['id'] ?? null;
if (!$id) {
    header("Location: usuario.php");
    exit;
}

$stmt = $con->prepare("SELECT * FROM usuarios WHERE id = :id LIMIT 1");
$stmt->bindParam(':id', $id, PDO::PARAM_INT);
$stmt->execute();
$usuario = $stmt->fetch();

if (!$usuario) {
    header("Location: usuario.php");
    exit;
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $grupo = $_POST['grupo'] ?? $usuario['grupo'];
    $password = trim($_POST['contrasena'] ?? '');

    if ($password) {
        $stmt = $con->prepare("UPDATE usuarios SET contra = :contra, grupo = :grupo WHERE id = :id");
        $stmt->execute([
            ':contra' => md5($password),
            ':grupo' => $grupo,
            ':id' => $id
        ]);
    } else {
        $stmt = $con->prepare("UPDATE usuarios SET grupo = :grupo WHERE id = :id");
        $stmt->execute([
            ':grupo' => $grupo,
            ':id' => $id
        ]);
    }
    header("Location: usuario.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Editar Usuario</title>
</head>
<body>
    <h1>Editar Usuario</h1>
    <form method="POST">
        <p>Usuario: <b><?= htmlspecialchars($usuario['usuario']) ?></b></p>
        <label>Nueva Contraseña (dejar vacío si no cambia): <input type="password" name="contrasena"></label><br>
        <label>Grupo: 
            <select name="grupo">
                <option value="sanitario" <?= $usuario['grupo']=='sanitario'?'selected':'' ?>>Sanitario</option>
                <option value="ver" <?= $usuario['grupo']=='ver'?'selected':'' ?>>Ver</option>
                <option value="editar" <?= $usuario['grupo']=='editar'?'selected':'' ?>>Editar</option>
                <option value="admin" <?= $usuario['grupo']=='admin'?'selected':'' ?>>Administrador</option>
            </select>
        </label><br><br>
        <button type="submit">Guardar Cambios</button>
    </form>
    <p><a href="usuario.php">⬅️ Volver al listado</a></p>
</body>
</html>
