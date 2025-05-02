# Script para optimizar las imágenes de la galería de la página principal
$imageFiles = @(
    "bar_mobile.webp",
    "exclusive_cocktail.webp",
    "cocktail_presentation.webp",
    "themed_event.webp"
)

# Crear placeholders para las imágenes
foreach ($file in $imageFiles) {
    $basename = $file.Split('.')[0]
    Write-Host "Procesando $file..."
    sharp -i "public/images/$file" -o "public/images/placeholders/$basename-placeholder.webp" resize 20
}

# Optimizar las imágenes originales que aún no han sido optimizadas
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