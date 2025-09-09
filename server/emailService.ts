import nodemailer from 'nodemailer';
import crypto from 'crypto';

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
});

export const generateVerificationToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

export const sendVerificationEmail = async (email: string, username: string, token: string) => {
  const verificationUrl = `${process.env.CLIENT_URL || 'http://localhost:5000'}/verify/${token}`;
  console.log('Verification URL:', verificationUrl);
  console.log('Email config:', {
    user: process.env.EMAIL_USER,
    passLength: process.env.EMAIL_PASS?.length,
    clientUrl: process.env.CLIENT_URL
  });
  
  const mailOptions = {
    from: process.env.EMAIL_USER || 'noreply@kabila.com',
    to: email,
    subject: 'Verify Your Email - Kabila',
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <h2 style="color: #64afd6;">Welcome to Kabila, ${username}!</h2>
        <p>Thank you for registering. Please verify your email address to complete your registration.</p>
        <div style="text-align: center; margin: 30px 0;">
          <button 
  style="background-color: #64afd6; color: white; padding: 12px 24px; border: none; border-radius: 5px; font-weight: bold; cursor: pointer;"
  onclick="window.location.href='${verificationUrl}'">
  Verify Email Address
</button>        </div>
        <p>If the button doesn't work, click this link:</p>
        <p><a href="${verificationUrl}" style="color: #64afd6; text-decoration: underline;">${verificationUrl}</a></p>
        <p style="color: #666; font-size: 12px;">This link will expire in 24 hours.</p>
      </div>
    `
  };

  try {
    console.log('Attempting to send email to:', email);
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    console.log('Verification email sent to:', email);
  } catch (error) {
    console.error('DETAILED EMAIL ERROR:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    throw error;
  }
};