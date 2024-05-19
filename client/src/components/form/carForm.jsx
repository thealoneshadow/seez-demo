import React, { useEffect, useState } from "react";
import "./carForm.css";
import TextField from "@mui/material/TextField";
import HandshakeIcon from "@mui/icons-material/Handshake";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Alert from "@mui/material/Alert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CarForm = (newprice) => {
  const numericPrice = parseFloat(newprice.price.price.replace(/[^0-9.]/g, ""));

  const [modalOpen, setModalOpen] = useState(false);
  const [BuyOfValue, setBuyOfValue] = useState(0);
  const [carData, setCarData] = useState({
    address: "",
    model: "",
    quantity: 1,
    year: "0",
    selectedOption: "Cash On Delivery",
    images: [],
  });

  const [errors, setErrors] = useState({ address: "", quantity: "" });
  const [username, setUsername] = useState("");
  const [alert, setAlert] = useState("success");
  const notify = () => toast.success("Order Placed");

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
    if (carData.address === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        address: "Invalid Address",
      }));
      return;
    }

    if (errors.quantity === "") {
      console.log("Hi");
      setAlert("");
      notify();
      setTimeout(() => {
        setModalOpen(false);
      }, 6000);
    } else {
      setAlert("error");
    }
  };

  const validateInput = (name, value) => {
    if (name === "quantity") {
      const isValidYear = /^(?:[1-9]\d{0,5}|[1-4]\d{5}|500000)$/.test(value);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: isValidYear ? "" : "Invalid quantity",
      }));
    }
  };

  const hasErrors = Object.values(errors).some((error) => error !== "");
  const isEmpty = Object.values(carData).some(
    (error) => error === "" || error == []
  );

  return (
    <div>
      {!modalOpen && (
        <Tooltip
          title={
            username ? "Buy your pizza" : "Please Login to use this feature"
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
                address: "",
                model: "",
                quantity: 1,
                year: "",
                kmDriven: "",
                selectedOption: "Cash On Delivery",
                images: [],
              });
              setErrors({
                address: "",
                quantity: "",
              });
              setBuyOfValue(0);
            }}
          >
            <HandshakeIcon sx={{ mr: 1 }} />
            <b>Buy your pizza</b>
          </Button>
        </Tooltip>
      )}

      {modalOpen && (
        <div className="modal-container">
          <ToastContainer style={{ marginRight: "-16px", marginTop: "-5px" }} />
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
                  address: "",
                  model: "",
                  quantity: 1,
                  year: "",
                  kmDriven: "",
                  selectedOption: "Cash On Delivery",
                  images: [],
                });
                setErrors({
                  address: "",
                  quantity: "",
                });
                setAlert("wait");
              }}
            >
              X
            </Button>
            <form onSubmit={handleSubmit}>
              <TextField
                id="standard-basic"
                label="Address for Pizza Delivery"
                variant="standard"
                type="text"
                name="address"
                value={carData.address}
                onChange={handleInputChange}
                error={Boolean(errors.address)}
                helperText={errors.address}
              />

              <TextField
                id="standard-basic"
                label="Price in $"
                variant="standard"
                type="number"
                name="quantity"
                value={carData.quantity}
                onChange={handleInputChange}
                error={Boolean(errors.quantity)}
                helperText={errors.quantity}
              />

              <FormLabel id="demo-row-radio-buttons-group-label">
                Payment Details
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel
                  control={<Radio />}
                  label="Cash On Delivery"
                  type="radio"
                  name="selectedOption"
                  value="Cash On Delivery"
                  checked={carData.selectedOption === "Cash On Delivery"}
                  onChange={handleOptionChange}
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Crypto Wallet"
                  type="radio"
                  name="selectedOption"
                  value="Crypto Wallet"
                  checked={carData.selectedOption === "Crypto Wallet"}
                  onChange={handleOptionChange}
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Card On Delivery"
                  type="radio"
                  name="selectedOption"
                  value="Card On Delivery"
                  checked={carData.selectedOption === "Card On Delivery"}
                  onChange={handleOptionChange}
                />
              </RadioGroup>
              <div></div>

              <button
                type="submit"
                style={{
                  backgroundColor: "green",
                }}
              >
                Calculate Final Price
              </button>
            </form>
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                opacity:
                  numericPrice - BuyOfValue < 0 && (hasErrors || isEmpty)
                    ? 0.5
                    : 1,
                pointerEvents:
                  numericPrice - BuyOfValue < 0 && (hasErrors || isEmpty)
                    ? "none"
                    : "auto",
              }}
            >
              {alert == "" &&
                numericPrice - BuyOfValue > 0 &&
                numericPrice - BuyOfValue != numericPrice && (
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
            {alert != "" && numericPrice - BuyOfValue != numericPrice ? (
              <Alert severity={alert} className="error">
                {" "}
                {alert == "error"
                  ? "Hope to see you again!"
                  : "Yaay, we will be in touch shortly"}
              </Alert>
            ) : null}
            <p>
              <b>{"Final Value to pay: $" + numericPrice * carData.quantity}</b>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarForm;
