# Mokepon

Juego web de combate entre Mokepones. Elige una mascota, recorre el mapa y enfréntate a los Mokepones de otros jugadores conectados al mismo servidor.
# CERTIFICADO
https://platzi.com/p/maicolmontoya.c2007/curso/3208-course/diploma/detalle/

## Requisitos

- [Node.js](https://nodejs.org/) y npm.
- Un navegador moderno.
- Para jugar con otra persona, ambos deben acceder al juego y al servidor de la misma computadora o red.

## Instalación y ejecución

El juego tiene dos partes: el servidor de partidas y la página web. Inicia cada una en una terminal distinta desde la carpeta del proyecto.

### 1. Instalar dependencias

```bash
npm install
```

### 2. Iniciar el servidor del juego

```bash
node index.js
```

El servidor queda disponible en `http://localhost:8080`. Mantén esta terminal abierta mientras juegas.

### 3. Abrir la página

Sirve la carpeta del proyecto con una de estas opciones:

- En Visual Studio Code, abre `mokepon.html` con la extensión **Live Server**.
- O inicia un servidor estático desde la carpeta del proyecto:

  ```bash
  py -m http.server 5500
  ```

  Si el comando `py` no está disponible, prueba `python -m http.server 5500`.

Después abre `http://localhost:5500/mokepon.html` en el navegador. No abras el archivo directamente con `file://`.

Para jugar contra otra persona, abre la misma dirección en otro navegador o dispositivo. Ambos deben estar conectados al mismo servidor del juego; si se juega desde otro dispositivo, sustituye `localhost` por la dirección IP de la computadora que ejecuta el servidor. El servidor actualmente está configurado para ejecutarse en el puerto `8080`.

## Cómo jugar

1. Selecciona **Hipodoge**, **Capipepo** o **Ratigueya** y pulsa **Seleccionar**.
2. Recorre el mapa hasta chocar con el Mokepon de otro jugador.
3. Mueve a tu Mokepon con las flechas del teclado o con los botones de dirección en pantalla.
4. Al comenzar el combate, elige cinco ataques. Cada botón representa uno de los ataques disponibles para tu mascota.
5. Compara los resultados de las rondas. Fuego vence a Tierra, Tierra vence a Agua y Agua vence a Fuego; ataques iguales empatan.
6. Pulsa **Reiniciar** para volver a empezar.

## Estructura del proyecto

| Archivo o carpeta | Descripción |
| --- | --- |
| `mokepon.html` | Página y secciones de selección, mapa y combate. |
| `css.css` | Estilos y diseño adaptable. |
| `js/mokepon.js` | Lógica del juego, mapa, controles y comunicación con el servidor. |
| `index.js` | Servidor Express y gestión de jugadores, posiciones y ataques. |
| `assets/` | Imágenes del mapa y de los Mokepones. |

## Notas

- El servidor usa memoria para guardar la partida: los jugadores se pierden al detenerlo o reiniciarlo.
- La comunicación con el servidor apunta a `http://localhost:8080`; para alojar el juego en otro equipo o servidor, esa dirección debe ajustarse en `js/mokepon.js`.
- No hay pruebas automatizadas configuradas actualmente.
