import React, { useState, useEffect } from 'react';

const words = [" ACTIVE", " TALKING", " GROWING", " INVOLVED", " SHARING", " THRIVING"];
const finalWord = " OUTSIDE";

const CyclingWords = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showFinalWord, setShowFinalWord] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => {
        if (prevIndex === words.length - 1) {
          setShowFinalWord(true);
          clearInterval(intervalId);
          return prevIndex;
        }
        return prevIndex + 1;
      });
    }, 350);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <h1 className="z-20 text-5xl font-semibold text-bright-orange font-ubuntu">
      LET'S GET  
      <span className={`word ${showFinalWord ? 'text-dark-green' : ''}`}>
        {showFinalWord ? finalWord : words[currentWordIndex]}
      </span>
    </h1>
  );
};

export default CyclingWords;
