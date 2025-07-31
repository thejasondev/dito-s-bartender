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

async function processMenuImages() {
  const menuDir = resolve(__dirname, "..", "public", "images", "menu's");
  const placeholdersDir = resolve(
    __dirname,
    "..",
    "public",
    "images",
    "placeholders",
    "menus"
  );

  try {
    console.log("📂 Directorio de menús:", menuDir);
    console.log("📂 Directorio de placeholders:", placeholdersDir);

    // Asegurarse de que existe el directorio de placeholders
    await fs.mkdir(placeholdersDir, { recursive: true });

    // Leer todos los archivos de menús (solo webp)
    const files = (await fs.readdir(menuDir)).filter((file) =>
      file.endsWith(".webp")
    );
    console.log(`🔍 Encontrados ${files.length} archivos para procesar`);

    // Procesar cada imagen
    for (const file of files) {
      const inputPath = join(menuDir, file);
      const outputPath = join(
        placeholdersDir,
        file.replace(".webp", "-placeholder.webp")
      );

      await generatePlaceholder(inputPath, outputPath);
    }

    console.log("✨ Proceso completado");
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

processMenuImages();
