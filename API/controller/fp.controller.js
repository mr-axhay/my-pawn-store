import nodemailer from "nodemailer";

const ForgetPassword = async (req, res) => {
  try {
    const email = req.body.email;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587, // ✅ IMPORTANT
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      family: 4, // 🚀 FORCE IPv4 (MAIN FIX)
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Link For Forget Password PawnShop",
      html: `
        <h1>Welcome to Pawn Shop</h1>
        <h2>Click below to Reset Password</h2>
        <a href='${process.env.FRONTEND_URL}/reset-password/${encodeURIComponent(email)}'>
          Click to reset password
        </a>
      `,
    };

    await transporter.sendMail(mailOptions);

    console.log("✅ Email sent successfully");
    res.status(200).json({ message: "Reset link sent" });

  } catch (error) {
    console.error("❌ Email Error:", error);

    res.status(500).json({
      message: "Failed to send email",
      error: error.message,
    });
  }
};

export default ForgetPassword;