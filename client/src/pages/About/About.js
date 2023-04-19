import React from "react";
import ArekFooter from "../../components/ArekFooter/ArekFooter";
import NewsLetter from "../../components/NewsLetter/NewsLetter";
import "./About.css";

export default function About() {
  return (
    <>
      <div className="about-container">
        <h4>
          Wokiee is a global fashion destination for 20-somethings. We sell
          cutting-edge fashion and offer a wide variety of fashion-related
          content.
        </h4>
        <div className="about-img-container">
          <img
            src="https://wokiee.reactdemo.hasthemes.com/assets/images/custom/about2-img-01.jpg"
            alt=""
          />
          <img
            src="https://wokiee.reactdemo.hasthemes.com/assets/images/custom/about2-img-02.jpg"
            alt=""
          />
          <img
            src="https://wokiee.reactdemo.hasthemes.com/assets/images/custom/about2-img-03.jpg"
            alt=""
          />
        </div>
        <div className="about-row">
          <div className="about-col">
            <h6>CONTACTS</h6>
            <p>
              Address:{" "}
              <span>
              Chiplun, 415605, India
              </span>
            </p>
            <p>
              Phone: <span>+777 2345 7885; +777 2345 7886</span>
            </p>
            <p>E-mail: info@mydomain.com</p>
          </div>
        </div>
      </div>
      <NewsLetter />
      <ArekFooter />
    </>
  );
}
