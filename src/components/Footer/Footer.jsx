import React from "react";
import "./Footer.css";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  return <>{location.pathname != "/test-testing" && <footer></footer>}</>;
};

export default Footer;
