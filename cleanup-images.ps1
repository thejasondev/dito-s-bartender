# Script para limpiar archivos de imágenes duplicados o innecesarios

# 1. Eliminar archivos -optimized.webp (ya que su contenido fue copiado a los archivos principales)
Write-Host "Eliminando archivos optimizados duplicados..."
Get-ChildItem -Path "public\images\*-optimized.webp" | ForEach-Object {
    $fileName = $_.Name
    Write-Host "  Eliminando $fileName"
    Remove-Item $_.FullName -Force
}

# 2. Eliminar imágenes grandes no utilizadas
$unusedImages = @(
    "themed_p.webp",
    "corporate_e.webp", 
    "private_e.webp",
    "wedding_e.webp"
)

foreach ($file in $unusedImages) {
    $path = "public\images\$file"
    if (Test-Path $path) {
        Write-Host "Eliminando imagen no utilizada: $file"
        Remove-Item $path -Force
    } else {
        Write-Host "Archivo no encontrado: $file"
    }
}

# Opcionalmente, descomenta estas líneas si quieres eliminar los archivos originales de respaldo
<#
Write-Host "¿Deseas eliminar también los archivos de respaldo originales? (S/N)"
$response = Read-Host
if ($response -eq "S" -or $response -eq "s") {
    Write-Host "Eliminando archivos de respaldo originales..."
    Get-ChildItem -Path "public\images\*-original.webp" | ForEach-Object {
        $fileName = $_.Name
        Write-Host "  Eliminando $fileName"
        Remove-Item $_.FullName -Force
    }
}
#>

Write-Host "Limpieza completada."
Write-Host "NOTA: Los archivos de respaldo (-original.webp) se han mantenido por seguridad."
Write-Host "      Puedes eliminarlos manualmente cuando confirmes que todo funciona correctamente." 