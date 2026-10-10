# Hub de clases Luma | Dropi Medellín

Página única con los 11 líderes de comunidad repartidos en una rueda. Nadie queda de último: el orden se sortea en cada visita y la rueda gira sola.

## Editar el contenido
Todo se cambia en `config.js`: nombre, título de la clase, enlace de Luma, hora, sala, descripción y foto de cada líder.

- **Fotos:** guárdalas en `assets/fotos/` (cuadradas, 400×400 px, .jpg o .webp) y pon la ruta en `foto`, por ejemplo `"assets/fotos/maria.jpg"`. Sin foto se muestran las iniciales.
- **Logo:** guarda el logo blanco de Dropi como `assets/logo-dropi.svg`. Si no está, se muestra el texto "dropi".
- **Tusker Grotesk:** si tienen la fuente, guárdala como `fonts/TuskerGrotesk.woff2`. Si no, se usa Anton.
- **Colores:** en `styles.css`, bloque `:root`.

## Ver en VS Code
Abre la carpeta y usa la extensión **Live Server** (clic derecho en `index.html` → Open with Live Server).

## Publicar en GitHub Pages
1. Crea un repositorio nuevo en github.com y sube todos los archivos de esta carpeta (que `index.html` quede en la raíz).
2. En el repositorio: **Settings → Pages → Source: Deploy from a branch**, rama `main`, carpeta `/ (root)` → Save.
3. En uno o dos minutos queda en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`.

## Enlace directo por líder
Cada clase tiene su propio enlace, que se puede compartir con el botón "Compartir esta clase":
`https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/#lider-1`
El final (`#lider-1`) sale del nombre del líder, o del campo `id` si lo llenas.
