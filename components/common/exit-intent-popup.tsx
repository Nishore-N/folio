import React, { useEffect, useState } from "react";
import { gsap } from "gsap";

const ExitIntentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Show when cursor moves to the top of the browser window (trying to close tab or change URL)
      if (e.clientY <= 0) {
        if (!hasShown) {
          setIsVisible(true);
          setHasShown(true);
        }
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [hasShown]);

  useEffect(() => {
    if (isVisible) {
      gsap.fromTo(
        "#exit-popup-content",
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
      );
      gsap.fromTo(
        "#exit-popup-bg",
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
    }
  }, [isVisible]);

  if (!isVisible) return null;

  const handleClose = () => {
    gsap.to("#exit-popup-content", {
      y: 20,
      opacity: 0,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.in"
    });
    gsap.to("#exit-popup-bg", {
      opacity: 0,
      duration: 0.3,
      onComplete: () => setIsVisible(false)
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setStatusMessage("");

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Portfolio Visitor",
          email,
          message: "I am interested in connecting. Reaching out via the Exit Intent Popup.",
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setStatusMessage("Thanks! I'll be in touch soon.");
        setEmail("");
        // close popup after a delay
        setTimeout(() => {
          handleClose();
        }, 2500);
      } else {
        setStatus("error");
        setStatusMessage(data.message || "Failed to send. Please try again.");
      }
    } catch {
      setStatus("error");
      setStatusMessage("Network error. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-auto">
      <div
        id="exit-popup-bg"
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      ></div>
      <div
        id="exit-popup-content"
        className="relative bg-black border border-gray-800 text-white p-10 md:p-14 rounded-2xl max-w-3xl w-[90%] text-center shadow-2xl"
      >
        <button
          className="link cursor-none absolute top-4 right-4 md:top-6 md:right-6 text-gray-500 hover:text-white transition-colors"
          onClick={handleClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-wider leading-tight text-gradient">
          Let's Build Something<br />Amazing Together
        </h2>
        <p className="text-gray-400 text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Drop your email below and I'll get back to you, or feel free to reach out directly to discuss potential collaborations.
        </p>
        <form
          className="flex flex-col sm:flex-row items-center bg-[#1a1a1a] rounded-full p-2 mb-4 w-full max-w-lg mx-auto border border-gray-800"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading" || status === "success"}
            placeholder="Enter your email address"
            className="link cursor-none bg-transparent border-none text-white px-6 py-3 w-full outline-none placeholder-gray-500 disabled:opacity-50"
            required
          />
          <button
            type="submit"
            disabled={status === "loading" || status === "success" || !email.includes("@")}
            className="link cursor-none text-white font-semibold py-3 px-8 rounded-full whitespace-nowrap hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(33,147,176,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: "linear-gradient(90deg, #6dd5ed 0%, #2193b0 100%)" }}
          >
            {status === "loading" ? "Sending..." : "Let's Connect"}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </form>
        {statusMessage && (
          <p className={`text-sm mb-4 font-medium ${status === "success" ? "text-green-400" : "text-red-400"}`}>
            {statusMessage}
          </p>
        )}
        <p className="text-gray-600 text-xs tracking-[0.2em] uppercase font-semibold">
          I'll get back to you within 24 hours.
        </p>
      </div>
    </div>
  );
};

export default ExitIntentPopup;
