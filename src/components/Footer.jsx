import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      Follow us on ->{" "}
      <span className="icons">
        <a href="http://www.twitter.com">
          <i className="fab fa-twitter" />
        </a>
        {" | "}
        <a href="http://www.instagram.com">
          <i className="fab fa-instagram" />
        </a>
        {" | "}
        <a href="http://www.facebook.com">
          <i className="fab fa-facebook" />
        </a>
      </span>
    </div>
  );
};

export default Footer;
