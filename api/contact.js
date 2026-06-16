import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Please fill in all required fields.' });
  }

  // Create transporter using environment variables from Vercel
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'alaghattadarshan@gmail.com',
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER || 'alaghattadarshan@gmail.com',
      subject: `Portfolio Contact: ${subject || 'New Inquiry'}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <br/>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    
    return res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ success: false, error: 'Failed to send message.' });
  }
}
