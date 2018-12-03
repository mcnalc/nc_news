import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      Follow us on ->{" "}
      <span className="icons">
        <i className="fab fa-twitter" />
        {" | "}
        <i className="fab fa-instagram" />
        {" | "}
        <i className="fab fa-facebook" />
      </span>
    </div>
  );
};

export default Footer;
