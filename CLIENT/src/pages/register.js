import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/layouts/layout";
import "./register.css";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`/api/v1/user/register`, formData);

      
      alert(`Registration Successful!\nName: ${formData.name}`);
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }

    // Optionally, reset form fields after submission
    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  useEffect(()=>{
    if(localStorage.getItem("user")){
      navigate("/");
    }
  },[navigate]);

  return (
    <Layout>
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="input-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="register-btn">
            Register
          </button>
          <p className="login-link">
            Already registered? <Link to="/login">Click here to login</Link>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
