# Hub de clases Luma | Dropi Medellín

Página única con los 11 líderes de comunidad repartidos en una rueda alrededor del robot de Dropi. Nadie queda de último: el orden se sortea en cada visita y la rueda gira sola. Los ojos del robot miran al líder que la persona elige.

## Editar el contenido
Todo se cambia en `config.js`: nombre, título de la clase, enlace de Luma, fecha, hora, descripción y foto de cada líder.

- **Fotos:** la rueda usa recortes cuadrados centrados en la cara, en `assets/fotos/avatares/` (400×400 px, .webp, ~15 KB cada uno). Las piezas originales de Luma siguen en `assets/fotos/` pero la página ya no las carga; se pueden borrar para aligerar el repositorio. Para un líder nuevo, recorta un cuadrado centrado en la cara y pon la ruta en `foto`.
- **Textos del encabezado:** `tituloLinea1`, `tituloLinea2`, `subtitulo` y `fechaGeneral` (opcional) en `config.js`.
- **Tusker Grotesk:** para que quede igual a las piezas, convierte a .woff2 la versión ancha y pesada (la de "MEDELLÍN") y guárdala como `fonts/TuskerGrotesk-Ancha.woff2`, y la condensada (la de "DONDE EL ECOMMERCE FLORECE") como `fonts/TuskerGrotesk-Angosta.woff2`. Mientras no estén, se usan Archivo Expanded Black y Anton de Google Fonts.
- **Colores:** en `styles.css`, bloque `:root`.
- **Fondo:** degradado naranja + texturas de línea sacadas de los backings (`assets/textura-medellin.webp` y `assets/textura-flores-arriba.webp`) + grano. La intensidad se ajusta con `opacity` en `.bg-ciudad`, `.bg-flores` y `.bg-grano`.

## El robot del centro
Está en `assets/robot/`: `robot-base.webp` es la cabeza sin ojos, `robot-ojo-izq.webp` y `robot-ojo-der.webp` son los ojos recortados, y `robot-visor-mascara.png` evita que los ojos se salgan del vidrio cuando se mueven. Cuánto se mueven los ojos se ajusta en `styles.css`, regla `.eyes`.

## Ver en VS Code
Abre la carpeta y usa la extensión **Live Server** (clic derecho en `index.html` → Open with Live Server). Ábrelo siempre así y no con doble clic en el archivo: el navegador bloquea la máscara del visor cuando la página se abre como archivo local y los ojos no se ven. En Live Server y en GitHub Pages funciona bien.

## Publicar en GitHub Pages
1. Crea un repositorio nuevo en github.com y sube todos los archivos de esta carpeta (que `index.html` quede en la raíz).
2. En el repositorio: **Settings → Pages → Source: Deploy from a branch**, rama `main`, carpeta `/ (root)` → Save.
3. En uno o dos minutos queda en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`.

## Enlace directo por líder
Cada clase tiene su propio enlace, que se puede compartir con el botón "Compartir esta clase":
`https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/#lider-1`
El final (`#lider-1`) sale del nombre del líder, o del campo `id` si lo llenas.
