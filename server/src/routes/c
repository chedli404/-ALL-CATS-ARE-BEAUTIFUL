import { Router } from "express";

const router = Router();

router.post("/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Send email to team
    const mailOptions = {
      from: process.env.EMAIL_USER || 'noreply@kabila.art',
      to: 'contact@kabila.art',
      subject: `Kabila Contact: ${subject}`,
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background-color: #1a1a1a; color: #ffffff; padding: 20px; border-radius: 10px;">
          <h2 style="color: #64afd6; margin-bottom: 20px;">New Contact Form Submission</h2>
          
          <div style="background-color: #2a2a2a; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #2a2a2a; padding: 20px; border-radius: 8px;">
            <h3 style="color: #64afd6; margin-bottom: 10px;">Message:</h3>
            <p style="line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #333333; text-align: center;">
            <p style="color: #888888; font-size: 12px;">
              Reply to: <a href="mailto:${email}" style="color: #64afd6;">${email}</a>
            </p>
          </div>
        </div>
      `
    };

    // Send confirmation email to user
    const confirmationOptions = {
      from: process.env.EMAIL_USER || 'noreply@kabila.art',
      to: email,
      subject: 'Thank you for contacting Kabila Team',
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background-color: #1a1a1a; color: #ffffff; padding: 20px; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #64afd6; font-size: 28px; margin-bottom: 10px;">Thank You!</h1>
            <h2 style="color: #ffffff; font-size: 20px; margin-bottom: 0;">Hello ${name},</h2>
          </div>
          
          <p style="color: #cccccc; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
            Thank you for reaching out to the Kabila team! We've received your message about "${subject}" and will get back to you within 24-48 hours.
          </p>
          
          <div style="background-color: #2a2a2a; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #64afd6; margin-bottom: 10px;">Your Message:</h3>
            <p style="color: #cccccc; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="border-top: 1px solid #333333; padding-top: 20px; margin-top: 30px; text-align: center;">
            <p style="color: #888888; font-size: 12px; margin-bottom: 5px;">
              In the meantime, explore the post-apocalyptic world of Kabila!
            </p>
            <p style="color: #64afd6; font-size: 14px;">
              <a href="https://kabila.art" style="color: #64afd6; text-decoration: none;">Visit Kabila.art</a>
            </p>
          </div>
        </div>
      `
    };

    // Send email using nodemailer directly
    const nodemailer = await import('nodemailer');
    
    const transporter = nodemailer.default.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: 'kabila.noreply@gmail.com',
        subject: `Kabila Contact: ${subject}`,
        html: mailOptions.html
      });
      
      console.log('Contact form email sent successfully to kabila.noreply@gmail.com');
    } catch (emailError) {
      console.error('Failed to send contact email:', emailError);
    }
    
    console.log('Contact form submission:', { name, email, subject, message });
    res.json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

export default router;