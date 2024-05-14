import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Parallax from "../components/Parallax";

function FadeInSection({ children }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      className={`transition-opacity duration-1000 transform ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
}

function HomePage() {
  return (
    <>
      <Parallax />
      <div className="bg-about-green text-white flex-col gap-5 ">
        <FadeInSection>
          <div className=" p-12 flex">
            <h2 className="font-extrabold text-4xl p-7">
              BLOSSOM IN TOGETHERNESS
            </h2>
            <p className="p-7">
              Loneliness is a growing issue. It's more important than ever to
              spend time together in person. Planting together is a great way to
              meet new people and build friendships around a shared cause. It's
              time to connect and grow something meaningful together.
            </p>
          </div>
        </FadeInSection>

        <FadeInSection>
          <div className="bg-custom-shape min-h-[26rem] bg-cover flex items-center">
            <p className="p-7">
              Gathering at community gardens and events is not only a great way
              to build a sense of community but also has proven mental health
              benefits. Studies demonstrate that participating in these
              activities can reduce stress, increase feelings of well-being, and
              foster a sense of belonging. Community gardening also promotes a
              greener earth, encouraging sustainable practices and environmental
              awareness while building real connections. By coming together to
              cultivate gardens, we nurture both our communities and the planet.
            </p>
            <h2 className="font-extrabold text-4xl p-7">
              COMMUNITY IN SUSTAINABILITY
            </h2>
          </div>
        </FadeInSection>

        <FadeInSection>
          <div className="p-12  flex">
            <h2 className="font-extrabold text-4xl p-7">LET'S TOUCH GRASS</h2>
            <p className="p-7">
              Join us in building strong, green communities. Sign up today to
              start a garden, participate, host events, and meet new friends.
              It's time to get outside, connect with nature, and connect with
              each other. Together, we can create vibrant community spaces that
              benefit our well-being and the environment. Let's grow something
              amazing!
            </p>
          </div>
        </FadeInSection>
      </div>
    </>
  );
}

export default HomePage;
