import React, { useEffect, useState } from "react";
import "./carForm.css";
import TextField from "@mui/material/TextField";
import HandshakeIcon from "@mui/icons-material/Handshake";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { IconButton } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Alert from "@mui/material/Alert";

const CarForm = (newprice) => {
  const numericPrice = parseFloat(newprice.price.price.replace(/[^0-9.]/g, ""));
  
  const [modalOpen, setModalOpen] = useState(false);
  const [tradeOfValue, setTradeOfValue] = useState(0);
  const [carData, setCarData] = useState({ brand: "",
    model: "",
    price: "",
    year: "",
    kmDriven: "",
    selectedOption: "No Damage",
    images: []});

  const [errors, setErrors] = useState({year: "", kmDriven: "", price: ""});
  const [username, setUsername] = useState("");
  const [alert, setAlert] = useState("success");

  useEffect(() => {
    let user = sessionStorage.getItem("username")
      ? sessionStorage.getItem("username")
      : "";
    setUsername(user);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: value });
    validateInput(name, value);
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
    calculateCarValue();
  };

  const validateInput = (name, value) => {
    if (name === "year") {
      const isValidYear =
        /^(18[0-9]{2}|19[0-9]{2}|200[0-9]|201[0-9]|202[0-4])$/.test(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: isValidYear ? "" : "Invalid year",
      }));
    } else if (name === "kmDriven") {
      const isValidYear = /^(?:[1-9]\d{0,5}|[1-4]\d{5}|500000)$/.test(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: isValidYear ? "" : "Invalid Kilometers",
      }));
    } else if (name === "price") {
      const isValidYear = /^(?:[1-9]\d{0,5}|[1-4]\d{5}|500000)$/.test(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: isValidYear ? "" : "Invalid Price",
      }));
    }
  };

  const hasErrors = Object.values(errors).some((error) => error !== "");
  const isEmpty = Object.values(carData).some(
    (error) => error == "" || error == []
  );

  const calculateCarValue = () => {
    let { price, year, kmDriven, selectedOption } = carData;
    price = parseInt(price);
    const damageValue =
      selectedOption === "No Damage"
        ? 0
        : selectedOption === "Minor Scratches"
        ? (price / 100) * 10
        : (price / 100) * 30;
    const ageValue =
      year > 2021 ? 0 : year > 2010 ? (price / 100) * 15 : (price / 100) * 25;
    const kmDrivenValue =
      kmDriven < 1000
        ? 0
        : kmDriven < 25000
        ? (price / 100) * 10
        : (price / 100) * 25;
    const totalValue = price - (damageValue + ageValue + kmDrivenValue);
    console.log(tradeOfValue, numericPrice);
    setTradeOfValue(totalValue);
    setAlert("");
  };

  return (
    <div>
      {!modalOpen && (
        <Tooltip
          title={
            username
              ? "Trade your old vehicle"
              : "Please Login to use this feature"
          }
        >
          <Button
            variant="contained"
            style={{ backgroundColor: "#0d2a69", color: "white" }}
            size="large"
            onClick={() => {
              setModalOpen(true);
              setAlert("wait");
              setCarData({
                brand: "",
                model: "",
                price: "",
                year: "",
                kmDriven: "",
                selectedOption: "No Damage",
                images: [],
              });
              setErrors({
                year: "",
                kmDriven: "",
                price: "",
              });
              setTradeOfValue(0);
            }}
          >
            <HandshakeIcon sx={{ mr: 1 }} />
            <b>Trade your old vehicle</b>
          </Button>
        </Tooltip>
      )}

      {modalOpen && (
        <div className="modal-container">
          <div className="modal-content">
            <Button
              variant="contained"
              style={{
                backgroundColor: "#0d2a69",
                color: "white",
                marginLeft: "auto",
                fontSize: "12px",
                marginTop: "-10px",
                marginLeft: "240px",
              }}
              size="small"
              className="close-button"
              onClick={() => {
                setModalOpen(false);
                setCarData({
                  brand: "",
                  model: "",
                  price: "",
                  year: "",
                  kmDriven: "",
                  selectedOption: "No Damage",
                  images: [],
                });
                setErrors({
                  year: "",
                  kmDriven: "",
                  price: "",
                });
                setAlert("wait");
              }}
            >
              X
            </Button>
            <form onSubmit={handleSubmit}>
              <TextField
                id="standard-basic"
                label="Brand of vehicle"
                variant="standard"
                type="text"
                name="brand"
                value={carData.brand}
                onChange={handleInputChange}
              />
              <TextField
                id="standard-basic"
                label="Model"
                variant="standard"
                type="text"
                name="model"
                value={carData.model}
                onChange={handleInputChange}
              />
              <TextField
                id="standard-basic"
                label="Price in $"
                variant="standard"
                type="text"
                name="price"
                value={carData.price}
                onChange={handleInputChange}
                error={Boolean(errors.price)}
                helperText={errors.price}
              />
              <TextField
                id="standard-basic"
                label="Valid Year of manufacturing"
                variant="standard"
                type="text"
                name="year"
                value={carData.year}
                onChange={handleInputChange}
                error={Boolean(errors.year)}
                helperText={errors.year}
              />
              <TextField
                id="standard-basic"
                label="KM Driven"
                variant="standard"
                type="text"
                name="kmDriven"
                value={carData.kmDriven}
                onChange={handleInputChange}
                error={Boolean(errors.kmDriven)}
                helperText={errors.kmDriven}
              />

              <FormLabel id="demo-row-radio-buttons-group-label">
                Vehicle Condition
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  control={<Radio />}
                  label="No Damage"
                  type="radio"
                  name="selectedOption"
                  value="No Damage"
                  checked={carData.selectedOption === "No Damage"}
                  onChange={handleOptionChange}
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Minor Scratches"
                  type="radio"
                  name="selectedOption"
                  value="Minor Scratches"
                  checked={carData.selectedOption === "Minor Scratches"}
                  onChange={handleOptionChange}
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Repaired"
                  type="radio"
                  name="selectedOption"
                  value="Repaired"
                  checked={carData.selectedOption === "Repaired"}
                  onChange={handleOptionChange}
                />
              </RadioGroup>
              <div></div>

              <label>
                Select Images({carData.images.length}):
                <input
                  type="file"
                  name="images"
                  multiple
                  accept=".jpg, .jpeg, .png, .gif"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
                <IconButton component="span">
                  <FolderIcon />
                </IconButton>
              </label>

              <button
                type="submit"
                disabled={hasErrors || isEmpty}
                style={{
                  backgroundColor: isEmpty || hasErrors ? "grey" : "green",
                }}
              >
                Calculate Price
              </button>
            </form>
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                opacity:
                  numericPrice - tradeOfValue < 0 && (hasErrors || isEmpty)
                    ? 0.5
                    : 1,
                pointerEvents:
                  numericPrice - tradeOfValue < 0 && (hasErrors || isEmpty)
                    ? "none"
                    : "auto",
              }}
            >
              {alert == "" &&
                numericPrice - tradeOfValue > 0 &&
                numericPrice - tradeOfValue != numericPrice && (
                  <>
                    <Button
                      variant="contained"
                      color="success"
                      size="Large"
                      onClick={() => setAlert("success")}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="Large"
                      onClick={() => setAlert("error")}
                    >
                      Reject
                    </Button>
                  </>
                )}
            </div>
            {alert != "" && numericPrice - tradeOfValue != numericPrice ? (
              <Alert severity={alert} className="error">
                {" "}
                {alert == "error"
                  ? "Hope to see you again!"
                  : "Yaay, we will be in touch shortly"}
              </Alert>
            ) : null}
            <p>
              <b>
                {numericPrice - tradeOfValue > 0
                  ? "Estimated Value to pay: $" +
                    (numericPrice - tradeOfValue != numericPrice
                      ? numericPrice - tradeOfValue
                      : 0)
                  : "Sorry You cannot trade this vehicle"}
              </b>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarForm;
