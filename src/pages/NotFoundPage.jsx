// src/pages/NotFoundPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO.jsx";

const NotFoundPage = () => {
  return (
    <>
      <SEO title="404 - Page Not Found" description="The page you are looking for does not exist." />
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <h2 className="text-2xl mt-4">Page Not Found</h2>
        <p className="mt-2">The page you are looking for does not exist.</p>
        <Link to="/" className="mt-6 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700">
          Go Home
        </Link>
      </div>
    </>
  );
};

export default NotFoundPage;
