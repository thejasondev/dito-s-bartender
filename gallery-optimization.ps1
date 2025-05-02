# Script para optimizar las imágenes de la galería
$imageFiles = @(
    "bar_wedding.webp",
    "foto1.webp",
    "foto3.webp",
    "foto5.webp",
    "foto6.webp",
    "foto7.webp"
)

# Crear placeholders para las imágenes
foreach ($file in $imageFiles) {
    $basename = $file.Split('.')[0]
    Write-Host "Procesando $file..."
    sharp -i "public/images/$file" -o "public/images/placeholders/$basename-placeholder.webp" resize 20
}

Write-Host "Todos los placeholders han sido creados exitosamente!" 