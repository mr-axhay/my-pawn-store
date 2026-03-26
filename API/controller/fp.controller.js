import nodemailer from "nodemailer";

const ForgetPassword = (req, res) => {
  const email = req.body.email;
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Link For ForgetPassword PawnShop",
    html: `
  <h1>Welcome to Pawn Shop</h1>
  <h2>Click below to Reset Password</h2>
  <a href='${process.env.FRONTEND_URL}/reset-password/${encodeURIComponent(email)}'>
    Click to reset password
  </a>
`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).json({ status: true });
    }
  });
};
export default ForgetPassword;
