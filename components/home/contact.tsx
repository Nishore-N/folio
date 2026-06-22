// Copyright NISHORE N 2024. All Rights Reserved.
// Project: folio
// Author contact: nagakalpanish2004@gmail.com
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { useState } from "react";
import styles from "../common/Button.module.scss";
import { EMAIL } from "../../constants";

type FormStatus = "idle" | "loading" | "success" | "error";

const ContactSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setStatusMessage("");

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setStatusMessage("Your message was sent! I'll get back to you soon 🚀");
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        setStatus("error");
        setStatusMessage(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setStatusMessage("Network error. Please check your connection and try again.");
    }
  };

  return (
    <section className="section-container relative flex flex-col justify-center pt-11 pb-16" id="contact" style={{ scrollMarginTop: "2.9rem" }}>
      <div className="flex flex-col w-full">
        <h2 className="section-heading mb-8">Get In Touch</h2>
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start w-full">
          {/* Left Side: Glassmorphic Card */}
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl w-full lg:w-1/2 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#2193b0] rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-[#6dd5ed] rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            
            <form className="flex flex-col gap-6 w-full relative z-10" onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row gap-6 w-full">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded py-3 px-4 focus:outline-none focus:border-[#2193b0] text-white transition-colors duration-300"
                  required
                  disabled={status === "loading"}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-900/50 border border-gray-700 rounded py-3 px-4 focus:outline-none focus:border-[#2193b0] text-white transition-colors duration-300"
                  required
                  disabled={status === "loading"}
                />
              </div>
              <input
                type="tel"
                placeholder="Phone No."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-gray-900/50 border border-gray-700 rounded py-3 px-4 focus:outline-none focus:border-[#2193b0] text-white transition-colors duration-300"
                disabled={status === "loading"}
              />
              <textarea
                placeholder="Message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-gray-900/50 border border-gray-700 rounded py-3 px-4 focus:outline-none focus:border-[#2193b0] text-white transition-colors duration-300 resize-none"
                required
                disabled={status === "loading"}
              ></textarea>

              {/* Status Message */}
              {statusMessage && (
                <div
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    status === "success"
                      ? "bg-green-500/10 border border-green-500/30 text-green-400"
                      : "bg-red-500/10 border border-red-500/30 text-red-400"
                  }`}
                >
                  <span className="text-lg">{status === "success" ? "✅" : "❌"}</span>
                  {statusMessage}
                </div>
              )}

              <div className="flex justify-start w-full mt-2">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className={`py-3 px-8 font-medium rounded text-base md:text-xl tracking-wide duration-300 flex items-center justify-center gap-3 w-full md:w-auto ${styles.primary} ${
                    status === "loading" ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {status === "loading" ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5"
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
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Side: Description and Images */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center lg:py-8">
            <h3 className="text-3xl md:text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              Let&apos;s build something awesome together!
            </h3>
            <p className="text-gray-300 text-lg md:text-xl mb-10 leading-relaxed font-light">
              Whether you have a question, a project in mind, or just want to say hi, I&apos;ll try my best to get back to you! My inbox is always open for new opportunities, creative ideas, and collaborations.
            </p>
            
            <div className="flex flex-col space-y-6">
              <div className="flex items-center group">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mr-4 group-hover:bg-[#2193b0]/20 transition-colors duration-300">
                  <svg className="w-6 h-6 text-white group-hover:text-[#6dd5ed] transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <p className="text-sm text-gray-400 uppercase tracking-wider mb-1">Email</p>
                  <a href={`mailto:${EMAIL}`} className="text-lg md:text-xl font-medium hover:text-[#6dd5ed] transition-colors duration-300">{EMAIL}</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Center Placed Scroll Indicator */}
        <div className="flex flex-col items-center justify-center mt-8 w-full text-gray-400">
          <span className="text-sm uppercase tracking-wider mb-6">More ways to connect below</span>
          <button 
            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
            className="w-16 h-16 bg-white/5 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center hover:bg-[#2193b0]/20 hover:border-[#2193b0]/50 transition-all duration-300 focus:outline-none shadow-xl group animate-bounce"
            aria-label="Scroll to bottom"
          >
            <svg className="w-8 h-8 text-[#2193b0] group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
