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
  const verificationUrl = `${process.env.CLIENT_URL || 'http://kabila.art'}/verify/${token}`;
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
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background-color: #1a1a1a; color: #ffffff; padding: 20px; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #64afd6; font-size: 28px; margin-bottom: 10px;">Welcome to Kabila!</h1>
          <h2 style="color: #ffffff; font-size: 20px; margin-bottom: 0;">Hello ${username},</h2>
        </div>
        
        <p style="color: #cccccc; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">Thank you for joining our post-apocalyptic world! Please verify your email address to complete your registration and start your journey.</p>
        
        <div style="text-align: center; margin: 40px 0;">
          <a href="${verificationUrl}" 
             target="_blank"
             style="display: inline-block; background: linear-gradient(135deg, #64afd6 0%, #4a9bc7 100%); color: white; padding: 15px 30px; border-radius: 8px; font-weight: bold; text-decoration: none; font-size: 16px; box-shadow: 0 4px 15px rgba(100, 175, 214, 0.3); transition: all 0.3s ease;">
            🔓 Verify Email Address
          </a>
        </div>
        
        <div style="background-color: #2a2a2a; padding: 20px; border-radius: 8px; margin: 30px 0;">
          <p style="color: #cccccc; margin-bottom: 10px; font-size: 14px;">If the button doesn't work, copy and paste this link:</p>
          <p style="word-break: break-all; background-color: #333333; padding: 10px; border-radius: 5px; font-family: monospace; font-size: 12px;">
            <a href="${verificationUrl}" style="color: #64afd6; text-decoration: none;">${verificationUrl}</a>
          </p>
        </div>
        
        <div style="border-top: 1px solid #333333; padding-top: 20px; margin-top: 30px; text-align: center;">
          <p style="color: #888888; font-size: 12px; margin-bottom: 5px;">This verification link will expire in 24 hours.</p>
          <p style="color: #888888; font-size: 12px;">Welcome to the world of Kabila - where survival meets adventure!</p>
        </div>
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
