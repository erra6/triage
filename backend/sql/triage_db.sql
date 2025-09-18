-- Crear base de datos
CREATE DATABASE IF NOT EXISTS triage_db CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

-- Crear usuario
CREATE USER IF NOT EXISTS 'triageuser'@'localhost' IDENTIFIED BY 'tr1agePass';

-- Dar permisos
GRANT ALL PRIVILEGES ON triage_db.* TO 'triageuser'@'localhost';
FLUSH PRIVILEGES;

-- Seleccionar base de datos
USE triage_db;

-- Tablas de ejemplo (puedes ampliarlas según fconfig.php o la app)
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    grupo ENUM('ver','editar','sanitario','admin') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sintomas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    categoria VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tartem (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    sintomas TEXT,
    abcde CHAR(5),
    sexo ENUM('M','F','O'),
    edad INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
