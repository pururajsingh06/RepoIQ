import { useState } from "react";
import axios from "axios";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      await axios.post("/api/contact", formData);
      setStatus("success");
      setFormData({ name: "", email: "", message: "" }); // Reset form
      
      // Clear success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error(error);
      setStatus("error");
      setErrorMessage(error.response?.data?.error || "Failed to send message. Please try again.");
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-card">
        <h1 className="contact-title">Get in Touch</h1>
        <p className="contact-subtitle">Have a question or feedback? We'd love to hear from you.</p>

        {status === "success" && (
          <div style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#4ade80', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid rgba(34, 197, 94, 0.2)' }}>
            Thank you! Your message has been sent successfully.
          </div>
        )}

        {status === "error" && (
          <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#f87171', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            {errorMessage}
          </div>
        )}

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input 
              type="text" 
              id="name" 
              placeholder="John Doe" 
              className="contact-input" 
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              placeholder="john@example.com" 
              className="contact-input" 
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Your Message</label>
            <textarea 
              id="message" 
              placeholder="How can we help?" 
              className="contact-textarea" 
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <button 
            className="contact-btn" 
            disabled={status === "loading"}
            style={{ opacity: status === "loading" ? 0.7 : 1 }}
          >
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;