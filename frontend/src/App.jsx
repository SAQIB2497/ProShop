import React from "react";
import { Container } from "react-bootstrap";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Container className="PY-3">
          <h1>Welcome to ProShop</h1>
        </Container>
        <Footer />
      </main>
    </>
  );
};

export default App;
