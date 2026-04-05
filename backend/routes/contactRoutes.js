import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "Please provide all fields (name, email, message)." });
    }

    try {
        // Create a Nodemailer transporter using SMTP
        const transporter = nodemailer.createTransport({
            service: "gmail", // You can use other services or host/port config
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Set up email data
        const mailOptions = {
            from: `"${name}" <${process.env.EMAIL_USER}>`, // Best practice: 'from' should be your authenticated email
            replyTo: email, // This allows you to reply directly to the sender
            to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER, // Sends to yourself by default
            subject: `New Contact Request from ${name}`,
            text: `You received a new message from your RepoIQ contact form.\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`,
            html: `<p>You received a new message from your <strong>RepoIQ</strong> contact form.</p>
                   <p><strong>Name:</strong> ${name}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br>')}</p>`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        res.status(200).json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Failed to send email. Ensure your .env credentials are correct (EMAIL_USER and EMAIL_PASS)." });
    }
});

export default router;
