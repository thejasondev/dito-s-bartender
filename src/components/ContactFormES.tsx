import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from "@emailjs/browser";

const formSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre es obligatorio")
    .regex(
      /^[a-zA-ZÀ-ÿ\s\.\-\']+$/,
      "El nombre solo debe contener letras, espacios y signos básicos"
    ),
  email: z
    .string()
    .email("Dirección de correo electrónico inválida")
    .max(100, "La dirección de correo es demasiado larga"),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9\+\-\(\)\s]{7,20}$/.test(val), {
      message: "El número de teléfono contiene caracteres inválidos",
    }),
  subject: z
    .string()
    .min(1, "El asunto es obligatorio")
    .max(100, "El asunto es demasiado largo"),
  event_type: z.string().min(1, "Por favor selecciona un tipo de evento"),
  message: z
    .string()
    .min(10, "El mensaje debe tener al menos 10 caracteres")
    .max(2000, "El mensaje no puede exceder 2000 caracteres"),
});

type FormData = z.infer<typeof formSchema>;
export default function ContactFormES() {
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: false,
  });

  useEffect(() => {
    // Inicializar EmailJS
    emailjs.init(import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(formSchema) });

  const onSubmit = async (data: FormData) => {
    setStatus({ loading: true, success: false, error: false });
    try {
      await emailjs.send(
        import.meta.env.PUBLIC_EMAILJS_SERVICE_ID,
        import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          from_name: data.name,
          from_email: data.email,
          to_email: "ditosbartender@gmail.com",
          phone: data.phone,
          subject: data.subject,
          event_type: data.event_type,
          message: data.message,
        },
        import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY
      );
      setStatus({ loading: false, success: true, error: false });
      reset();

      // Enviar evento a Google Analytics
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "form_submission", {
          event_category: "Contact",
          event_label: data.event_type,
          value: 1,
        });
      }
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      setStatus({ loading: false, success: false, error: true });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-black">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nombre
          </label>
          <input
            {...register("name")}
            type="text"
            id="name"
            className={`w-full px-4 py-3 border-2 rounded-md transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:outline-none focus:border-primary hover:border-primary ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Tú nombre"
            autoComplete="name"
            aria-describedby={errors.name && "name-error"}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500" id="name-error">
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            className={`w-full px-4 py-3 border-2 rounded-md transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:outline-none focus:border-primary hover:border-primary ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="ejemplo@dominio.com"
            autoComplete="email"
            spellCheck="false"
            aria-describedby={errors.email && "email-error"}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500" id="email-error">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Teléfono (Opcional)
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              ></path>
            </svg>
          </div>
          <input
            {...register("phone")}
            type="tel"
            id="phone"
            className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-md transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:outline-none focus:border-primary hover:border-primary"
            placeholder="(123) 456-7890"
            autoComplete="tel"
            aria-describedby={errors.phone && "phone-error"}
          />
        </div>
        {errors.phone && (
          <p className="mt-1 text-sm text-red-500" id="phone-error">
            {errors.phone?.message}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Asunto
        </label>
        <input
          {...register("subject")}
          type="text"
          id="subject"
          className={`w-full px-4 py-3 border-2 rounded-md transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:outline-none focus:border-primary hover:border-primary ${
            errors.subject ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Consulta sobre sus servicios"
          autoComplete="off"
          aria-describedby={errors.subject && "subject-error"}
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-red-500" id="subject-error">
            {errors.subject.message}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="event_type"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Tipo de Evento
        </label>
        <div className="relative">
          <select
            {...register("event_type")}
            id="event_type"
            className={`w-full px-4 py-3 border-2 rounded-md bg-white text-gray-700 appearance-none cursor-pointer transition-all duration-300 hover:border-primary focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none custom-select ${
              errors.event_type ? "border-red-500" : "border-gray-300"
            }`}
            defaultValue=""
            aria-describedby={errors.event_type && "event-type-error"}
          >
            <option value="" disabled>
              Selecciona una opción
            </option>
            <option value="wedding" className="py-2 hover:bg-primary/10">
              Boda
            </option>
            <option value="corporate" className="py-2 hover:bg-primary/10">
              Corporativo
            </option>
            <option value="private" className="py-2 hover:bg-primary/10">
              Evento Privado
            </option>
            <option value="themed" className="py-2 hover:bg-primary/10">
              Fiesta Temática
            </option>
            <option value="other" className="py-2 hover:bg-primary/10">
              Otro
            </option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 bg-primary text-white rounded-r-md">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
        </div>
        {errors.event_type && (
          <p className="mt-1 text-sm text-red-500" id="event-type-error">
            {errors.event_type.message}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Mensaje
        </label>
        <textarea
          {...register("message")}
          id="message"
          rows={4}
          className={`w-full px-4 py-3 border-2 rounded-md transition-all duration-300 focus:ring-2 focus:ring-primary/20 focus:outline-none focus:border-primary hover:border-primary ${
            errors.message ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Cuéntanos sobre tu evento y requisitos..."
          aria-describedby={errors.message && "message-error"}
          maxLength={2000}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500" id="message-error">
            {errors.message.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={status.loading}
        className="w-full bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-md transition-colors duration-300 disabled:opacity-50 shadow-md hover:shadow-lg"
      >
        {status.loading ? (
          <div className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Enviando...
          </div>
        ) : (
          "Enviar Mensaje"
        )}
      </button>
      {status.success && (
        <div className="p-4 bg-green-100 text-green-700 rounded-md text-center border border-green-300">
          <div className="flex items-center justify-center mb-1">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <span className="font-medium">¡Mensaje enviado con éxito!</span>
          </div>
          <p className="text-sm">Te responderemos lo antes posible.</p>
        </div>
      )}
      {status.error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-md text-center border border-red-300">
          <div className="flex items-center justify-center mb-1">
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span className="font-medium">Error al enviar el mensaje</span>
          </div>
          <p className="text-sm">
            Por favor, inténtalo de nuevo o contáctanos directamente por
            teléfono.
          </p>
        </div>
      )}
    </form>
  );
}

const globalStyles = `
  .custom-select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23A97142'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.5rem center;
    background-size: 1.5em 1.5em;
    padding-right: 2.5rem;
  }
  
  select {
    color-scheme: light;
  }
  
  @-moz-document url-prefix() {
    select {
      color: #4a5568;
      padding-right: 2.5rem;
      background-color: #fff;
    }
  }
  
  select option {
    background-color: white;
    color: #4a5568;
    padding: 0.75rem 1rem;
  }
  
  /* Estilo para opciones al pasar el cursor o enfocar */
  select option:hover, 
  select option:focus {
    background-color: rgba(169, 113, 66, 0.1) !important;
    color: #a97142 !important;
  }
  
  /* Estilo para opción seleccionada */
  select option:checked {
    background-color: rgba(169, 113, 66, 0.2) !important;
    color: #a97142 !important;
    font-weight: bold;
  }
  
  /* Override browser default option hover style */
  select option:hover {
    background-color: rgba(169, 113, 66, 0.1) !important;
    color: #a97142 !important;
    box-shadow: 0 0 10px 100px rgba(169, 113, 66, 0.1) inset !important;
    -webkit-appearance: none;
  }
  
  /* Additional support for Webkit browsers */
  @media screen and (-webkit-min-device-pixel-ratio:0) {
    select option:hover {
      background-color: rgba(169, 113, 66, 0.1) !important;
    }
    
    select {
      -webkit-appearance: none;
    }
  }
`;

if (typeof document !== "undefined") {
  // Solo ejecutar en el cliente
  const style = document.createElement("style");
  style.textContent = globalStyles;
  document.head.appendChild(style);
}
