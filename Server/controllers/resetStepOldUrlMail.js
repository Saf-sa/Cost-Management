// Configure your transporter
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-email@gmail.com",
    pass: "your-password",
  },
});

  // Generate reset token and expiry time
  const resetToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
  user.resetToken = resetToken;
  user.resetTokenExpire = Date.now() + 3600000; // Token expires in 1 hour

  await user.save();

  // Send reset email
  const resetUrl = `http://my-frontend-url/reset-password?token=${resetToken}`;

const mailOptions = {
  from: "expense@salahsafsaf.art", // User Email Id
  to: user.email, // Recepient Email Id
  subject: "Password Reset",
  html: `
    <h2>Hello ${user.firstName},</h2>
    <p>You requested a password reset. Please click on the link below to reset your password:</p>
    <a href="${resetUrl}">Reset Password</a>
    <p>If you did not request a password reset, please ignore this email.</p>
  `,
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("Email error:", error);
    res.status(500).json({ message: "Failed to send reset email" });
  } else {
    console.log("Email sent:", info.response);
    res.status(200).json({ message: "Reset token sent to your email" });
  }
});
