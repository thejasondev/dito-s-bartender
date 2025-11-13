import { useState, useEffect, memo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Componentes de UI reutilizables
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
  )
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
    options: Array<{ value: string; label: string; icon: React.ReactNode; description: string }>;
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
              ${value === option.value 
                ? 'border-primary bg-primary/5 shadow-md' 
                : 'border-gray-300 hover:border-primary/50 bg-white'
              }
            `}
          >
            <div className="flex flex-col items-center text-center space-y-2">
              <div className={`transition-colors duration-300 ${
                value === option.value ? 'text-primary' : 'text-gray-500 group-hover:text-primary'
              }`}>
                {option.icon}
              </div>
              <span className={`text-sm font-medium transition-colors duration-300 ${
                value === option.value ? 'text-primary' : 'text-gray-700'
              }`}>
                {option.label}
              </span>
              {value === option.value && (
                <div className="absolute top-2 right-2">
                  <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
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
  )
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
      } rounded-md text-center border animate-fadeIn`}
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
  )
);

// Esquema de validación
const formSchema = z.object({
  name: z
    .string()
    .min(2, "Name is required")
    .regex(
      /^[a-zA-ZÀ-ÿ\s\.\-\']+$/,
      "Name should only contain letters, spaces and basic punctuation"
    ),
  email: z
    .string()
    .email("Invalid email address")
    .max(100, "Email address is too long"),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^[0-9\+\-\(\)\s]{7,20}$/.test(val), {
      message: "Phone number contains invalid characters",
    }),
  subject: z
    .string()
    .min(1, "Subject is required")
    .max(100, "Subject is too long"),
  event_type: z.string().min(1, "Please select an event type"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message cannot exceed 2000 characters"),
});

const eventTypeOptions = [
  { 
    value: "wedding", 
    label: "Wedding",
    description: "Celebrate your special day",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )
  },
  { 
    value: "corporate", 
    label: "Corporate",
    description: "Professional events",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  },
  { 
    value: "private", 
    label: "Private",
    description: "Intimate gatherings",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  { 
    value: "themed", 
    label: "Themed",
    description: "Unique celebrations",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    )
  },
  { 
    value: "other", 
    label: "Other",
    description: "Custom events",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    )
  },
];

type FormData = z.infer<typeof formSchema>;

const ContactForm = () => {
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: false,
  });
  const [selectedEventType, setSelectedEventType] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange", // Validación en tiempo real
  });

  // No need for useEffect with EmailJS initialization anymore

  const onSubmit = async (data: FormData) => {
    setStatus({ loading: true, success: false, error: false });
    try {
      // Send data to secure API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone || '',
          subject: data.subject,
          event_type: data.event_type,
          message: data.message,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send email');
      }

      setStatus({ loading: false, success: true, error: false });
      reset();
      setSelectedEventType('');

      // Google Analytics event
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "form_submission", {
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-black">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FormInput
          {...register("name")}
          id="name"
          label="Name"
          type="text"
          placeholder="Your name"
          autoComplete="name"
          error={errors.name?.message}
        />
        <FormInput
          {...register("email")}
          id="email"
          label="Email"
          type="email"
          placeholder="example@domain.com"
          autoComplete="email"
          spellCheck="false"
          error={errors.email?.message}
        />
      </div>

      <FormInput
        {...register("phone")}
        id="phone"
        label="Phone (Optional)"
        type="tel"
        placeholder="(123) 456-7890"
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
        label="Subject"
        type="text"
        placeholder="Inquiry about your services"
        autoComplete="off"
        error={errors.subject?.message}
      />

      <EventTypeSelector
        label="Event Type"
        options={eventTypeOptions}
        value={selectedEventType}
        onChange={(value) => {
          setSelectedEventType(value);
          register("event_type").onChange({ target: { value, name: "event_type" } });
        }}
        error={errors.event_type?.message}
      />
      <input type="hidden" {...register("event_type")} value={selectedEventType} />

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Message
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
          placeholder="Tell us about your event and requirements..."
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
            Sending...
          </div>
        ) : (
          "Send Message"
        )}
      </button>

      {status.success && (
        <StatusMessage
          type="success"
          title="Message sent successfully!"
          message="We'll get back to you as soon as possible."
        />
      )}

      {status.error && (
        <StatusMessage
          type="error"
          title="Error sending message"
          message="Please try again or contact us directly by phone."
        />
      )}
    </form>
  );
};

export default memo(ContactForm);

// Estilos globales para el select personalizado
const globalStyles = `
  .custom-select {
    background-image: none !important;
    background-repeat: no-repeat;
    background-position: right 0.5rem center;
    background-size: 1.5em 1.5em;
    padding-right: 3rem;
  }
  
  .select-custom {
    -webkit-appearance: none !important;
    -moz-appearance: none !important;
    appearance: none !important;
  }

  .select-custom::-ms-expand {
    display: none;
  }

  .select-custom:focus {
    outline: none !important;
    box-shadow: 0 0 0 2px rgba(var(--color-primary-rgb), 0.2) !important;
    border-color: var(--color-primary) !important;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out forwards;
  }
  
  select {
    color-scheme: light;
  }
  
  @-moz-document url-prefix() {
    select.select-custom {
      color: #4a5568;
      padding-right: 3rem;
      background-color: #fff;
      -webkit-appearance: none !important;
      -moz-appearance: none !important;
      appearance: none !important;
    }
  }
  
  select.select-custom option {
    background-color: white;
    color: #4a5568;
    padding: 0.75rem 1rem;
  }
  
  select.select-custom option:hover, 
  select.select-custom option:focus {
    background-color: rgba(var(--color-primary-rgb), 0.1) !important;
    color: var(--color-primary) !important;
  }
  
  select.select-custom option:checked {
    background-color: rgba(var(--color-primary-rgb), 0.2) !important;
    color: var(--color-primary) !important;
    font-weight: bold;
  }
  
  @media screen and (-webkit-min-device-pixel-ratio:0) {
    select.select-custom {
      -webkit-appearance: none !important;
    }
  }
  
  @media (max-width: 640px) {
    input, select, textarea {
      font-size: 16px;
    }
  }
`;

if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = globalStyles;
  document.head.appendChild(style);
}
