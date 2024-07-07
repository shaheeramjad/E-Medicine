import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="footer_container">
        <div className="footer_column">
          <img src="Images/1.png" width={269} height={89} />
          <h2 className="h" style={{ color: "white" }}>
            High Quality Medics
          </h2>
        </div>
        <div className="footer_column">
          <h3>MEDICAL PRODUCTS</h3>

          <a href="#">Men</a>
          <a href="#">Women</a>
          <a href="#">Kids</a>
          <a href="#">Home & Living</a>
          <a href="#">Beauty</a>
          <a href="#">Gift Card</a>
        </div>

        <div className="footer_column">
          <h3>COSMETICS</h3>

          <a href="#">Men</a>
          <a href="#">Women</a>
          <a href="#">Kids</a>
          <a href="#">Home & Living</a>
          <a href="#">Beauty</a>
          <a href="#">Gift Card</a>
        </div>

        <div className="footer_column">
          <h3>GENERAL ITEMS</h3>
          <a href="#">Men</a>
          <a href="#">Women</a>
          <a href="#">Kids</a>
          <a href="#">Home & Living</a>
          <a href="#">Beauty</a>
          <a href="#">Gift Card</a>
          <hr />© 2024 www.eMedicine.com. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
