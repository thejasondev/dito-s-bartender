export interface Translations {
  navigation: {
    home: string;
    services: string;
    about: string;
    gallery: string;
    faq: string;
    contact: string;
    callNow: string;
  };
  footer: {
    services: string;
    privateEvents: string;
    weddings: string;
    corporate: string;
    themedParties: string;
    company: string;
    aboutUs: string;
    faq: string;
    legal: string;
    termsConditions: string;
    privacyPolicy: string;
    cookiePolicy: string;
    allRightsReserved: string;
    description: string;
    needHelp: string;
    call: string;
    message: string;
    businessHours: string;
    monSat: string;
    followUs: string;
  };
  contact: {
    whatsappMessage: string;
  };
  common: {
    language: string;
  };
}

export const defaultLang = "en";
export const languages = ["en", "es"] as const;

export type SupportedLanguage = (typeof languages)[number];

export const isValidLang = (lang: string): lang is SupportedLanguage => {
  return languages.includes(lang as SupportedLanguage);
};

export const translations: Record<SupportedLanguage, Translations> = {
  en: {
    navigation: {
      home: "Home",
      services: "Services",
      about: "About",
      gallery: "Gallery",
      faq: "FAQ",
      contact: "Contact",
      callNow: "Call Now",
    },
    footer: {
      services: "Services",
      privateEvents: "Private Events",
      weddings: "Weddings",
      corporate: "Corporate",
      themedParties: "Themed Parties",
      company: "Company",
      aboutUs: "About Us",
      faq: "FAQ",
      legal: "Legal",
      termsConditions: "Terms & Conditions",
      privacyPolicy: "Privacy Policy",
      cookiePolicy: "Cookie Policy",
      allRightsReserved: "All rights reserved",
      description:
        "Professional mobile bartending service for all types of events. We create unique experiences through custom cocktails and themed bars.",
      needHelp: "Need help?",
      call: "Call",
      message: "Message",
      businessHours: "Business Hours",
      monSat: "Mon-Sat: 9am-9pm",
      followUs: "Follow us",
    },
    contact: {
      whatsappMessage:
        "Hi! I'd like to get more information about your mobile bartending services.\n\nI'm interested in knowing about:\n- Availability\n- Packages and pricing\n- Types of services\n\nThank you for your time!",
    },
    common: {
      language: "Language",
    },
  },
  es: {
    navigation: {
      home: "Inicio",
      services: "Servicios",
      about: "Nosotros",
      gallery: "Galería",
      faq: "Preguntas",
      contact: "Contacto",
      callNow: "Llamar Ahora",
    },
    footer: {
      services: "Servicios",
      privateEvents: "Eventos Privados",
      weddings: "Bodas",
      corporate: "Corporativo",
      themedParties: "Fiestas Temáticas",
      company: "Compañía",
      aboutUs: "Sobre Nosotros",
      faq: "Preguntas Frecuentes",
      legal: "Legal",
      termsConditions: "Términos y Condiciones",
      privacyPolicy: "Política de Privacidad",
      cookiePolicy: "Política de Cookies",
      allRightsReserved: "Todos los derechos reservados",
      description:
        "Servicio profesional de bartender móvil para todo tipo de eventos. Creamos experiencias únicas a través de cócteles personalizados y barras temáticas.",
      needHelp: "¿Necesitas ayuda?",
      call: "Llamar",
      message: "Mensaje",
      businessHours: "Horario de Atención",
      monSat: "Lun-Sáb: 9am-9pm",
      followUs: "Síguenos",
    },
    contact: {
      whatsappMessage:
        "¡Hola! Me gustaría obtener más información sobre sus servicios de bartender móvil.\n\nEstoy interesado en conocer sobre:\n- Disponibilidad\n- Paquetes y precios\n- Tipos de servicios\n\n¡Gracias por su tiempo!",
    },
    common: {
      language: "Idioma",
    },
  },
};

export const getTranslations = (lang: SupportedLanguage): Translations => {
  return translations[lang] || translations[defaultLang];
};
