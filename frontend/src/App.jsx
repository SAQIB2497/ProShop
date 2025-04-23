import React from "react";
import { Container } from "react-bootstrap";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import HomeScreen from "./screens/HomeScreen.jsx";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Container className="Py-3">
          <HomeScreen/>
        </Container>
        <Footer />
      </main>
    </>
  );
};

export default App;
