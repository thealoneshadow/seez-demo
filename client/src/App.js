import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CarForm from "./components/form/carForm";
import ButtonAppBar from "./components/navbar/navbar";
import Footer from "./components/footer/Footer";
import Alert from "@mui/material/Alert";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Pagination from '@mui/material/Pagination';
import LinearProgress from '@mui/material/LinearProgress';

function App() {
  const [carProducts, setCarProducts] = useState([]);
  const [paginatedCarProducts, setPaginatedCarProducts] = useState([]);
  const [username, setUsername] = useState("");
  const [currentImageIndices, setCurrentImageIndices] = useState({});
  const [page, setPage] = React.useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/productData");
        setCarProducts(response.data.result);
        setPaginatedCarProducts(response.data.result.slice(0, 10));
        const initialIndices = {};
        response.data.result.slice(0, 10).forEach((car, index) => {
          initialIndices[index] = 0;
        });
      setCurrentImageIndices(initialIndices);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    let user = sessionStorage.getItem("username")
      ? sessionStorage.getItem("username")
      : "";
    setUsername(user);
  }, []);

  if (!carProducts || carProducts.length === 0) {
    return <div>
      <LinearProgress />
      </div>;
  }

  const handlePrevClick = (index, car) => {
    setCurrentImageIndices((prevIndices) => ({
      ...prevIndices,
      [index]: prevIndices[index] === undefined ? (car.images.length > 0 ? car.images.length - 1 : 0) : (prevIndices[index] - 1 + car.images.length) % car.images.length,
    }));
  };
  
  const handleNextClick = (index, car) => {
    setCurrentImageIndices((prevIndices) => ({
      ...prevIndices,
      [index]: prevIndices[index] === undefined ? 0 : (prevIndices[index] === (car.images.length - 1) ? 0 : prevIndices[index] + 1)
    }));
  };

  const handleChange = (event, value) => {
    const initialIndices = {};
    if(value == 1){
      setPaginatedCarProducts(carProducts.slice(0, 10));
      carProducts.slice(0, 10).forEach((car, index) => {
        initialIndices[index] = 0;
      });
    setCurrentImageIndices(initialIndices);
    } else if (value*10 > carProducts.length){
      setPaginatedCarProducts(carProducts.slice((value-1)*10, carProducts.length));
      carProducts.slice((value-1)*10, carProducts.length).forEach((car, index) => {
        initialIndices[index] = 0;
      });
    setCurrentImageIndices(initialIndices);
    } else{
      setPaginatedCarProducts(carProducts.slice((value-1)*10, value*10));
      carProducts.slice((value-1)*10, value*10).forEach((car, index) => {
        initialIndices[index] = 0;
      });
    setCurrentImageIndices(initialIndices);
    }
    setPage(value);
  };


  return (
    <div className="backgroundImage">
      <ButtonAppBar />
      <Alert severity={!username ? "error" : "success"}
        style={{
          textAlign: "center",
          margin: "0",
          padding: "10px",
          borderRadius: "20px",
          marginLeft: "10px",
          marginRight: "10px",
          opacity: "0",
          fontSize: "16px",
          animation: "fadeIn 3s forwards",
          transition: "opacity 1.5s ease-in-out",
        }}
      >
        <b>
          {username
            ? "Welcome to Seez " +
              username +
              ". Now can access our special trade feature."
            : "Please Login/Create Account to " + "Trade your old Vehicle"}
        </b>
      </Alert>

      <div className="card-list">
        {paginatedCarProducts.map((car, index) => (
          <div key={index} className="card">
             <div className="image-container">
            {car.images.length > 0 && (
              <img
                src={car.images[currentImageIndices[index]]}
                alt={`${car.brand} ${car.model}`}
                className="image"
              />
            )}
            <button
            className="arrow-button left"
            onClick={() => handlePrevClick(index, car)}
            >
              <ArrowBackIosIcon />
           
            </button>
            <button
              className="arrow-button right"
              onClick={() => handleNextClick(index, car)}
            >
            <ArrowForwardIosIcon />
          </button>
              </div>
            <h3>{`${car.brand} ${car.model}`}</h3>
            <p>{car.description}</p>
            <p>Current Price: {car.price}</p>
            <p style={{fontSize:"20px" ,color:"#0d2a69",borderRadius:"15px",padding:"4px", boxShadow: "0px 18px 12px rgba(0, 0, 0, 0.1)"}}><b>{"Dealership: "+car.dealership}</b></p>
            <div
              className="CarFormButton"
              style={{
                opacity: !username ? 0.5 : 1,
                pointerEvents: !username ? "none" : "auto",
              }}
            >
              <CarFormButton price={car.price} />
            </div>
          </div>
        ))}
      </div>
      <Pagination count={Math.ceil(carProducts.length / 10)}  shape="rounded" page={page} size="large"  onChange={handleChange} style={{
          textAlign: "center",
          margin: "0",
          padding: "10px",
          borderRadius: "20px",
          marginLeft: "10px",
          marginRight: "10px",
          fontSize: "16px",
          animation: "fadeIn 3s forwards",
          transition: "opacity 1.5s ease-in-out",
          justifyContent:"center",
          alignItems:"center",
          display:"flex",
          flexDirection:"column",
          backgroundColor:"white",
          marginBottom:"10px"
      }} />
      <Footer />
    </div>
  );
}

const CarFormButton = (price) => {
  return <CarForm price={price} />;
};
export default App;
