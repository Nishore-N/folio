require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);
const CONTACT_EMAIL = process.env.CONTACT_EMAIL;

app.post("/api/send-email", async (req, res) => {
  const { name, email, message, phone } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: "Name, email and message are required." });
  }

  try {
    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [CONTACT_EMAIL],
      replyTo: email,
      subject: `New message from ${name} via Portfolio`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #e2e8f0; padding: 32px; border-radius: 12px; border: 1px solid #1e293b;">
          <h2 style="color: #6dd5ed; font-size: 24px; margin-bottom: 8px;">New Portfolio Message 📬</h2>
          <p style="color: #94a3b8; margin-bottom: 24px;">You received a new message through your portfolio contact form.</p>
          
          <div style="background: #1e293b; border-radius: 8px; padding: 20px; margin-bottom: 16px;">
            <p style="margin: 0 0 8px 0; color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">From</p>
            <p style="margin: 0; font-size: 18px; font-weight: 600; color: #f1f5f9;">${name}</p>
          </div>

          <div style="background: #1e293b; border-radius: 8px; padding: 20px; margin-bottom: 16px;">
            <p style="margin: 0 0 8px 0; color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</p>
            <a href="mailto:${email}" style="margin: 0; font-size: 16px; color: #6dd5ed; text-decoration: none;">${email}</a>
          </div>

          ${phone ? `
          <div style="background: #1e293b; border-radius: 8px; padding: 20px; margin-bottom: 16px;">
            <p style="margin: 0 0 8px 0; color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Phone</p>
            <a href="tel:${phone}" style="margin: 0; font-size: 16px; color: #6dd5ed; text-decoration: none;">${phone}</a>
          </div>
          ` : ''}

          <div style="background: #1e293b; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
            <p style="margin: 0 0 8px 0; color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
            <p style="margin: 0; font-size: 16px; color: #f1f5f9; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>

          <a href="mailto:${email}?subject=Re: Your message via Portfolio" 
             style="display: inline-block; background: linear-gradient(135deg, #2193b0, #6dd5ed); color: #0f172a; font-weight: 700; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-size: 14px;">
            Reply to ${name}
          </a>

          <p style="margin-top: 32px; color: #475569; font-size: 12px;">Sent via NISHORE N's Portfolio — ${new Date().toLocaleDateString("en-IN", { dateStyle: "long" })}</p>
        </div>
      `,
    });

    res.status(200).json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Resend error:", error);
    res.status(500).json({ success: false, message: "Failed to send message. Please try again." });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
