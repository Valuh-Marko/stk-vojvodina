import { CiPhone, CiLocationArrow1 } from "react-icons/ci";
import { MdOutlineMail } from "react-icons/md";
import "./contactInfo.css";

const ContactInfo = () => {
  return (
    <div className="c-contact-info">
      <div className="c-contact-info__map-embed-container">
        <iframe
          className="c-embed-iframe"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2809.0252238649!2d19.845572000000004!3d45.2472827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475b10133428d4ff%3A0x8721fc9ac5045dce!2sSutjeska%202%2C%20Novi%20Sad%2021000!5e0!3m2!1sen!2srs!4v1763666189661!5m2!1sen!2srs"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <div className="c-contact-info__links">
        <a
          href="mailto:stkvojvodinans@gmail.com"
          className="c-contact-info__link"
        >
          <MdOutlineMail /> <span>stkvojvodinans@gmail.com</span>
        </a>
        <a href="tel:+381631201431" className="c-contact-info__link">
          <CiPhone />
          <span>+381 63 1201 431</span>
        </a>
        <a
          href="https://maps.app.goo.gl/Tnsk5U5LHTVyfFG19"
          target="_blank"
          className="c-contact-info__link"
        >
          <CiLocationArrow1 />
          <span>Sutjeska 2 | 21000 Novi Sad</span>
        </a>
      </div>
    </div>
  );
};

export default ContactInfo;
