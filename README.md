# Proyecto Tienda Online Bootcamp ❤️

Autor: Marcelo Campaña - Bootcamp Javascript FullStack Trainee

## Descripción del proyecto y funcionamiento general del aplicativo

El proyecto tiene como objetivo crear un prototipo de una tienda en línea para la venta de productos. Está altamente orientado al desarrollo con web components y programación orientada a objetos. Las funcionalidades principales incluyen:

- Catálogo de productos con filtrado por categorías y envio al carrito.
- Pagina de confirmacion de compra.
- Pagina de dettale del pedido
- Pagina de pedidos historicos.
- Página de acceso único para cuentas de usuario final y administrador, la cual redirecciona al sitio web o mantenedor respectivamente.
- Validación de acceso y perfil a través de JWT.
- Mantenedor (CRUD) para la administración de productos de la tienda.
- Página de productos mas vendidos.
- Código minificado con webpack para mejorar la velocidad de carga y seguridad del aplicativo front.
- API rest para el servicio de datos con modelo ORM.
- Uso de variables de entorno para el manejo de datos sensibles.

## Descripción del proyecto y funcionamiento general del aplicativo

### Datos de acceso para usuario final:

- Usuario: cris@uno.com
- Contraseña: 12345

o puede registrarse como nuevo usuario.

### Datos de acceso para administrador:

- Usuario:edu@one.com
- Contraseña: 12345

## Instalación

En cada proyecto:

```bash
npm i
npm start
```

### Requerimientos de la rúbrica

#### Consulta Base de Datos

- Seleccionar las columnas requeridas para presentar la información (api-tienda-lit/src/models/product.js, api-tienda-lit/src/models/shoppingCart.js, api-tienda-lit/src/models/user.js).
- Utilizar join para seleccionar la información de las distintas tablas (api-tienda-lit/src/models/product.js, api-tienda-lit/src/models/user.js).
- Utilizar cláusulas de ordenamiento para presentar la información (api-tienda-lit/src/models/product.js).
- Utilizar cláusulas de agrupación (api-tienda-lit/src/models/product.js).
- Utilizar where para filtrar la información requerida (api-tienda-lit/src/models/user.js).

#### Algoritmos de cálculo y manipulación de archivos de texto

- Utilización general del lenguaje, selección de tipos de datos (front-tienda-lit/src/services/ApiManager.js, front-tienda-lit/src/components/store-login.js).
- Utilización de sentencias repetitivas (front-tienda-lit/src/components/admin-product-list.js, front-tienda-lit/src/components/store-product.js).
- Convenciones y estilos de programación (ambos proyectos en general incluyen módulos, componentes, programación orientada a objetos, encapsulación).
- Utilización correcta de la estructura de datos (ambos proyectos tienen una estructura de directorios acorde a las buenas prácticas, separando los módulos y/o piezas de código en conjuntos de acuerdo al servicio que prestan).
- Manipulación de archivos (escritura en archivo txt del log de conexiones de usuarios: api-tienda-lit/src/log/connections.txt, api-tienda-lit/src/controllers/auth.js).

#### Página web y HTML

- Utilización de tags HTML, estilos y responsividad (todo el directorio front-tienda-lit/src/components).
- Utilización de Bootstrap (front-tienda-lit/src/components/utils-404.js, front-tienda-lit/src/components/store-carrousel.js).
- Inclusión de paquetes y librerías de usuario (archivo package.json de ambos proyectos).
- Agrupación del código y separación por funcionalidad (api-tienda-lit/src/models, api-tienda-lit/src/controllers, src/components).
- Utilización de funciones asíncronas (front-tienda-lit/src/services/ApiManager.js, api-tienda-lit/src/controllers/auth.js).
- Lectura de parámetros de entrada (api-tienda-lit/src/controllers/users.js, api-tienda-lit/src/utils).

#### Conexión a base de datos

- Manejo de conexión a base de datos desde Node (api-tienda-lit/src/services/db_connection.js, api-tienda-lit/src/models/).
- Manejo y ejecución de consultas desde Node (api-tienda-lit/src/models/product.js, api-tienda-lit/src/models/user.js).

#### Uso de Express

- Creación de servicio REST con Express (api-tienda-lit/src/routes, api-tienda-lit/src/server.js).

## Enlaces a repositorios

- [Front tienda](https://github.com/marcelocampana/front-tienda-lit)
- [API Tienda](https://github.com/marcelocampana/api-tienda-lit)
