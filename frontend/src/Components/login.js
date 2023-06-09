import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data === true) {
          localStorage.setItem("token", data.token);
          navigate("/posts");
        } else {
          console.log("Error, not found.");
        }
      });

    console.log(formData);
  };

  return (
    <div className="form-hold">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="jdoe@gmail.com"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="********"
        />
        <button type="submit" className="form-button">
          Submit
        </button>
      </form>
      <h3>Don't have an account?</h3>
      <a href="signup" className="button-ques">
        Sign Up
      </a>
    </div>
  );
}
