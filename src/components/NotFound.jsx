import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-emerald-50">
    <h1 className="text-5xl font-bold text-emerald-700 mb-4">404</h1>
    <p className="text-lg text-gray-700 mb-6">
      Sorry, the page you are looking for does not exist.
    </p>
    <Link
      to="/"
      className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
    >
      Go to Home
    </Link>
  </div>
);

export default NotFound;
