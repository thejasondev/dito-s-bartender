interface ImportMetaEnv {
  // Public variables (accessible in client-side code)
  readonly PUBLIC_GA_MEASUREMENT_ID?: string;
  
  // Private variables (only accessible in server-side code)
  readonly EMAILJS_SERVICE_ID: string;
  readonly EMAILJS_TEMPLATE_ID: string;
  readonly EMAILJS_PUBLIC_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}