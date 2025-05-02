# Script para optimizar las imágenes originales de la galería
$imageFiles = @(
    "mobile_bar.webp",
    "trago.webp",
    "boda.webp",
    "bartender.webp",
    "cocktail.webp",
    "foto2.webp",
    "bar_wedding.webp",
    "foto1.webp",
    "foto3.webp",
    "foto6.webp",
    "foto5.webp",
    "foto7.webp"
)

# Crear versiones optimizadas
foreach ($file in $imageFiles) {
    $basename = $file.Split('.')[0]
    Write-Host "Optimizando $file..."
    
    # Crear una versión optimizada
    sharp -i "public/images/$file" -o "public/images/$basename-optimized.webp" resize 1200 -q 80
    
    # Respaldar la original por si acaso
    Copy-Item "public/images/$file" "public/images/$basename-original.webp" -Force
    
    # Reemplazar la original con la optimizada
    Copy-Item "public/images/$basename-optimized.webp" "public/images/$file" -Force
}

Write-Host "Todas las imágenes han sido optimizadas exitosamente!" 