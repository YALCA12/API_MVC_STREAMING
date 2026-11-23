# API MVC STREAMING

## Descripción
Proyecto académico que consiste en el desarrollo de una API REST utilizando la arquitectura MVC (Modelo, Vista y Controlador) para administrar una base de datos de una plataforma de streaming.

## Tecnologías utilizadas
- Node.js
- Express.js
- SQL Server
- JavaScript
- Visual Studio Code
- REST Client

## Base de datos
Nombre: DB_STREAMING

La base de datos contiene seis tablas:
- Usuarios
- Planes
- Suscripciones
- Contenidos
- Reproducciones
- Pagos

## Arquitectura del proyecto
- config: conexión con SQL Server.
- models: consultas y operaciones de la base de datos.
- controllers: lógica y validaciones de las solicitudes.
- routes: rutas de los endpoints de la API.

## Operaciones disponibles
Cada módulo cuenta con las siguientes operaciones:
- GET: listar registros.
- GET por ID: buscar un registro.
- POST: registrar un nuevo registro.
- PUT: actualizar un registro.
- DELETE: eliminar un registro.

## Instalación y ejecución
1. Descargar o clonar el repositorio.
2. Instalar las dependencias con:

   `npm install`

3. Configurar la conexión a SQL Server.
4. Ejecutar el proyecto con:

   `npm run dev`

5. Abrir en el navegador:

   `http://localhost:3000`

## Endpoints principales

| Módulo | Endpoint |
|---|---|
| Usuarios | /api/usuarios |
| Planes | /api/planes |
| Suscripciones | /api/suscripciones |
| Contenidos | /api/contenidos |
| Reproducciones | /api/reproducciones |
| Pagos | /api/pagos |

## Autor
Proyecto académico - ISIL.