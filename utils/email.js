// utils/email.js
import nodemailer from 'nodemailer';

export const sendResetPasswordEmail = async (email, token) => {
  // Tạo transporter để gửi email
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // Sử dụng dịch vụ Gmail
    auth: {
      user: process.env.EMAIL_USER, // Email của bạn
      pass: process.env.EMAIL_PASS, // Mật khẩu ứng dụng của bạn
    },
  });

  // Tạo liên kết đặt lại mật khẩu
  const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;

  // Cấu hình nội dung email
  const mailOptions = {
    from: process.env.EMAIL_USER, // Email gửi
    to: email, // Email nhận
    subject: 'Reset Your Password', // Tiêu đề email
    html: `
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <a href="${resetUrl}">Reset Password</a>
      <p>If you did not request this, please ignore this email.</p>
    `, // Nội dung email dạng HTML
  };

  // Gửi email
  try {
    await transporter.sendMail(mailOptions);
    console.log('Reset password email sent successfully');
  } catch (error) {
    console.error('Error sending reset password email:', error);
    throw error;
  }
};
