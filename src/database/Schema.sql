CREATE DATABASE sistema_inventario;
\c inventario;

CREATE TABLE negocios (
    id_negocio SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    nit VARCHAR(50),
    direccion VARCHAR(150),
    telefono VARCHAR(50),
    logo_url TEXT,
    activo BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    negocio_id INT REFERENCES negocios(id_negocio),
    nombre VARCHAR(100),
    email VARCHAR(100),
    password TEXT,
    rol VARCHAR(50),
    activo BOOLEAN DEFAULT TRUE
);

CREATE TABLE categorias (
    id_categoria SERIAL PRIMARY KEY,
    negocio_id INT REFERENCES negocios(id_negocio),
    nombre VARCHAR(100),
    activo BOOLEAN DEFAULT TRUE
);

CREATE TABLE proveedores (
    id_proveedor SERIAL PRIMARY KEY,
    negocio_id INT REFERENCES negocios(id_negocio),
    nombre VARCHAR(100),
    contacto VARCHAR(100),
    nit_proveedor VARCHAR(50),
    activo BOOLEAN DEFAULT TRUE
);

CREATE TABLE productos (
    id_producto SERIAL PRIMARY KEY,
    negocio_id INT REFERENCES negocios(id_negocio),
    categoria_id INT REFERENCES categorias(id_categoria),
    nombre VARCHAR(100),
    precio_venta NUMERIC(12,2),
    stock_actual INT DEFAULT 0,
    activo BOOLEAN DEFAULT TRUE
);

CREATE TABLE ventas (
    id_venta SERIAL PRIMARY KEY,
    negocio_id INT REFERENCES negocios(id_negocio),
    usuario_id INT REFERENCES usuarios(id_usuario),
    total NUMERIC(12,2),
    descuento NUMERIC(12,2),
    tipo_pago VARCHAR(50),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE detalles_venta (
    id_detalle SERIAL PRIMARY KEY,
    venta_id INT REFERENCES ventas(id_venta),
    producto_id INT REFERENCES productos(id_producto),
    cantidad INT,
    precio_unitario_momento NUMERIC(12,2)
);

CREATE TABLE compras (
    id_compra SERIAL PRIMARY KEY,
    negocio_id INT REFERENCES negocios(id_negocio),
    proveedor_id INT REFERENCES proveedores(id_proveedor),
    usuario_id INT REFERENCES usuarios(id_usuario),
    total_compra NUMERIC(12,2),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE detalles_compra (
    id_detalle SERIAL PRIMARY KEY,
    compra_id INT REFERENCES compras(id_compra),
    producto_id INT REFERENCES productos(id_producto),
    cantidad INT,
    precio_unitario NUMERIC(12,2),
    subtotal NUMERIC(12,2)
);

CREATE TABLE movimientos_stock (
    id_movimiento SERIAL PRIMARY KEY,
    negocio_id INT REFERENCES negocios(id_negocio),
    producto_id INT REFERENCES productos(id_producto),
    tipo VARCHAR(20),
    motivo VARCHAR(50),
    cantidad INT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE auditoria (
    id_auditoria SERIAL PRIMARY KEY,
    negocio_id INT REFERENCES negocios(id_negocio),
    usuario_id INT REFERENCES usuarios(id_usuario),
    accion VARCHAR(255),
    metodo_http VARCHAR(10),
    ip_address VARCHAR(50),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO negocios (nombre, nit, direccion, telefono)
VALUES ('Super Tienda Popayán', '900123456', 'Centro', '3120000000');

INSERT INTO usuarios (negocio_id, nombre, email, password, rol)
VALUES (1, 'Admin', 'admin@test.com', '123456', 'admin');

INSERT INTO categorias (negocio_id, nombre)
VALUES (1, 'Bebidas');

INSERT INTO proveedores (negocio_id, nombre)
VALUES (1, 'Distribuidora Coca Cola');

INSERT INTO productos (negocio_id, categoria_id, nombre, precio_venta, stock_actual)
VALUES (1, 1, 'Coca Cola 350ml', 3000, 100);
