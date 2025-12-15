"use client";

import React, { useState, useEffect, useCallback } from 'react';

interface slideShowProps {
  slides: slide[];
}

interface slide {
  id: number;
  content: string;
  image?: string;
}

const Slideshow: React.FC<slideShowProps> = (props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = props.slides || [
    { id: 1, content: 'Slide 1', image: 'image1.jpg' },
    { id: 2, content: 'Slide 2', image: 'image2.jpg' },
    { id: 3, content: 'Slide 3', image: 'image3.jpg' },
  ];

  const nextSlide = useCallback( () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }, [slides.length])

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  }
  

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <div>
      <h2>{slides[currentIndex].content}</h2>
      {slides[currentIndex].image && 
      <img src={slides[currentIndex].image} alt={`Slide ${currentIndex + 1}`} />}
      <button onClick={prevSlide}> Prev Slide</button>
      <button onClick={nextSlide}> Next Slide </button>
    </div>
  );
};

export default Slideshow;
