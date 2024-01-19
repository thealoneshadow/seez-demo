import React, { useState } from 'react';
import './carData.css'; // Import your CSS file
import LoginIcon from '@mui/icons-material/Login';
import Button from '@mui/material/Button';
import Slider from 'react-slick';
import "./carData.css"
const CarData = ({images}) => {
    console.log(images);
  const [modalOpen, setModalOpen] = useState(false);
    
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
    {!modalOpen && (
            <Button variant="contained" style={{backgroundColor: 'white', color: '#0d2a69'}} size="large" onClick={() => setModalOpen(true)}>
                <LoginIcon sx={{ mr: 1 }} />
                <b>Login/Signup</b>
            </Button>
    )}
    {modalOpen && (
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Image ${index}`} />
            </div>
          ))}
        </Slider>
    )}
    </>
  );
};


export default CarData;