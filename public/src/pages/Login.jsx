import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import Background from "../assets/login_ghacks.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({ username: "", password: "" });
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    const key = process.env.REACT_APP_LOCALHOST_KEY || "depression-calculator-user";
    if (localStorage.getItem(key)) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const { username, password } = values;
    if (username === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    } else if (password === "") {
      toast.error("Email and Password is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        const key = process.env.REACT_APP_LOCALHOST_KEY || "depression-calculator-user";
        localStorage.setItem(key, JSON.stringify(data.user));

        // Navigate to home page after login
        navigate("/", { replace: true });
      }
    }
  };

  return (
    <>
      <FormContainer>
        <form action="" onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>GreenLife Login</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min="3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Log In</button>
          <span>
            DON'T HAVE AN ACCOUNT ? <a href="/register">CREATE ONE.</a>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* Background image with a dark gradient overlay for readability */
  background-image: linear-gradient(rgba(3,6,12,0.55), rgba(3,6,12,0.55)), url(${Background});
  background-size: cover;
  background-position: center;

  @keyframes gradientBG {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 6rem;
      animation: bounce 2s infinite; /* Bouncing animation for logo */
    }
    h1 {
      color: white;
      text-transform: uppercase;
      font-family: 'Poppins', sans-serif;
      font-size: 2rem;
    }
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background: rgba(255, 255, 255, 0.2); /* Glass effect */
    border-radius: 2rem;
    padding: 3rem 5rem;
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    &:hover {
      transform: scale(1.05); /* Form grows slightly on hover */
      box-shadow: 0 6px 40px rgba(0, 0, 0, 0.2);
    }
  }

  input {
    background: rgba(255, 255, 255, 0.1); /* Transparent input */
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    transition: all 0.3s ease;
    &::placeholder {
      color: rgba(255, 255, 255, 0.6); /* More visible placeholder */
    }
    &:focus {
      outline: none;
      border: 0.1rem solid #997af0;
      box-shadow: 0 0 10px #4e0eff;
      background: rgba(255, 255, 255, 0.3);
    }
  }

  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
    &:hover {
      background-color: #997af0;
      box-shadow: 0 0 15px #997af0;
    }
  }

  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
      transition: color 0.3s ease;
      &:hover {
        color: #fff;
      }
    }
  }
`;

