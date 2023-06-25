import React, { useState } from "react";
import axios from "axios";
import "./ContactForm.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/contact", formData)
      .then((response) => {
        console.log(response.data);
        setFormData({
          name: "",
          email: "",
          message: "",
        });
        setShowConfirmation(true);
        setTimeout(() => {
          setShowConfirmation(false);
        }, 2000);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="bg-image"></div>
      <div className="contact-form-container">
        <h2 className="contacth2">Contact Us</h2>
        {showConfirmation && (
          <div className="confirmation-message">
            Email sent! Thank you for contacting us.
          </div>
        )}
        <form className="contactform" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="contactlabel" htmlFor="name">
              Name:
            </label>
            <input
              className="inputTextarea"
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="contactlabel" htmlFor="email">
              Email:
            </label>
            <input
              className="inputTextarea"
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className="contactlabel" htmlFor="message">
              Message:
            </label>
            <textarea
              className="inputTextarea"
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button className="Formbtn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default ContactForm;
