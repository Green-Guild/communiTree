import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Link } from 'react-router-dom';
import CyclingWords from './CyclingWords';

function Parallax() {
  const [background, setBackground] = useState(20);

  const parallaxRef = useRef(null);
  const mountain3 = useRef(null);
  const mountain2 = useRef(null);
  const mountain1 = useRef(null);
  const cloudsBottom = useRef(null);
  const cloudsLeft = useRef(null);
  const cloudsRight = useRef(null);
  const stars = useRef(null);
  const sun = useRef(null);
  const copy = useRef(null);
  const btn = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);
      var tl = gsap.timeline({
        defaults: { duration: 1 },
        scrollTrigger: {
          trigger: parallaxRef.current,
          start: 'top top',
          end: '1300 bottom',
          scrub: true,
          pin: true,
          onUpdate: (self) => {
            setBackground(Math.ceil(self.progress * 100 + 10));
          },
        },
      });

      tl.to(
        mountain3.current,
        {
          y: '-=80',
        },
        0
      );
      tl.to(
        mountain2.current,
        {
          y: '-=30',
        },
        0
      );
      tl.to(
        mountain1.current,
        {
          y: '+=50',
        },
        0
      );
      tl.to(
        stars.current,
        {
          top: 0,
        },
        0.3
      );
      tl.to(
        cloudsBottom.current,
        {
          opacity: 0,
          duration: 0.5,
        },
        0
      );
      tl.to(
        cloudsLeft.current,
        {
          x: '-20%',
          opacity: 0,
        },
        0
      );
      tl.to(
        cloudsRight.current,
        {
          x: '20%',
          opacity: 0,
        },
        0
      );
      tl.to(
        sun.current,
        {
          y: '+=100',
        },
        0
      );
      tl.to(
        copy.current,
        {
          y: '-250%',
          opacity: 1,
        },
        0
      );
      tl.to(
        btn.current,
        {
          opacity: 1,
        },
        1.5
      );
    }, [background]);

    return () => ctx.revert();
  }, []);

  return (
    <div className="overflow-hidden -mt-12">
      <div
        ref={parallaxRef}
        style={{
          background: `linear-gradient(#F8F7F4 ${background}%, #F48437 )`,
        }}
        className="relative border-none h-[100vh] w-full"
      >
        <img
          ref={mountain3}
          className="absolute bottom-[-14%] w-full z-40"
          src="/parallax/mountain-3.svg"
        />
        <img
          ref={mountain2}
          className="absolute bottom-[-5%] w-full z-30"
          src="/parallax/mountain-2.svg"
        />
        <img
          ref={mountain1}
          className="absolute bottom-[0] object-contain w-full z-10"
          src="/parallax/mountain-1.svg"
        />
        <img
          ref={sun}
          className="absolute bottom-[-5%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/5"
          src="/parallax/sun.svg"
        />
        <img
          ref={cloudsBottom}
          className="absolute bottom-0 w-full"
          src="/parallax/cloud-bottom.svg"
        />
        <img
          ref={cloudsLeft}
          className="absolute bottom-[15%] left-0 w-1/5"
          src="/parallax/clouds-left.svg"
        />
        <img
          ref={cloudsRight}
          className="absolute bottom-[20%] right-0 w-1/5"
          src="/parallax/clouds-right.svg"
        />
        <img
          ref={stars}
          className="absolute top-[-550px] left-0 w-full"
          src="/parallax/stars.svg"
        />
        <div
          ref={copy}
          className=" absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center flex-col opacity-0"
        >
          {/* <h1 className="z-20 text-5xl font-semibold text-bright-orange font-ubuntu">
            LET'S GET OUTSIDE
          </h1> */}
          <CyclingWords></CyclingWords>
          <Link
            to="/sign-up"
            className="button-bulge z-50 text-white m-3 bg-yellow py-1 px-3 font-ubuntu font-medium rounded-full"
          >
            Discover more
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Parallax;
