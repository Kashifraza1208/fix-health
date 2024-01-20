import React, { FC } from "react";
import FeedbackCard from "./FeedbackCard";
import Carousel from "nuka-carousel";

interface Feedback {
  id: string;
  content: string;
  name: string;
  title: string;
  img: string;
}

const feedback: Feedback[] = [
  {
    id: "feedback-1",
    content:
      "Your assessment method is so good & patient support resolves issues promptly",
    name: "Herman Jensen",
    title: "Founder & Leader",
    img: "https://i.imgur.com/Dn0qoCG.png",
  },
  {
    id: "feedback-2",
    content:
      "6 month with Fix Health was less than 1 month of my insurance со- pay",
    name: "Steve Mark",
    title: "Founder & Leader",
    img: "https://i.imgur.com/fk8eEvW.png",
  },
  {
    id: "feedback-3",
    content:
      "Best self referral physiotherapy near me - skipped NHS queue. Got appointment same day.",
    name: "Kenn Gallagher",
    title: "Founder & Leader",
    img: "https://i.imgur.com/dLxxRDy.png",
  },
];

const Testimonials: FC = () => (
  <section
    id="clients"
    className={`sm:py-16 py-6 flex justify-center items-center flex-col relative h-screen`}
  >
    <div className="absolute z-[0] w-[60%] h-[60%] -right-[50%] rounded-full blue__gradient bottom-40" />

    <div className="w-full flex justify-center items-center md:flex-row flex-col sm:mb-16 mb-6 relative z-[1]">
      <h2
        style={{ textAlign: "center", color: "Highlight" }}
        className={`font-poppins font-semibold xs:text-[48px] text-[40px] text-green xs:leading-[76.8px] leading-[66.8px] w-full text-center`}
      >
        Patient Recovery Stories
      </h2>
      <div className="w-full md:mt-0 mt-6 text-center">
        <p
          style={{ textAlign: "center" }}
          className={`font-poppins font-normal text-dimWhite text-[18px] leading-[30.8px] max-w-[450px]`}
        >
          Don't just take our word for it
        </p>
      </div>
    </div>
    <Carousel
      autoplay
      autoplayInterval={3000}
      wrapAround={true}
      style={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {feedback.map((card) => (
        <FeedbackCard key={card.id} {...card} />
      ))}
    </Carousel>
  </section>
);

export default Testimonials;
