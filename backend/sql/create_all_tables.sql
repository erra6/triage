-- ============================
-- Script de creación de tablas
-- Sistema TRIAGE
-- ============================

-- ⚠️ Nota: ejecutar con usuario que tenga permisos de creación.
-- Ejemplo desde terminal:
--   mysql -u triage -p triage < create_all_tables.sql

-- ============================
-- Tabla: usuarios
-- ============================
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    contra VARCHAR(255) NOT NULL,
    grupo ENUM('admin','sanitario','ver','editar') NOT NULL DEFAULT 'ver',
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================
-- Tabla: ambulancias
-- ============================
CREATE TABLE IF NOT EXISTS ambulancias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    estado VARCHAR(50) DEFAULT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================
-- Tabla: hospitales
-- ============================
CREATE TABLE IF NOT EXISTS hospitales (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion VARCHAR(255) DEFAULT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================
-- Tabla: sintomas
-- ============================
CREATE TABLE IF NOT EXISTS sintomas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(255) NOT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================
-- Tabla: tartem
-- ============================
CREATE TABLE IF NOT EXISTS tartem (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(50) NOT NULL,
    descripcion VARCHAR(255) DEFAULT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================
-- Tabla: incidencias
-- ============================
CREATE TABLE IF NOT EXISTS incidencias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    descripcion TEXT NOT NULL,
    IDTracking INT DEFAULT 0,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================
-- Tabla: lesiones
-- ============================
CREATE TABLE IF NOT EXISTS lesiones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(100) NOT NULL,
    descripcion TEXT,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================
-- Tabla: pacientes
-- ============================
CREATE TABLE IF NOT EXISTS pacientes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) DEFAULT NULL,
    edad INT DEFAULT NULL,
    sexo ENUM('M','F') DEFAULT NULL,
    tartem_id INT DEFAULT NULL,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================
-- Tabla: eventosincidencia
-- ============================
CREATE TABLE IF NOT EXISTS eventosincidencia (
    id INT AUTO_INCREMENT PRIMARY KEY,
    incidencia_id INT NOT NULL,
    descripcion TEXT,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================
-- Tabla: eventospuesto
-- ============================
CREATE TABLE IF NOT EXISTS eventospuesto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    puesto_id INT NOT NULL,
    descripcion TEXT,
    IDEstadoPuesto INT DEFAULT 0,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================
-- Tablas de histórico
-- ============================
CREATE TABLE IF NOT EXISTS historico_eventosincidencia LIKE eventosincidencia;
CREATE TABLE IF NOT EXISTS historico_incidencias LIKE incidencias;
CREATE TABLE IF NOT EXISTS historico_lesiones LIKE lesiones;
CREATE TABLE IF NOT EXISTS historico_pacientes LIKE pacientes;
-- ⚠️ La tabla historico_eventospuesto depende de eventospuesto
CREATE TABLE IF NOT EXISTS historico_eventospuesto LIKE eventospuesto;
