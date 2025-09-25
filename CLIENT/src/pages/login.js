import React, { useState,useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import Layout from "../components/layouts/layout";
import "./login.css";
import axios from "axios";

const Login = () => {
const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();

    try {
      const {data} = await axios.post(`/api/v1/USER/login`, formData);
      alert(`Login Successful!\nEmail: ${formData.email}`);
      localStorage.setItem("user",JSON.stringify({...data.user,password:""}));
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
    
    // Optionally, reset form fields after submission
    setFormData({
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
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
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
          <button type="submit" className="login-btn">Login</button>
          <p className="forgot-password">
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>
          <p className="register-link">
            Not registered? <Link to="/register">Register here</Link>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
