import {
  Mail,
  Send,
  Phone,
  MapPin,
  Loader2,
  XCircle,
  CheckCircle,
} from "lucide-react";
import clsx from "clsx";
import { useState } from "react";

function AlertMessage({ status }: Readonly<{ status: boolean }>) {
  return (
    <div
      className={clsx("flex items-center mb-4 p-4 rounded-md", {
        "bg-red-100 text-red-700": !status,
        "bg-green-100 text-green-700": status,
      })}
    >
      {status ? (
        <CheckCircle className="w-5 h-5 mr-2" />
      ) : (
        <XCircle className="w-5 h-5 mr-2" />
      )}
      {status
        ? "Message sent successfully!"
        : "An error occurred while sending the message."}
    </div>
  );
}

export function Contact() {
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<boolean | undefined>(
    undefined,
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // TODO: Implement form validation
    // TODO: Implement form submission
    event.preventDefault();
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitStatus(true);
      setTimeout(() => setSubmitStatus(undefined), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus(false);
      setTimeout(() => setSubmitStatus(undefined), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-white-50 to-gray-50 transition-colors duration-300 overflow-hidden relative"
    >
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-4xl font-bold mb-12 text-center section-title fade-in-up">
          Get in Touch
        </h2>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/3 fade-in-up delay-1">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold mb-6">
                Contact Information
              </h3>
              <div className="space-y-6">
                <a
                  href="mailto:bryan.sj175@gmail.com"
                  className="flex items-center text-gray-600 hover:text-blue-400 transition-colors duration-300"
                >
                  <Mail className="w-6 h-6 mr-3 text-blue-400" />
                  bryan.sj175@gmail.com
                </a>
                <a
                  href="tel:+573508119060"
                  className="flex items-center text-gray-600 hover:text-blue-400 transition-colors duration-300"
                >
                  <Phone className="w-6 h-6 mr-3 text-blue-400" />
                  +57 350 811 9060
                </a>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-6 h-6 mr-3 text-blue-400" />
                  Bogotá, Colombia
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-2/3 fade-in-up delay-2">
            <form
              onSubmit={handleSubmit}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              {submitStatus !== undefined && (
                <AlertMessage status={submitStatus} />
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="john.doe@example.com"
                    className="w-full px-4 py-2 rounded-md border  focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>

              <div className="mt-6">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Your message here..."
                  className="w-full px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-300"
                ></textarea>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full bg-rose-400 text-white py-2 px-4 rounded-md hover:bg-rose-500 transition-colors duration-300 flex items-center justify-center"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  ) : (
                    <Send className="w-5 h-5 mr-2" />
                  )}
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
