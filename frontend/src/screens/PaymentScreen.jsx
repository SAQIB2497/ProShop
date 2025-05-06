import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer.jsx";
import CheckOutSteps from "../components/CheckOutSteps.jsx";
import { savePaymentMethod } from "../slices/cartSlice.js";

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("PayPal"); // ✅ Capitalized for consistency

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart; // ✅ FIX: Corrected typo (was 'shippingAdress')

  useEffect(() => {
    if (!shippingAddress?.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]); // ✅ Added navigate to deps for best practice

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <FormContainer>
      <CheckOutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              className="my-2"
              label="PayPal or Credit Card"
              name="paymentMethod"
              value="PayPal"
              checked={paymentMethod === "PayPal"} // ✅ Controlled checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Button type="submit" variant="primary" className="my-2">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
