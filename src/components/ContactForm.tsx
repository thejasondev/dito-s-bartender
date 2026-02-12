import { useState, useEffect, memo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// ─── i18n Dictionary ───────────────────────────────────────────────
const i18n = {
  en: {
    name: "Name",
    namePlaceholder: "Your name",
    nameRequired: "Name is required",
    nameInvalid:
      "Name should only contain letters, spaces and basic punctuation",
    email: "Email",
    emailPlaceholder: "example@domain.com",
    emailInvalid: "Invalid email address",
    emailTooLong: "Email address is too long",
    phone: "Phone (Optional)",
    phonePlaceholder: "(123) 456-7890",
    phoneInvalid: "Phone number contains invalid characters",
    subject: "Subject",
    subjectPlaceholder: "Inquiry about your services",
    subjectRequired: "Subject is required",
    subjectTooLong: "Subject is too long",
    eventType: "Event Type",
    eventTypeRequired: "Please select an event type",
    message: "Message",
    messagePlaceholder: "Tell us about your event and requirements...",
    messageMin: "Message must be at least 10 characters",
    messageMax: "Message cannot exceed 2000 characters",
    submit: "Send Message",
    sending: "Sending...",
    successTitle: "Message sent successfully!",
    successMessage: "We'll get back to you as soon as possible.",
    errorTitle: "Error sending message",
    errorMessage: "Please try again or contact us directly by phone.",
    eventTypes: [
      {
        value: "wedding",
        label: "Wedding",
        description: "Celebrate your special day",
      },
      {
        value: "corporate",
        label: "Corporate",
        description: "Professional events",
      },
      {
        value: "private",
        label: "Private",
        description: "Intimate gatherings",
      },
      { value: "themed", label: "Themed", description: "Unique celebrations" },
      { value: "other", label: "Other", description: "Custom events" },
    ],
  },
  es: {
    name: "Nombre",
    namePlaceholder: "Tu nombre",
    nameRequired: "El nombre es obligatorio",
    nameInvalid:
      "El nombre solo debe contener letras, espacios y signos básicos",
    email: "Email",
    emailPlaceholder: "ejemplo@dominio.com",
    emailInvalid: "Dirección de email inválida",
    emailTooLong: "La dirección de email es demasiado larga",
    phone: "Teléfono (Opcional)",
    phonePlaceholder: "(123) 456-7890",
    phoneInvalid: "El número de teléfono contiene caracteres inválidos",
    subject: "Asunto",
    subjectPlaceholder: "Consulta sobre sus servicios",
    subjectRequired: "El asunto es obligatorio",
    subjectTooLong: "El asunto es demasiado largo",
    eventType: "Tipo de Evento",
    eventTypeRequired: "Por favor selecciona un tipo de evento",
    message: "Mensaje",
    messagePlaceholder: "Cuéntanos sobre tu evento y requerimientos...",
    messageMin: "El mensaje debe tener al menos 10 caracteres",
    messageMax: "El mensaje no puede exceder 2000 caracteres",
    submit: "Enviar Mensaje",
    sending: "Enviando...",
    successTitle: "¡Mensaje enviado con éxito!",
    successMessage: "Nos pondremos en contacto lo antes posible.",
    errorTitle: "Error al enviar el mensaje",
    errorMessage:
      "Por favor intenta de nuevo o contáctanos directamente por teléfono.",
    eventTypes: [
      {
        value: "wedding",
        label: "Boda",
        description: "Celebra tu día especial",
      },
      {
        value: "corporate",
        label: "Corporativo",
        description: "Eventos profesionales",
      },
      { value: "private", label: "Privado", description: "Reuniones íntimas" },
      {
        value: "themed",
        label: "Temático",
        description: "Celebraciones únicas",
      },
      { value: "other", label: "Otro", description: "Eventos personalizados" },
    ],
  },
} as const;

type Locale = keyof typeof i18n;

// ─── Event Type Icons (shared across locales) ──────────────────────
const eventIcons: Record<string, React.ReactNode> = {
  wedding: (
    <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  ),
  corporate: (
    <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    </svg>
  ),
  private: (
    <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  ),
  themed: (
    <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
      />
    </svg>
  ),
  other: (
    <svg
      className="w-8 h-8"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
      />
    </svg>
  ),
};

// ─── Reusable UI Components ────────────────────────────────────────
const FormInput = memo(
  ({
    label,
    error,
    icon,
    ...props
  }: {
    label: string;
    error?: string;
    icon?: React.ReactNode;
    [key: string]: any;
  }) => (
    <div>
      <label
        htmlFor={props.id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-500">
            {icon}
          </div>
        )}
        <input
          {...props}
          className={`w-full ${
            icon ? "pl-12" : "px-4"
          } py-3 border-2 rounded-md transition-all duration-300 
        focus:ring-2 focus:ring-primary/20 focus:outline-none focus:border-primary hover:border-primary
        ${error ? "border-red-500" : "border-gray-300"}`}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-500" id={`${props.id}-error`}>
          {error}
        </p>
      )}
    </div>
  ),
);

