import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Karunya from "../assets/karunya.png";

export default function Home() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const stored =
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY || "depression-calculator-user");
    if (!stored) {
      navigate("/login");
      return;
    }
    try {
      const user = JSON.parse(stored);
      setUsername(user.username || "");
    } catch (e) {
      // fallback
      setUsername("");
    }
  }, [navigate]);

  return (
    <Container>
      <div className="menu">
        <h1>Welcome{username ? `, ${username}` : ""}!</h1>
        <p className="subtitle">Make student life greener — small daily choices add up.</p>

        <div className="options">
          <div className="card" onClick={() => navigate("/choices")}> 
            <h3>Daily Eco Choices</h3>
            <p>Get a daily suggestion for a sustainable habit</p>
          </div>
          <div className="card" onClick={() => navigate("/impact")}>
            <h3>My Impact & Rewards</h3>
            <p>Track savings, impact and redeem rewards</p>
          </div>
          <div className="card" onClick={() => navigate("/register")}>
            <h3>Invite a Friend</h3>
            <p>Earn bonus points for bringing peers on board</p>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1f1f1f; /* dark grey background */
  background-image: linear-gradient(rgba(31,31,31,0.6), rgba(31,31,31,0.6)), url(${Karunya});
  background-size: cover;
  background-position: center;
  padding: 2rem;

  .menu {
  width: 100%;
  max-width: 1000px;
  /* Dark charcoal box with pale, desaturated text */
  background: rgba(47,79,79,0.96); /* #2F4F4F Dark Slate Gray with slight opacity */
  padding: 2.5rem;
  border-radius: 1rem;
  color: #E6E6FA; /* pale desaturated lavender for main text */
  text-align: center;
  box-shadow: 0 12px 40px rgba(0,0,0,0.12);
  backdrop-filter: blur(6px);

    h1 {
      font-size: 2.8rem;
      margin-bottom: 0.5rem;
      font-weight: 700;
      color: #E6E6FA; /* pale lavender */
    }
    .subtitle {
      color: #ADD8E6; /* soft light sky blue accent */
      margin-bottom: 1.5rem;
    }

    .options {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1rem;
    }

    .card {
      padding: 1.25rem;
      border-radius: 0.75rem;
      cursor: pointer;
      border: 1px solid rgba(255,255,255,0.04);
      transition: transform 0.15s ease, box-shadow 0.15s ease;
      color: #E6E6FA; /* pale lavender for card text */
      overflow: hidden;
      background: rgba(255,255,255,0.03); /* very subtle frosted card on dark box */
    }
    .card h3 { margin-bottom: 0.5rem; font-size: 1.25rem; font-weight: 700; color: #E6E6FA; }
    .card p { color: #ADD8E6; font-size: 1rem; }
    .card:hover { transform: translateY(-6px); box-shadow: 0 8px 30px rgba(0,0,0,0.08); }

    
  }
`;
