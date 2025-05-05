import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer.jsx";
import { saveShippingAdress } from "../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckOutSteps from "../components/CheckOutSteps.jsx";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAdress } = cart;

  const [adress, setAdress] = useState(shippingAdress?.adress || "");
  const [city, setCity] = useState(shippingAdress?.city || "");
  const [postalCOde, setPostalCOde] = useState(
    shippingAdress?.postalCOde || ""
  );
  const [country, setCountry] = useState(shippingAdress?.country || "");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHanlder = (e) => {
    e.preventDefault();
    dispatch(saveShippingAdress({ adress, city, postalCOde, country }));
    navigate("/payment");
  };
  return (
    <FormContainer>
      <CheckOutSteps step1 step2 />
      <h1 className="mt-2">Shipping</h1>
      <Form onSubmit={submitHanlder}>
        <Form.Group controlId="adress" className="my-2">
          {/* Adress */}
          <Form.Label>Adress</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Adress"
            value={adress}
            onChange={(e) => setAdress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* City */}
        <Form.Group controlId="city" className="my-2">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* Postal Code */}
        <Form.Group controlId="postalCode" className="my-2">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter City"
            value={postalCOde}
            onChange={(e) => setPostalCOde(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* Country */}
        <Form.Group controlId="country" className="my-2">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* Button */}
        <Button type="submit" variant="primary" className="my-2">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
