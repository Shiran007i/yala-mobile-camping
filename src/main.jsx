import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";
import { BookingProvider } from "./contexts/BookingContext";
import { BookingUIProvider } from "./contexts/BookingUIContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <BookingProvider>
          <BookingUIProvider>
            <App />
          </BookingUIProvider>
        </BookingProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
