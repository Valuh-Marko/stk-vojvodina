import ContactForm from "../../ui/contact-form/contactForm";
import ContactInfo from "../../ui/contact-info/contactInfo";
import "./contact.css";

const Contact = () => {
  return (
    <div className="l-contact">
      <h2 className="c-contact__title">Contact</h2>
      <div className="c-contact">
        <ContactInfo />
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
