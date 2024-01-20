import React, { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import HeroImage from "./components/hero-image/HeroImage";
import ConsultationForm from "./components/consultant-form/ConsultationForm";
import Testimonials from "./components/testimonials/Testimonials";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HeroImage />} />
        {/* <Route path="/" element={<ConsultationForm />} /> */}
        {/* <Route path="/testimonials" element={<ConsultationForm />} /> */}
        <Route path="/testimonials" element={<Testimonials />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
