import { useState } from "react";
import "./contactForm.css";
import { Button } from "../button/button";

export default function ContactForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    if (!form.message.trim()) newErrors.message = "Message is required.";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    console.log("Submitted:", form);
  };

  const handleReset = () => {
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    });
    setErrors({});
  };

  return (
    <div className="c-form-card">
      <div className="c-form-card__header">
        <h2 className="c-form-card__title">Contact Us</h2>
        <p className="c-form-card__description">Send us a quick message.</p>
      </div>

      <div className="c-form-card__content">
        <form onSubmit={handleSubmit}>
          <div className="c-field-group">
            {/* First Name */}
            <div className="c-field">
              <label htmlFor="firstName" className="c-field__label">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                className="c-form-input"
                value={form.firstName}
                onChange={handleChange}
              />
              {errors.firstName && (
                <span className="c-field__error">{errors.firstName}</span>
              )}
            </div>

            {/* Last Name */}
            <div className="c-field">
              <label htmlFor="lastName" className="c-field__label">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                className="c-form-input"
                value={form.lastName}
                onChange={handleChange}
              />
              {errors.lastName && (
                <span className="c-field__error">{errors.lastName}</span>
              )}
            </div>

            {/* Email */}
            <div className="c-field">
              <label htmlFor="email" className="c-field__label">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="c-form-input"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && (
                <span className="c-field__error">{errors.email}</span>
              )}
            </div>

            {/* Message */}
            <div className="c-field">
              <label htmlFor="message" className="c-field__label">
                Message
              </label>

              <div className="c-form-input-group">
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  className="c-textarea"
                  value={form.message}
                  onChange={handleChange}
                />

                <div className="c-form-input-group__addon">
                  <span className="c-form-input-group__text">
                    {form.message.length} chars
                  </span>
                </div>
              </div>

              {errors.message && (
                <span className="c-field__error">{errors.message}</span>
              )}
            </div>
          </div>

          <div className="c-form-card__footer c-button-group">
            <Button
              type="button"
              className="c-button c-button--outline"
              onClick={handleReset}
            >
              Reset
            </Button>

            <Button type="submit" className="c-button c-button--primary">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
