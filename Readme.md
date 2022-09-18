## Tabla de contenido

- [Tabla de contenido](#tabla-de-contenido)
- [Información general](#información-general)
  - [Capturas](#capturas)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Autores](#autores)
- [FAQ's](#faqs)
- [Licencia](#licencia)

## Información general

---

Este proyecto consiste en una aplicación que permite reservar una sala de juntas con un horario específico, para ello se debe ingresar el salón que se desea reservar, la hora de inicio y la hora de fin. La aplicación permite ver las reservaciones que se han realizado por el mismo usuario, teniendo la opción de terminar la reservación, o de eliminarla.
Así como las mismas reservaciones se terminan de manera automática cuando se acaba el tiempo de la reservación.

El proyecto se creó con la herramienta Vite y se utilizó la librería de React para el desarrollo de la aplicación.
Este proyecto en específico se encarga de la parte del front end, el cual se conecta con el back end para poder realizar las reservaciones y muestra de forma gráfica las reservaciones que se han realizado.

La totalidad del proyecto está desarrollado en React, utilizando el framework de Material UI para el diseño de la aplicación, así como parte de Bootstrap 4, Ant Design y para las peticiones HTTP se utilizó la librería Axios.

### Capturas

<div align="center">

<img src="https://user-images.githubusercontent.com/8833858/190926479-3cc2bd00-f9d1-433b-9d67-a9d4b1af2672.png"  align="left" width="300px" height="300px" />

<img src="https://user-images.githubusercontent.com/8833858/190926510-9441b27b-e83c-4f3c-a8ed-4a06ca6d196c.png" width="400px" height="200px"/>

<img src="https://user-images.githubusercontent.com/8833858/190926534-eaccc404-28e6-4ee1-a72e-7ea3976f54ff.png" width="400px" height="200px" style="margin-top:15px"/>

<img src="https://user-images.githubusercontent.com/8833858/190926555-d7ef53e8-4e91-47d0-b963-0415fe560221.png" align="left" width="400px" height="200px" style="margin-top:15px"/>

<img src="https://user-images.githubusercontent.com/8833858/190926573-7770e4d3-2cfe-4522-97d5-3057516fd1c2.png" width="400px" height="200px" style="margin-top:15px"/>
</div>

## Tecnologías

---

Una lista de tecnologías utilizadas dentro del proyecto:

- [ReactJS](https://reactjs.org/docs/getting-started.html): Version 18.2.0
- [Ant Design](https://ant.design/docs/react/introduce): Version 4.23.1
- [Bootstrap](https://getbootstrap.com/docs/4.6/getting-started/introduction/): Version 4.6.0
- [Material UI](https://material-ui.com/): Version 5.10.5
- [Axios](https://axios-http.com/docs/intro): Version 0.21.2
- [Vite](https://vitejs.dev/guide/): Version 2.7.6
- [React Router](https://reactrouter.com/web/guides/quick-start): Version 6.4.0

## Instalación

---

Para poder correr el proyecto se debe tener instalado Docker y Docker Compose.
A continuación se muestran los pasos para poder correr el proyecto:

```
$ git clone https://github.com/Y1sus/saladejuntas-front.git
$ cd saladejuntas-front
$ docker-compose up -d --build
```

Si todo va bien, la aplicación se estará ejecutando en el puerto 3000.
Para poder probar la API, ingresar al navegador en la siguiente ruta: `http://localhost:3000/` y se verá la página de login de la aplicación.

## Autores

---

[@Jesús Montalvo](https://github.com/Y1sus/)

## FAQ's

---

1. **¿Cómo puedo contribuir al proyecto?**

   - Puedes contribuir al proyecto haciendo un fork del repositorio y creando un pull request con tus cambios.

2. **¿Cómo puedo contactar al autor?**

   - Puedes contactar al autor a través de su correo electrónico:
     ```
     chuy_ronald@hotmail.com
     ```

3. **¿Cómo puedo reportar un error o sugerencia?**

   - Puedes reportar un error o sugerencia a través de la sección de [issues](https://github.com/Y1sus/saladejuntas-front/issues "issues") del repositorio.

## Licencia

---

[MIT](https://choosealicense.com/licenses/mit/)
