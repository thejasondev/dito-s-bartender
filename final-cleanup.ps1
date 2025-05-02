# Script para limpiar todas las imágenes innecesarias del proyecto

# 1. Eliminar archivos -optimized.webp (ya que su contenido fue copiado a los archivos principales)
Write-Host "Eliminando archivos optimizados duplicados..."
Get-ChildItem -Path "public\images\*-optimized.webp" | ForEach-Object {
    $fileName = $_.Name
    Write-Host "  Eliminando $fileName"
    Remove-Item $_.FullName -Force
}

# 2. Eliminar todas las copias de respaldo originales
Write-Host "Eliminando archivos de respaldo originales..."
Get-ChildItem -Path "public\images\*-original.webp" | ForEach-Object {
    $fileName = $_.Name
    Write-Host "  Eliminando $fileName"
    Remove-Item $_.FullName -Force
}

# 3. Verificar si hay imágenes que no están siendo utilizadas en el proyecto
$allImagesInPublic = Get-ChildItem -Path "public\images\*.webp" -Exclude "*-placeholder.webp" | Select-Object -ExpandProperty Name

# Imágenes que sabemos que se están utilizando (basado en el análisis del código)
$usedImages = @(
    "header.webp",
    "header-small.webp", 
    "header-medium.webp", 
    "header-placeholder.webp",
    "profile.webp",
    "bar_mobile.webp",
    "exclusive_cocktail.webp",
    "bar_wedding.webp",
    "bartender.webp",
    "cocktail_presentation.webp",
    "themed_event.webp",
    "cocktail.webp",
    "mobile_bar.webp",
    "foto1.webp",
    "foto2.webp",
    "foto3.webp",
    "foto5.webp",
    "foto6.webp",
    "foto7.webp",
    "trago.webp",
    "boda.webp",
    "private_e.webp",
    "wedding_e.webp",
    "corporate_e.webp",
    "themed_p.webp"
)

$unusedImages = $allImagesInPublic | Where-Object { $usedImages -notcontains $_ }

if ($unusedImages.Count -gt 0) {
    Write-Host "Las siguientes imágenes no parecen estar en uso y podrían eliminarse:"
    foreach ($img in $unusedImages) {
        Write-Host "  $img"
    }
    
    Write-Host "¿Deseas eliminar estas imágenes no utilizadas? (S/N)"
    $response = Read-Host
    if ($response -eq "S" -or $response -eq "s") {
        foreach ($img in $unusedImages) {
            Write-Host "  Eliminando $img"
            Remove-Item "public\images\$img" -Force
        }
    }
}

Write-Host "Limpieza completada." 