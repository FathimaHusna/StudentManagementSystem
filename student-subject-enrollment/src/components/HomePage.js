import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";  // Custom CSS for extra styling

export default function HomePage() {
  return (
    <div className="home-page">
      <section className="hero-section text-center text-white">
        <div className="container">
          <h1 className="hero-title mb-4">Welcome to the Student Enrollment System</h1>
          <p className="hero-description mb-4">
            Manage student enrollments in a few clicks. Add, view, update, and manage enrollments easily with this intuitive system.
          </p>
          <div className="d-flex justify-content-center mb-5">
            <Link to="/add-enrollment" className="btn btn-primary btn-lg mx-3">
              Add Enrollment
            </Link>
            <Link to="/enrollment-list" className="btn btn-secondary btn-lg mx-3">
              View Enrollments
            </Link>
            
          </div>
        </div>
      </section>

      <section className="features-section text-center">
        <h2 className="section-title">Key Features</h2>
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <div className="feature-card">
              <i className="fas fa-user-plus feature-icon"></i>
              <h4>Add Enrollments</h4>
              <p>Easily add students to their desired subjects with a simple form.</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="feature-card">
              <i className="fas fa-list-ul feature-icon"></i>
              <h4>View Enrollments</h4>
              <p>Check the list of enrolled students and their selected subjects.</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="feature-card">
              <i className="fas fa-edit feature-icon"></i>
              <h4>Update Enrollments</h4>
              <p>Update student enrollments quickly with an intuitive interface.</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="feature-card">
              <i className="fas fa-trash-alt feature-icon"></i>
              <h4>Delete Enrollments</h4>
              <p>Remove enrollments that are no longer needed with a click.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer text-center mt-5">
        <p>Developed by Husna | Version 1.0</p>
      </footer>
    </div>
  );
}
