import React from "react";
import { useParams, Link } from "react-router-dom";
import { Row, Col, Container, Button } from "react-bootstrap";
import Product from "../components/Product.jsx";
import { useGetProductsQuery } from "../slices/productApiSlice.js";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import Paginate from "../components/Paginate.jsx";
import ProductCarousel from "../components/ProductCarousel.jsx";

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber: Number(pageNumber) || 1,
  });

  return (
    <Container className="py-4">
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Button
          as={Link}
          to="/"
          variant="outline-light"
          className="mb-4 shadow-sm"
        >
          ⬅ Go Back
        </Button>
      )}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h2 className="mb-4 text-center text-uppercase">Latest Products</h2>
          <Row className="g-4">
            {data?.products?.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>

          <div className="d-flex justify-content-center mt-4">
            <Paginate
              pages={data.pages}
              page={data.page}
              keyword={keyword ? keyword : ""}
            />
          </div>
        </>
      )}
    </Container>
  );
};

export default HomeScreen;
