// HeroImage.jsx
import React from "react";
import "./HeroImage.css";
import ConsultationForm from "../consultant-form/ConsultationForm";
import Testimonials from "../testimonials/Testimonials";

const HeroImage: React.FC = () => {
  return (
    <>
      <div className="logo-image">
        <img
          src="https://ik.imagekit.io/tcfp7i31d/logo_with_yp_black_urUeyjKwY.svg"
          alt=""
        />

        <h1 className="heading">Welcome to Fix Health Website!</h1>
      </div>
      <div className="hero-image">
        <div>
          <ConsultationForm />
        </div>
      </div>
      <div className="bg-primary w-full overflow-hidden">
        <div className={`container mx-auto`}>
          <div className={`xl:max-w-[1280px] w-full`}>
            <Testimonials />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroImage;
