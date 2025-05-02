# Optimización de imágenes para Dito's Bartender

Este documento contiene instrucciones para la optimización de imágenes en el proyecto, especialmente para la imagen del héroe que necesita cargarse lo más rápido posible.

## Estructura de imágenes optimizadas

Para la imagen del héroe, necesitamos crear diferentes versiones:

1. **header-placeholder.webp**: Versión muy pequeña (10-20KB) y borrosa que se muestra inmediatamente
2. **header-small.webp**: Para dispositivos móviles (640px de ancho, ~100KB)
3. **header-medium.webp**: Para tabletas (1024px de ancho, ~200KB)
4. **header.webp**: Para escritorio (1920px de ancho, máximo 500KB)

## Comandos para optimizar imágenes

### Usando Sharp (Node.js)

```bash
# Instalar sharp
npm install -g sharp-cli

# Crear el placeholder (imagen borrosa, muy pequeña)
sharp -i public/images/header.webp -o public/images/header-placeholder.webp resize 20 --blur 10 --grayscale

# Crear versión móvil
sharp -i public/images/header.webp -o public/images/header-small.webp resize 640 -q 80

# Crear versión tablet
sharp -i public/images/header.webp -o public/images/header-medium.webp resize 1024 -q 80

# Optimizar versión escritorio
sharp -i public/images/header.webp -o public/images/header.webp resize 1920 -q 80
```

### Usando Squoosh (WebUI)

1. Visita https://squoosh.app/
2. Arrastra y suelta la imagen
3. Configura las opciones de compresión (WebP con calidad 75-85%)
4. Ajusta el tamaño de la imagen según las necesidades
5. Descarga las versiones optimizadas

### Usando ImageMagick

```bash
# Instalar ImageMagick
# En Windows: scoop install imagemagick
# En Mac: brew install imagemagick
# En Linux: sudo apt install imagemagick

# Crear placeholder
magick public/images/header.webp -resize 20x -blur 0x5 -quality 50 public/images/header-placeholder.webp

# Crear versión móvil
magick public/images/header.webp -resize 640x -quality 80 public/images/header-small.webp

# Crear versión tablet
magick public/images/header.webp -resize 1024x -quality 80 public/images/header-medium.webp

# Optimizar versión escritorio
magick public/images/header.webp -resize 1920x -quality 80 public/images/header.webp
```

## Mejores prácticas generales para optimización de imágenes

1. **Siempre usa formato WebP**: Ofrece mejor compresión que JPEG/PNG manteniendo buena calidad
2. **Especifica dimensiones**: Siempre incluye atributos width/height para evitar CLS (Cumulative Layout Shift)
3. **Implementa carga progresiva**: Usa imágenes de baja resolución como placeholder
4. **Sirve imágenes responsivas**: Usa srcset y sizes para diferentes dispositivos
5. **Prioriza imágenes críticas**: Usa fetchpriority="high" y preload para imágenes above-the-fold
6. **Comprime eficientemente**: Balance entre calidad (75-85%) y tamaño para optimizar rendimiento
7. **Limita el peso total**: Imagen del héroe idealmente <500KB, placeholders <20KB

## Herramientas adicionales recomendadas

- **WebP Express**: Plugin para WordPress que convierte automáticamente imágenes
- **Cloudinary/Imgix**: Servicios CDN con optimización automática de imágenes
- **TinyPNG/TinyJPG**: Servicio online para compresión de imágenes sin pérdida perceptible
- **ImageOptim**: Aplicación para Mac que optimiza imágenes
- **Squoosh**: Herramienta web de Google para compresión de imágenes
