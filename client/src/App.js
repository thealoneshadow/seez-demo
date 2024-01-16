
import './App.css';
import axios from 'axios';
import React, { useEffect, useState, useMemo } from 'react';
import CarForm from './components/form/carForm';
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';

function App() {

  const [carProducts, setCarProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/productData');
        console.log("response data", response)
        setCarProducts(response.data.result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  },[]); 

  if (!carProducts || carProducts.length === 0) {
    return <div>Fetching Data...</div>; 
  }
  

  return (
      <div className="card-list">
      {carProducts.map((car, index) => (
        <div key={index} className="card">
          <img src={car.images[0]} alt={`${car.brand} ${car.model}`} className='image'/>
          <h3>{`${car.brand} ${car.model}`}</h3>
          <p>{car.description}</p>
          <p>Price: {car.price}</p>
          <CarFormButton />
        </div>
      ))}
    </div>
  );
}

const CarFormButton = () => {
  return <CarForm />;
};

export default App;
