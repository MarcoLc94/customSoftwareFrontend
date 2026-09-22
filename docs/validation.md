# Verificación de la migración

Fecha: 22 de septiembre de 2026. Build estático servido localmente con `astro preview`.

Estos resultados son de laboratorio local, no de PageSpeed Insights en producción. La red, compresión, caché y configuración del alojamiento pueden cambiar las métricas. Las puntuaciones no garantizan posicionamiento en buscadores.

| Métrica | Móvil | Escritorio |
| --- | --- | --- |
| Performance | 100 | 100 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |
| First Contentful Paint | 0.8 s | 0.2 s |
| Largest Contentful Paint | 1.1 s | 0.3 s |
| Total Blocking Time | 0 ms | 0 ms |
| Cumulative Layout Shift | 0 | 0 |
| Avoids enormous network payloads | Total size was 96 KiB | Total size was 74 KiB |

## Comprobaciones realizadas

- Astro: 0 errores, 0 advertencias; 12 páginas generadas.
- Navegación de todas las rutas de contenido y canonical individual.
- Sin desbordamiento horizontal en 360, 390, 768 y 1440 píxeles.
- Menú móvil, preguntas frecuentes y preparación del mensaje de WhatsApp. La prueba interceptó el destino; no se envió ningún mensaje.
- Contenido inicial visible con JavaScript desactivado.
- Parallax de escritorio y cancelación de animaciones al activar movimiento reducido.
- Axe WCAG A/AA: sin infracciones detectadas en inicio, servicios, proceso, contacto y privacidad. No sustituye una revisión manual completa.
- Dependencias: 0 vulnerabilidades conocidas tras actualizar js-yaml.
- JavaScript de inicio inline: aproximadamente 1,9 KiB sin comprimir.

Se conservan algunas sugerencias no bloqueantes de Lighthouse sobre CSS crítico y entrega de imágenes de escritorio. El sitio debe medirse nuevamente en producción.

## Publicación

Node 22.12 o superior; `npm ci` y `npm run build`; publicar `dist/`. El alojamiento debe servir cada ruta estática y usar `404.html` para rutas inexistentes. Quitar el fallback global de la SPA anterior. Se mantienen las URLs originales.
