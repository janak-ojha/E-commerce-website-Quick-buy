import React, { useState, useEffect } from 'react';
import { Box, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const images = [
  {
    src: "https://rukminim1.flixcart.com/flap/3376/560/image/8464e4d9a75b909a.jpg?q=50",
    caption: "Slide 1",
  },
  {
    src: "https://rukminim1.flixcart.com/flap/3376/560/image/ed12b7707a04473c.jpg?q=50",
    caption: "Slide 2",
  },
  {
    src: "https://rukminim1.flixcart.com/flap/3376/560/image/8a89ee09acc1a9e5.jpg?q=50",
    caption: "Slide 3",
  },
  {
    src: "https://rukminim1.flixcart.com/flap/3376/560/image/5df65ad101e18dbf.jpg?q=50",
    caption: "Slide 4",
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); // Change image every 4 seconds

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  // Function to go to the previous image
  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  // Function to go to the next image
  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '40vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Left Button */}
      <IconButton
        sx={{
          position: 'absolute',
          left: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'white',
          zIndex: 2,
          backgroundColor: 'rgba(0,0,0,0.5)',
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.8)',
          },
        }}
        onClick={handlePrevClick}
      >
        <ArrowBackIosIcon />
      </IconButton>

      {/* Image Display */}
      <Box
        component="img"
        src={images[currentIndex].src}
        alt={images[currentIndex].caption}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'opacity 1s ease',
          opacity: 1,
        }}
      />

      {/* Right Button */}
      <IconButton
        sx={{
          position: 'absolute',
          right: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          color: 'white',
          zIndex: 2,
          backgroundColor: 'rgba(0,0,0,0.5)',
          '&:hover': {
            backgroundColor: 'rgba(0,0,0,0.8)',
          },
        }}
        onClick={handleNextClick}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default Carousel;
