# Script para optimizar las imágenes de la página de servicios
$imageFiles = @(
    "private_e.webp",
    "wedding_e.webp",
    "corporate_e.webp",
    "themed_p.webp"
)

# Crear placeholders para las imágenes
foreach ($file in $imageFiles) {
    $basename = $file.Split('.')[0]
    Write-Host "Procesando $file para crear placeholder..."
    sharp -i "public/images/$file" -o "public/images/placeholders/$basename-placeholder.webp" resize 20
}

# Optimizar las imágenes originales
foreach ($file in $imageFiles) {
    $basename = $file.Split('.')[0]
    Write-Host "Optimizando $file..."
    
    # Crear una versión optimizada
    sharp -i "public/images/$file" -o "public/images/$basename-optimized.webp" resize 1200 -q 80
    
    # Respaldar la original por si acaso (si no existe ya un respaldo)
    $backupPath = "public/images/$basename-original.webp"
    if (-not (Test-Path $backupPath)) {
        Write-Host "  Respaldando original..."
        Copy-Item "public/images/$file" $backupPath -Force
    }
    
    # Reemplazar la original con la optimizada
    Copy-Item "public/images/$basename-optimized.webp" "public/images/$file" -Force
}

Write-Host "Todas las imágenes de servicios han sido optimizadas exitosamente!" 