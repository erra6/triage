<?php
// Normalizado por fix_all_includes.php
require_once __DIR__ . '/../config/path.php';
require_once INCLUDES_PATH . '/Logger.php';
require_once CLASSES_PATH . '/Database.php';
require_once CONFIG_PATH . '/db.php';
require_once CONFIG_PATH . '/fconfig.php';

session_start();

if (!isset($_SESSION['usuario']) || $_SESSION['grupo'] !== 'admin') {
    Logger::error("Acceso denegado a usuario_delete.php");
    die("Acceso denegado");
}

if (!isset($_GET['id'])) {
    Logger::warning("Intento de borrar usuario sin ID");
    die("Falta ID");
}

$id = intval($_GET['id']);

try {
    $db = Database::getConnection();
    $stmt = $db->prepare("DELETE FROM usuario WHERE id = ?");
    $stmt->execute([$id]);

    Logger::info("Usuario eliminado con ID: $id");
    header("Location: usuario.php?msg=deleted");
    exit();
} catch (Exception $e) {
    Logger::error("Error al eliminar usuario ID $id: " . $e->getMessage());
    die("Error al eliminar usuario");
}
