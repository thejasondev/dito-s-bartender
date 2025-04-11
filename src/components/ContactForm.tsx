import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import emailjs from "@emailjs/browser";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().min(1, "Subject is required"),
  event_type: z.string().min(1, "Please select an event type"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;
export default function ContactForm() {
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
      console.error("Error sending email:", error);
      setStatus({ loading: false, success: false, error: true });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-black">
      {" "}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {" "}
        <div>
          {" "}
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {" "}
            Name{" "}
          </label>{" "}
          <input
            {...register("name")}
            type="text"
            className={`w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />{" "}
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}{" "}
        </div>{" "}
        <div>
          {" "}
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {" "}
            Email{" "}
          </label>{" "}
          <input
            {...register("email")}
            type="email"
            className={`w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />{" "}
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}{" "}
        </div>{" "}
      </div>{" "}
      <div>
        {" "}
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {" "}
          Phone (Optional){" "}
        </label>{" "}
        <input
          {...register("phone")}
          type="tel"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
        />
      </div>
      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Subject
        </label>
        <input
          {...register("subject")}
          type="text"
          className={`w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary ${
            errors.subject ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="event_type"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Event Type
        </label>
        <select
          {...register("event_type")}
          className={`w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary ${
            errors.event_type ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Select an option</option>
          <option value="wedding">Wedding</option>
          <option value="corporate">Corporate</option>
          <option value="private">Private Event</option>
          <option value="themed">Themed Party</option>
          <option value="other">Other</option>
        </select>
        {errors.event_type && (
          <p className="mt-1 text-sm text-red-500">
            {errors.event_type.message}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Message
        </label>
        <textarea
          {...register("message")}
          rows={4}
          className={`w-full px-4 py-2 border rounded-md focus:ring-primary focus:border-primary ${
            errors.message ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={status.loading}
        className="w-full bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-md transition-colors duration-300 disabled:opacity-50"
      >
        {status.loading ? "Sending..." : "Send Message"}
      </button>
      {status.success && (
        <div className="p-4 bg-green-100 text-green-700 rounded-md text-center">
          Message sent successfully!
        </div>
      )}
      {status.error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-md text-center">
          There was an error sending your message. Please try again.
        </div>
      )}
    </form>
  );
}
