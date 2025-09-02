// src/App.jsx
import React from "react";
import AppRouter from "./router";
import useScrollToTop from "./hooks/useScrollToTop";

const App = () => {
  useScrollToTop();
  return <AppRouter />;
};

export default App;