import { useState } from "react";

const emptyForm = { name: "", email: "", message: "" };

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) errors.email = "Please enter your email.";
  else if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.email = "Please enter a valid email address.";
  if (values.message.trim().length < 10) errors.message = "Your message should be at least 10 characters.";
  return errors;
}

export default function Contact() {
  const [values, setValues] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }));
    setSent(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    // No backend endpoint for messages yet - this is where you'd POST it.
    setSent(true);
    setValues(emptyForm);
  }

  return (
    <section className="page-section">
      <div className="container">
        <div className="section-heading text-center">
          <p className="section-subtitle">We'd Love To Hear From You</p>
          <h2>Contact Us</h2>
          <p className="section-description">
            Questions about an order or a product? Send us a message and we'll get back to you.
          </p>
        </div>

        <div className="row g-4">
          <div className="col-lg-5">
            <div className="contact-card">
              <div className="contact-row">
                <i className="bi bi-telephone"></i>
                <div><span>Call Us</span><a href="tel:+919876543210">+91 98765 43210</a></div>
              </div>
              <div className="contact-row">
                <i className="bi bi-envelope"></i>
                <div><span>Email Us</span><a href="mailto:support@shopnest.com">support@shopnest.com</a></div>
              </div>
              <div className="contact-row">
                <i className="bi bi-clock"></i>
                <div><span>Support Hours</span><p>Mon - Sat, 9 AM - 6 PM</p></div>
              </div>
            </div>
          </div>

          <div className="col-lg-7">
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              {sent && (
                <div className="form-success" role="status">
                  <i className="bi bi-check-circle"></i> Thanks! Your message has been sent.
                </div>
              )}

              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" value={values.name} onChange={handleChange}
                className={errors.name ? "invalid" : ""} />
              {errors.name && <small className="field-error">{errors.name}</small>}

              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" value={values.email} onChange={handleChange}
                className={errors.email ? "invalid" : ""} />
              {errors.email && <small className="field-error">{errors.email}</small>}

              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" value={values.message} onChange={handleChange}
                className={errors.message ? "invalid" : ""} />
              {errors.message && <small className="field-error">{errors.message}</small>}

              <button type="submit" className="place-order-btn contact-submit">
                <i className="bi bi-send"></i> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
