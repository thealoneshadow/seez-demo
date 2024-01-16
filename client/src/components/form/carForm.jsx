import React, { useState } from 'react';
import './carForm.css'; 
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import HandshakeIcon from '@mui/icons-material/Handshake';

const CarForm = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [carData, setCarData] = useState({
    brand: '',
    model: '',
    price: '',
    year: '',
    kmDriven: '',
    selectedOption: 'No Damage', // Default option
    images: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: value });
  };

  const handleOptionChange = (e) => {
    setCarData({ ...carData, selectedOption: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setCarData({ ...carData, images: files });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform your form submission logic here using carData
    console.log('Form submitted:', carData);
    // Close the modal after submission
    setModalOpen(false);
  };


  return (
    <div>
      <Fab variant="extended" onClick={() => setModalOpen(true)}>
        <HandshakeIcon sx={{ mr: 1 }} />
        <b>Trade your old vehicle</b>
      </Fab>

      {modalOpen && (
        <div className="modal-container">
          <div className="modal-content">
            <button className="close-button" onClick={() => setModalOpen(false)}>
              Close
            </button>
            <form onSubmit={handleSubmit}>
          <label>
            Brand:
            <input type="text" name="brand" value={carData.brand} onChange={handleInputChange} />
          </label>
    
          <label>
            Model:
            <input type="text" name="model" value={carData.model} onChange={handleInputChange} />
          </label>
    
          <label>
            Price:
            <input type="text" name="price" value={carData.price} onChange={handleInputChange} />
          </label>
    
          <label>
            Year:
            <input type="text" name="year" value={carData.year} onChange={handleInputChange} />
          </label>
    
          <label>
            KM Driven:
            <input type="text" name="kmDriven" value={carData.kmDriven} onChange={handleInputChange} />
          </label>
    
          <div>
            <label>
              No Damage
              <input
                type="radio"
                name="selectedOption"
                value="No Damage"
                checked={carData.selectedOption === 'No Damage'}
                onChange={handleOptionChange}
              />
            </label>
            <label>
              Minor Scratches
              <input
                type="radio"
                name="selectedOption"
                value="Minor Scratches"
                checked={carData.selectedOption === 'Minor Scratches'}
                onChange={handleOptionChange}
              />
            </label>
            <label>
              Repaired
              <input
                type="radio"
                name="selectedOption"
                value="Repaired"
                checked={carData.selectedOption === 'Repaired'}
                onChange={handleOptionChange}
              />
            </label>
          </div>
    
          <label>
            Images:
            <input type="file" name="images" multiple onChange={handleImageChange} />
          </label>
        
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarForm;