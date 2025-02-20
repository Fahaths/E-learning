import React from "react";
import "./header.css";
import { Link } from "react-router-dom";

const Header = ({ isAuth }) => {
  return (
    <header>
      <div className="logo">
        E-learning
      </div>

      <div className="link">
        <Link to={"/"}>Home</Link>
        <Link to={"/courses"}>Courses</Link>
        <Link to={"/posts"}>posts</Link>

      <Link to={"/about"}>About</Link>
        <Link to={"/assignments"}>Assingment</Link>
        <Link to={"/login"}>Login</Link>
        <Link to={"/signup"}>Sign Up</Link> {/* Added link to Signup */}
      </div>
    </header>
  );
};

export default Header;
