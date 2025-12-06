import React from "react";
import { Link } from "react-router-dom";

function RouterError() {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="text-center">
        {/* Large 404 Text */}
        <h1 className="display-1 fw-bold text-danger">404</h1>

        {/* Main Message */}
        <p className="fs-3">
           Page not found.
        </p>

        {/* Helpful description */}
        <p className="lead">The page you’re looking for doesn’t exist.</p>

        {/* Call to Action to return home */}
        <Link to="/home" className="btn btn-primary p-2 px-4 mt-3">
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default RouterError;
