import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { getPhq9Route } from "../utils/APIRoutes";
import { useNavigate } from "react-router-dom";

export default function DepressionResult() {
  const navigate = useNavigate();
  const [impact, setImpact] = useState({ points: 0, history: [] });
  const [redeemedList, setRedeemedList] = useState([]);

  useEffect(() => {
    // Load local eco impact data and ensure today's entry exists
    const stored = localStorage.getItem("eco_impact");
    let current = { points: 0, history: [] };
    if (stored) {
      try {
        current = JSON.parse(stored);
      } catch (e) {
        current = { points: 0, history: [] };
      }
    }
    // Ensure there is a history entry for today (so points are tracked per day)
    const today = new Date().toISOString().slice(0, 10);
    const lastEntry = (current.history && current.history.length) ? current.history[current.history.length - 1] : null;
    if (!lastEntry || !lastEntry.date.startsWith(today)) {
      // add a zero-entry for today so daily storage exists (will be incremented elsewhere)
      const entry = { date: new Date().toISOString(), earned: 0 };
      current.history = [...(current.history || []), entry];
      localStorage.setItem("eco_impact", JSON.stringify(current));
    }
    setImpact(current);

    const redeemedStored = JSON.parse(localStorage.getItem('eco_redeemed') || '[]');
    setRedeemedList(redeemedStored);
  }, [navigate]);

  const handleRedeem = () => {
    // Redeem a coupon only when points >= 100
    if ((impact.points || 0) >= 100) {
      const remaining = (impact.points || 0) - 100;
      const updated = { ...impact, points: remaining };
      // store redemption record
      const redeemedRecord = { id: Date.now(), name: 'Cafeteria Coupon', date: new Date().toISOString(), cost: 100 };
      const redeemedStored = JSON.parse(localStorage.getItem('eco_redeemed') || '[]');
      redeemedStored.push(redeemedRecord);
      localStorage.setItem('eco_redeemed', JSON.stringify(redeemedStored));
      setRedeemedList(redeemedStored);

      // persist updated impact
      localStorage.setItem("eco_impact", JSON.stringify(updated));
      setImpact(updated);
      alert("Coupon redeemed! Check your redeemed rewards section.");
    } else {
      alert("You need 100 points to redeem a coupon. Keep going — small habits add up!");
    }
  };

  return (
    <Container>
      <div className="result-card">
        <h1>Rewards</h1>
        <div className="level">Total Points: {impact.points}</div>

        <div className="actions">
          <button onClick={() => navigate("/")}>Home</button>
          <button className="retake" onClick={() => navigate("/choices")}>Today's Choices</button>
        </div>

        <div className="rewards-grid">
          <div className="reward-card">
            <h3>Cafeteria Coupon</h3>
            <p>Redeem for a free snack or drink at the campus cafeteria.</p>
            <div className="reward-footer">
              <span className="cost">Cost: 100 pts</span>
              <button onClick={handleRedeem} className="redeem-btn">Redeem</button>
            </div>
          </div>

          <div className="redeemed-list">
            <h3>Redeemed Rewards</h3>
            {redeemedList && redeemedList.length ? (
              <ul>
                {redeemedList.slice().reverse().map((r) => (
                  <li key={r.id}>{r.name} — {new Date(r.date).toLocaleDateString()} (Cost: {r.cost})</li>
                ))}
              </ul>
            ) : (
              <p>No redeemed rewards yet.</p>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);

  .result-card {
    background: rgba(255,255,255,0.06);
    padding: 2rem;
    border-radius: 1rem;
    color: white;
    text-align: center;
    min-width: 320px;
    .level {
      margin: 1rem 0 1.5rem 0;
      font-size: 1.6rem;
      color: #10b981; /* green accent */
      font-weight: 700;
    }

    .actions {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-top: 0.75rem;
      margin-bottom: 1.25rem;
      button {
        background: #4e0eff;
        color: white;
        border: none;
        padding: 0.6rem 1rem;
        border-radius: 0.4rem;
        cursor: pointer;
      }
      .retake {
        background: #777;
      }
    }

    .rewards-grid {
      display: grid;
      grid-template-columns: 1fr 320px;
      gap: 1.25rem;
      align-items: start;
      margin-top: 1rem;
    }

    .reward-card {
      background: rgba(255,255,255,0.03);
      padding: 1rem;
      border-radius: 0.75rem;
      text-align: left;
    }
    .reward-card h3 { margin: 0 0 0.5rem 0 }
    .reward-footer { display:flex; justify-content:space-between; align-items:center; margin-top:1rem }
    .cost { font-weight:700 }
    .redeem-btn { background:#10b981; color:white; border:none; padding:0.5rem 0.8rem; border-radius:8px; cursor:pointer }

    .redeemed-list { background: rgba(255,255,255,0.02); padding:1rem; border-radius:0.6rem }
    .redeemed-list ul { list-style:none; padding:0; margin:0 }
    .redeemed-list li { padding:0.45rem 0; border-bottom: 1px solid rgba(255,255,255,0.03) }
  }
`;
