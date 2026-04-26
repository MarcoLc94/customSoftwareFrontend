import { Outlet, useLocation } from "react-router-dom";
import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../footer/Footer";
import { ThemeProvider } from "../../context/ThemeProvider";
import "./Layout.css";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const Layout = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const smootherRef = useRef<ReturnType<typeof ScrollSmoother.create> | null>(null);
  const location = useLocation();

  useGSAP(() => {
    smootherRef.current = ScrollSmoother.create({
      wrapper: wrapperRef.current!,
      content: contentRef.current!,
      smooth: 4,
      effects: true,
      smoothTouch: 0.1,
    });
  });

  // On route change: scroll to top and refresh ScrollTrigger positions
  useEffect(() => {
    if (smootherRef.current) {
      smootherRef.current.scrollTop(0);
    }
    ScrollTrigger.refresh();
  }, [location.pathname]);

  return (
    <ThemeProvider>
      <Navbar />
      <div ref={wrapperRef} id="smooth-wrapper">
        <div ref={contentRef} id="smooth-content">
          <main className="main-container">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Layout;
