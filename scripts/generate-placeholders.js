import sharp from "sharp";
import { promises as fs } from "fs";
import { resolve, join, basename } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = fileURLToPath(new URL(".", import.meta.url));

async function generatePlaceholder(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .resize(20) // Hacer la imagen muy pequeña
      .blur(10) // Aplicar desenfoque
      .webp({ quality: 20 }) // Convertir a webp con baja calidad
      .toFile(outputPath);

    console.log(`✅ Generado placeholder para: ${basename(inputPath)}`);
  } catch (error) {
    console.error(`❌ Error procesando ${inputPath}:`, error);
  }
}

async function processImages() {
  const cocktailsDir = resolve(
    __dirname,
    "..",
    "public",
    "images",
    "cocktails"
  );
  const placeholdersDir = resolve(
    __dirname,
    "..",
    "public",
    "images",
    "placeholders"
  );

  try {
    console.log("📂 Directorio de cócteles:", cocktailsDir);
    console.log("📂 Directorio de placeholders:", placeholdersDir);

    // Asegurarse de que existe el directorio de placeholders
    await fs.mkdir(placeholdersDir, { recursive: true });

    // Leer todos los archivos de cócteles
    const files = await fs.readdir(cocktailsDir);
    console.log(`🔍 Encontrados ${files.length} archivos para procesar`);

    // Procesar cada imagen
    for (const file of files) {
      if (file.endsWith(".webp")) {
        const inputPath = join(cocktailsDir, file);
        const outputName = file.replace(".webp", "-placeholder.webp");
        const outputPath = join(placeholdersDir, outputName);

        await generatePlaceholder(inputPath, outputPath);
      }
    }

    console.log("✨ Proceso completado");
  } catch (error) {
    console.error("❌ Error general:", error);
    console.error(error);
  }
}

processImages();
