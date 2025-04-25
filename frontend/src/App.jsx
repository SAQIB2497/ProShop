import React from "react";
 import { Container } from "react-bootstrap";
 import { Outlet } from "react-router-dom";
 import Header from "./components/Header.jsx";
 import Footer from "./components/Footer.jsx";
 const App = () => {
   return (
     <>
       <Header />
       <main>
         <Container className="Py-3">
           <Outlet />
         </Container>
         <Footer />
       </main>
     </>
   );
 };
 
 export default App;