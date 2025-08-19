import React, { useState, useEffect } from 'react';

interface Slide {
  id: number;
  title: string;
  content: string;
  image?: string;
}

const Slideshow: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sample slide data
  const slides: Slide[] = [
    {
      id: 1,
      title: "Welcome to React Slideshow",
      content: "This is the first slide of our presentation.",
      image: "https://via.placeholder.com/800x400/4A90E2/ffffff?text=Slide+1"
    },
    {
      id: 2,
      title: "Features",
      content: "Navigate with buttons, keyboard arrows, or indicators.",
      image: "https://via.placeholder.com/800x400/50C878/ffffff?text=Slide+2"
    },
    {
      id: 3,
      title: "Responsive Design",
      content: "Works great on all screen sizes.",
      image: "https://via.placeholder.com/800x400/FF6B6B/ffffff?text=Slide+3"
    },
    {
      id: 4,
      title: "Thank You!",
      content: "Thanks for viewing our slideshow demo.",
      image: "https://via.placeholder.com/800x400/FFD93D/ffffff?text=Slide+4"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const slideshowStyles: React.CSSProperties = {
    maxWidth: '900px',
    margin: '20px auto',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    fontFamily: 'Arial, sans-serif'
  };

  const slideStyles: React.CSSProperties = {
    textAlign: 'center',
    padding: '40px 20px',
    minHeight: '500px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const imageStyles: React.CSSProperties = {
    width: '100%',
    maxWidth: '600px',
    height: '300px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '20px'
  };

  const titleStyles: React.CSSProperties = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '15px'
  };

  const contentStyles: React.CSSProperties = {
    fontSize: '1.2rem',
    color: '#666',
    lineHeight: '1.6',
    maxWidth: '600px'
  };

  const controlsStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderTop: '1px solid #e9ecef'
  };

  const buttonStyles: React.CSSProperties = {
    padding: '10px 20px',
    backgroundColor: '#4A90E2',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s'
  };

  const indicatorsStyles: React.CSSProperties = {
    display: 'flex',
    gap: '10px'
  };

  const indicatorStyles: React.CSSProperties = {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  };

  const slideCountStyles: React.CSSProperties = {
    position: 'absolute',
    top: '10px',
    right: '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '15px',
    fontSize: '14px'
  };

  return (
    <div style={slideshowStyles}>
      <div style={{ position: 'relative' }}>
        <div style={slideCountStyles}>
          {currentSlide + 1} / {slides.length}
        </div>
        
        <div style={slideStyles}>
          {slides[currentSlide].image && (
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              style={imageStyles}
            />
          )}
          <h1 style={titleStyles}>{slides[currentSlide].title}</h1>
          <p style={contentStyles}>{slides[currentSlide].content}</p>
        </div>
      </div>

      <div style={controlsStyles}>
        <button
          onClick={prevSlide}
          style={{
            ...buttonStyles,
            backgroundColor: currentSlide === 0 ? '#ccc' : '#4A90E2'
          }}
          disabled={currentSlide === 0}
        >
          ← Previous
        </button>

        <div style={indicatorsStyles}>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                ...indicatorStyles,
                backgroundColor: index === currentSlide ? '#4A90E2' : '#ddd'
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          style={{
            ...buttonStyles,
            backgroundColor: currentSlide === slides.length - 1 ? '#ccc' : '#4A90E2'
          }}
          disabled={currentSlide === slides.length - 1}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default Slideshow;
