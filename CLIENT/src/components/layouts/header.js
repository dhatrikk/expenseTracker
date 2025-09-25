import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";

const Header = () => {
  const navigate = useNavigate();
  const [loginUser, setLoginUser] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    } else {
      setLoginUser("");
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    setLoginUser("");
    setTimeout(() => navigate("/login"), 0);
  };

  return (
    <header className="header">
      <div className="header__logo">Expense Tracker</div>
      <nav className="header__nav">
        <ul className="header__nav-links">
          {loginUser ? (
            <>
              <li className="header__user-name">{loginUser.name}</li>
              <li>
                <button className="header__logout-btn" onClick={logoutHandler}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link className="header__link" to="/login">
                  Login
                </Link>
              </li>
              <li>
                <Link className="header__link" to="/register">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
