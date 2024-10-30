# SYS-FRONTEND

Proyecto web que consume los endpoints del API REST SYS-BACKEND

## Descripción

Este proyecto fue creado con [Vite] (https://vite.dev/) es una herramienta de compilación que tiene como objetivo proporcionar una experiencia de desarrollo más rápida y ágil para proyectos web modernos.

## Tecnologías utilizadas

- React
- Typescript
- Tailwind

## Prerrequisitos

1. Puerto 3000 debe estar disponible.
2. Antes de comenzar, asegúrate de tener instalados los siguientes requisitos:

- [Node.js](https://nodejs.org/dist/v20.18.0/node-v20.18.0-x64.msi) (versión 20 latest)
- [npm](https://www.npmjs.com/) o [Yarn](https://yarnpkg.com/)
- [TypeScript](https://www.typescriptlang.org/) (globalmente instalado)


## Instalación

1. Clonar el repositorio:

```bash
   git clone https://github.com/enunez-dev/sys-frontend.git
   cd <NOMBRE_DEL_PROYECTO>
```

2. Instalar dependencias:

```bash
    npm install
    # o si prefieres Yarn
    yarn install
```

3. Ejecutar el proyecto en modo desarrollo:

```bash
    npm run dev
    # o con Yarn
    yarn dev
```

## Despliegue con Jenkins (WINDOWS)
**Prerequisitos**:
- [Node.js](https://nodejs.org/dist/v20.18.0/node-v20.18.0-x64.msi) (versión 20 latest)
- **Instalacion de pm2**: PM2  es un administrador de procesos para aplicaciones Node.js que permite ejecutar y gestionar aplicaciones en producción.

    ```bash
    npm install pm2 -g
    ```
    Luego de instalar y cada vez que se reinicie el servidor ejecutar
    ```bash
    pm2 list
    ```
    Crear directorio .pm2
    ```bash
    cd C:\\tools & mkdir .pm2
    ```

## Despliegue con Jenkins (Windows)

### Prerrequisitos

- [Node.js](https://nodejs.org/dist/v20.18.0/node-v20.18.0-x64.msi) (versión 20 o más reciente)
- **Nginx**: Necesario para servir la aplicación en modo producción. Configura Nginx en un directorio base, como `C:\nginx\`.

### Configuración de Nginx

Actualiza el archivo de configuración `nginx.conf` ubicado en `C:\nginx\conf\nginx.conf` con el siguiente contenido para servir la aplicación en el puerto 3000:

```nginx
server {
    listen       3000;
    server_name  localhost;

    location / {
        root   html/sys-frontend;
        index  index.html index.htm;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }
}
```

## Uso

Una vez en funcionamiento, el proyecto web estará disponible en http://localhost:3000 (o el puerto configurado). A continuación, se encuentran ejemplos de las rutas:

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE para más detalles.