const EventTypeSelector = memo(
  ({
    label,
    error,
    options,
    value,
    onChange,
    ...props
  }: {
    label: string;
    error?: string;
    options: Array<{
      value: string;
      label: string;
      icon: React.ReactNode;
      description: string;
    }>;
    value: string;
    onChange: (value: string) => void;
    [key: string]: any;
  }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        {label}
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`relative p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 hover:shadow-md group
              ${
                value === option.value
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-gray-300 hover:border-primary/50 bg-white"
              }
            `}
          >
            <div className="flex flex-col items-center text-center space-y-2">
              <div
                className={`transition-colors duration-300 ${
                  value === option.value
                    ? "text-primary"
                    : "text-gray-500 group-hover:text-primary"
                }`}
              >
                {option.icon}
              </div>
              <span
                className={`text-sm font-medium transition-colors duration-300 ${
                  value === option.value ? "text-primary" : "text-gray-700"
                }`}
              >
                {option.label}
              </span>
              {value === option.value && (
                <div className="absolute top-2 right-2">
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-500" id={`${props.id}-error`}>
          {error}
        </p>
      )}
    </div>
  ),
);

const StatusMessage = memo(
  ({
    type,
    title,
    message,
  }: {
    type: "success" | "error";
    title: string;
    message: string;
  }) => (
    <div
      className={`p-4 ${
        type === "success"
          ? "bg-green-100 text-green-700 border-green-300"
          : "bg-red-100 text-red-700 border-red-300"
      } rounded-md text-center border`}
      style={{ animation: "contactFadeIn 0.3s ease-out forwards" }}
    >
      <div className="flex items-center justify-center mb-1">
        {type === "success" ? (
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
        <span className="font-medium">{title}</span>
      </div>
      <p className="text-sm">{message}</p>
    </div>
  ),
);

// ─── Schema Factory ────────────────────────────────────────────────
function createFormSchema(t: (typeof i18n)["en"]) {
  return z.object({
    name: z
      .string()
      .min(2, t.nameRequired)
      .regex(/^[a-zA-ZÀ-ÿ\s\.\-\']+$/, t.nameInvalid),
    email: z.string().email(t.emailInvalid).max(100, t.emailTooLong),
    phone: z
      .string()
      .optional()
      .refine((val) => !val || /^[0-9\+\-\(\)\s]{7,20}$/.test(val), {
        message: t.phoneInvalid,
      }),
    subject: z.string().min(1, t.subjectRequired).max(100, t.subjectTooLong),
    event_type: z.string().min(1, t.eventTypeRequired),
    message: z.string().min(10, t.messageMin).max(2000, t.messageMax),
  });
}

type FormData = z.infer<ReturnType<typeof createFormSchema>>;

// ─── Main Component ────────────────────────────────────────────────
const ContactForm = ({ locale = "en" }: { locale?: Locale }) => {
  const t = i18n[locale];
  const formSchema = createFormSchema(t);

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: false,
  });
  const [selectedEventType, setSelectedEventType] = useState("");
  const [mountTimestamp] = useState(() => Date.now());

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  // Inject minimal CSS for animation (once only)
  useEffect(() => {
    const styleId = "contact-form-styles";
    if (document.getElementById(styleId)) return;
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      @keyframes contactFadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @media (max-width: 640px) {
        .contact-form input, .contact-form textarea { font-size: 16px; }
      }
    `;
    document.head.appendChild(style);
  }, []);

  const eventTypeOptions = t.eventTypes.map((et) => ({
    ...et,
    icon: eventIcons[et.value],
  }));

  const onSubmit = async (data: FormData) => {
    setStatus({ loading: true, success: false, error: false });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone || "",
          subject: data.subject,
          event_type: data.event_type,
          message: data.message,
          _timestamp: mountTimestamp,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send email");
      }

      setStatus({ loading: false, success: true, error: false });
      reset();
      setSelectedEventType("");

      // Google Analytics event
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "form_submission", {
          event_category: "Contact",
          event_label: data.event_type,
          value: 1,
        });
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setStatus({ loading: false, success: false, error: true });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="contact-form space-y-6 text-black"
    >
      {/* Honeypot — invisible to users, bots will fill it */}
      <div
        style={{
          position: "absolute",
          left: "-9999px",
          opacity: 0,
          height: 0,
          overflow: "hidden",
        }}
        aria-hidden="true"
      >
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FormInput
          {...register("name")}
          id="name"
          label={t.name}
          type="text"
          placeholder={t.namePlaceholder}
          autoComplete="name"
          error={errors.name?.message}
        />
        <FormInput
          {...register("email")}
          id="email"
          label={t.email}
          type="email"
          placeholder={t.emailPlaceholder}
          autoComplete="email"
          spellCheck="false"
          error={errors.email?.message}
        />
      </div>

      <FormInput
        {...register("phone")}
        id="phone"
        label={t.phone}
        type="tel"
        placeholder={t.phonePlaceholder}
        autoComplete="tel"
        icon={
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
            />
          </svg>
        }
        error={errors.phone?.message}
      />

      <FormInput
        {...register("subject")}
        id="subject"
        label={t.subject}
        type="text"
        placeholder={t.subjectPlaceholder}
        autoComplete="off"
        error={errors.subject?.message}
      />

      <EventTypeSelector
        label={t.eventType}
        options={eventTypeOptions}
        value={selectedEventType}
        onChange={(value) => {
          setSelectedEventType(value);
          register("event_type").onChange({
            target: { value, name: "event_type" },
          });
        }}
        error={errors.event_type?.message}
      />
      <input
        type="hidden"
        {...register("event_type")}
        value={selectedEventType}
      />

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {t.message}
        </label>
        <textarea
          {...register("message")}
          id="message"
          rows={4}
          className={`w-full px-4 py-3 border-2 rounded-md transition-all duration-300 
          focus:ring-2 focus:ring-primary/20 focus:outline-none focus:border-primary 
          hover:border-primary ${
            errors.message ? "border-red-500" : "border-gray-300"
          }`}
          placeholder={t.messagePlaceholder}
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
        disabled={isSubmitting}
        className="w-full bg-primary hover:bg-primary-dark text-white font-semibold 
        px-6 py-3 rounded-md transition-all duration-300 disabled:opacity-50 
        shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
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
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            {t.sending}
          </div>
        ) : (
          t.submit
        )}
      </button>

      {status.success && (
        <StatusMessage
          type="success"
          title={t.successTitle}
          message={t.successMessage}
        />
      )}

      {status.error && (
        <StatusMessage
          type="error"
          title={t.errorTitle}
          message={t.errorMessage}
        />
      )}
    </form>
  );
};

export default memo(ContactForm);
