import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CarForm from "./components/form/carForm";
import ButtonAppBar from "./components/navbar/navbar";
import Footer from "./components/footer/Footer";
import Alert from "@mui/material/Alert";
function App() {
  const [carProducts, setCarProducts] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/productData");
        setCarProducts(response.data.result);
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
    return <div>Fetching Data...</div>;
  }

  return (
    <div className="backgroundImage">
      <ButtonAppBar />
      <Alert
        severity={!username ? "error" : "success"}
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
        {carProducts.map((car, index) => (
          <div key={index} className="card">
            <img
              src={car.images[0]}
              alt={`${car.brand} ${car.model}`}
              className="image"
            />
            <h3>{`${car.brand} ${car.model}`}</h3>
            <p>{car.description}</p>
            <p>Price: {car.price}</p>
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
      <Footer />
    </div>
  );
}

const CarFormButton = (price) => {
  return <CarForm price={price} />;
};
export default App;
