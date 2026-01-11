import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./Layout.css";
import { ThemeProvider } from "../../context/ThemeProvider";
import Footer from "../footer/Footer";

const layout = () => {
  return (
    <div className="layout-container">
      <ThemeProvider>
      <Navbar></Navbar>
      <main className="main-container">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
      </ThemeProvider>
    </div>
  );
};

export default layout;
