const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, html) => {
  try {
    // ✅ support both styles (safe)
    let emailTo = to;
    let emailSubject = subject;
    let emailHtml = html;

    if (typeof to === "object") {
      emailTo = to.to;
      emailSubject = to.subject;
      emailHtml = to.html;
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // APP PASSWORD
      },
    });

    await transporter.verify();

    await transporter.sendMail({
      from: `"CollabCode AI" <${process.env.EMAIL_USER}>`,
      to: emailTo,
      subject: emailSubject,
      html: emailHtml,
    });

    console.log("✅ Verification email sent to:", emailTo);
  } catch (err) {
    console.error("❌ Email send error:", err.message);
    throw err; // 🔥 important
  }
};

module.exports = sendEmail;
