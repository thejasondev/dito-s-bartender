import { defaultLang, isValidLang } from "./translations";
import type { SupportedLanguage } from "./translations";

export function getLanguageFromURL(pathname: string): SupportedLanguage {
  const pathSegments = pathname.split("/").filter(Boolean);
  const maybeLanguage = pathSegments[0];

  return isValidLang(maybeLanguage) ? maybeLanguage : defaultLang;
}

// Elimina el prefijo de idioma de una ruta
export function removeLanguageFromURL(pathname: string): string {
  const pathSegments = pathname.split("/").filter(Boolean);
  const maybeLanguage = pathSegments[0];

  if (isValidLang(maybeLanguage)) {
    return "/" + pathSegments.slice(1).join("/");
  }

  return pathname;
}

// Obtiene la URL correspondiente en el idioma especificado
export function getLocalizedURL(
  currentURL: URL,
  lang: SupportedLanguage
): string {
  const pathname = removeLanguageFromURL(currentURL.pathname);

  if (lang === defaultLang) {
    return pathname;
  }

  return `/${lang}${pathname}`;
}

// Verifica si la URL actual tiene un prefijo de idioma
export function hasLanguagePrefix(pathname: string): boolean {
  const pathSegments = pathname.split("/").filter(Boolean);
  const maybeLanguage = pathSegments[0];

  return isValidLang(maybeLanguage);
}

// Construye una URL completa para un idioma específico
export function buildLocalizedURL(
  baseURL: string,
  lang: SupportedLanguage,
  pathname: string
): URL {
  const url = new URL(baseURL);

  if (lang === defaultLang) {
    url.pathname = pathname;
  } else {
    url.pathname = `/${lang}${pathname}`;
  }

  return url;
}
