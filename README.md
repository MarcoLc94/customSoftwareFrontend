# Marco Dev

Portafolio y sitio de servicios construido con Astro. HTML estático, CSS adaptable e interacciones pequeñas sin React, Three.js ni fuentes de iconos.

## Desarrollo

Requiere Node.js 22.12 o superior (versión sugerida en `.nvmrc`).

```sh
nvm use
npm ci
npm run dev
```

## Verificación y publicación

```sh
npm run build
npm run preview
```

`build` ejecuta la comprobación de tipos de Astro y genera el sitio en `dist/`. Publica esa carpeta en tu alojamiento estático. Configura Node 22 y el comando `npm run build` en el proveedor. Elimina cualquier regla antigua de SPA que reescriba todas las rutas a `/index.html`: cada URL ahora tiene su propio HTML. Usa `404.html` para páginas inexistentes.

## Contenido

- `src/pages/index.astro`: portada.
- `src/data.ts`: servicios, proceso y contacto.
- `src/components/Projects.astro`: proyectos y enlaces originales.
- `src/styles/global.css`: diseño y adaptación móvil.
- `src/layouts/Layout.astro`: navegación, pie y metadatos por página.
- `src/assets/`: imágenes transformadas a WebP con tamaños adaptables por Astro.
- `public/sitemap.xml`: actualizar cuando se agreguen o eliminen rutas.
- `public/social-cover.png`: imagen para compartir en redes.

Se conservan las rutas existentes y el texto de las páginas legales. Estas páginas no constituyen una revisión legal. El sitio nuevo no carga Meta Pixel ni Google Analytics. El formulario de contacto prepara un mensaje de WhatsApp; no envía mensajes ni almacena datos por su cuenta. Sin JavaScript, envía el campo de descripción a WhatsApp mediante GET.

El inicio funciona sin JavaScript. El menú usa `details` y las preguntas frecuentes son nativas. El JavaScript mejora el cierre del menú, compone el mensaje de contacto y añade apariciones suaves y parallax de escritorio. El movimiento respeta `prefers-reduced-motion`; el parallax se detiene fuera de pantalla y no usa un bucle permanente. No hay fuentes remotas, splash, renderizado 3D ni animaciones que oculten contenido.

La ilustración principal es una composición HTML/CSS, no una captura ni resultados atribuidos a un cliente. Las tarjetas de proyectos conservan los recursos y enlaces proporcionados por el portafolio anterior.
