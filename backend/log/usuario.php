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

$stmt = $con->query("SELECT id, usuario, grupo FROM usuarios ORDER BY id ASC");
$usuarios = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Usuarios - Administración</title>
    <link rel="stylesheet" href="../css/style.css">
</head>
<body>
    <h1>Gestión de Usuarios</h1>
    <a href="usuario_add.php">➕ Añadir Usuario</a>
    <table border="1" cellpadding="5">
        <thead>
            <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Grupo</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
         foreach ($usuarios as $u): ?>
            <tr>
                <td><?= htmlspecialchars($u['id']) ?></td>
                <td><?= htmlspecialchars($u['usuario']) ?></td>
                <td><?= htmlspecialchars($u['grupo']) ?></td>
                <td>
                    <a href="usuario_update.php?id=<?= $u['id'] ?>">✏️ Editar</a>
                    <a href="usuario_delete.php?id=<?= $u['id'] ?>" onclick="return confirm('¿Seguro que quieres eliminar este usuario?')">🗑️ Borrar</a>
                </td>
            </tr>
         endforeach; ?>
        </tbody>
    </table>
    <p><a href="../ges.php">⬅️ Volver</a></p>
</body>
</html>
