import React from "react";
import { Link } from "react-router-dom";
import { Carousel, Image, Container } from "react-bootstrap";
import Loader from "./Loader.jsx";
import Message from "./Message.jsx";
import { useGetTopProductsQuery } from "../slices/productApiSlice.js";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error?.data?.message || error.error}</Message>
  ) : (
    <Container className="mb-4">
      <Carousel
        pause="hover"
        className="bg-dark p-2 rounded shadow-sm mx-auto"
        style={{ maxWidth: "700px" }} // Limit width
      >
        {products.map((product) => (
          <Carousel.Item key={product._id}>
            <Link to={`/product/${product._id}`}>
              <Image
                src={product.image}
                alt={product.name}
                fluid
                className="d-block mx-auto"
                style={{
                  maxHeight: "280px", // Reduced height
                  width: "100%",
                  objectFit: "contain",
                }}
              />
              <Carousel.Caption className="bg-dark bg-opacity-50 rounded p-2">
                <h6 className="text-light fw-bold m-0">
                  {product.name} (${product.price})
                </h6>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default ProductCarousel;
