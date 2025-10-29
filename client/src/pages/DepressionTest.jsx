import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import ExamBg from "../assets/exambackk.png";

const choices = [
  { title: "Bring a reusable bottle", desc: "Skip one disposable bottle today.", points: 5 },
  { title: "Meat-free meal", desc: "Choose a plant-based meal for one day.", points: 6 },
  { title: "Carry a reusable bag", desc: "Avoid a disposable plastic bag.", points: 4 },
  { title: "Take the stairs", desc: "Skip the elevator for short trips.", points: 2 },
  { title: "Refill instead of buying", desc: "Refill personal care products when possible.", points: 3 },
  { title: "Use a lunchbox", desc: "Pack lunch in a reusable container.", points: 5 }
];

export default function DailyChoices() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [earned, setEarned] = useState(0);

  const goNext = () => {
    if (selected === null) {
      alert("Please select a choice before continuing.");
      return;
    }
    if (selected) setEarned((e) => e + (choices[current].points || 0));
    setSelected(null);
    if (current < choices.length - 1) setCurrent((c) => c + 1);
  };

  const goBack = () => {
    if (current > 0) setCurrent((c) => c - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save today's earned points and navigate to impact page
    try {
      const prev = JSON.parse(localStorage.getItem("eco_impact")) || { points: 0, history: [] };
      const next = { points: prev.points + earned, history: [...prev.history, { date: new Date().toISOString(), earned }] };
      localStorage.setItem("eco_impact", JSON.stringify(next));
    } catch (err) {
      console.warn("Failed to save eco impact", err?.message || err);
    }
    navigate("/impact");
  };

  return (
    <Container>
      <div className="test">
        <h1>Daily Eco Choice</h1>
        <p>Choose one small action today to reduce waste and earn points.</p>

        <form onSubmit={handleSubmit}>
          <div className="progress">Choice {current + 1} of {choices.length}</div>
          <div className="divider" />
          <div className="question">
            <p className="question-text">{choices[current].title}</p>
            <p className="choice-desc">{choices[current].desc} • Earn {choices[current].points} pts</p>

            <label className={`option ${selected === true ? 'selected' : ''}`}>
              <input
                type="radio"
                name={`choice${current}`}
                value={1}
                checked={selected === true}
                onChange={() => setSelected(true)}
              />
              I'll do this today
            </label>

            <label className={`option ${selected === false ? 'selected' : ''}`}>
              <input
                type="radio"
                name={`choice${current}`}
                value={0}
                checked={selected === false}
                onChange={() => setSelected(false)}
              />
              Not today
            </label>
          </div>

          <div className="controls">
            <button type="button" onClick={goBack} disabled={current === 0} className="back">Back</button>
            {current < choices.length - 1 ? (
              <button type="button" onClick={goNext} className="next">Next</button>
            ) : (
              <button type="submit" className="submit">Finish & View Impact</button>
            )}
          </div>
        </form>

        <div className="summary">
          <p>Points earned so far: <strong>{earned}</strong></p>
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
  background-image: linear-gradient(rgba(10,12,18,0.6), rgba(10,12,18,0.6)), url(${ExamBg});
  background-size: cover;
  background-position: center;
  overflow-y: auto;

  .test {
    background: rgba(3,6,12,0.75);
    box-shadow: 0 8px 40px rgba(0,0,0,0.6);
    border-radius: 1rem;
    padding: 2.5rem;
    max-width: 880px;
    width: 92%;
    color: white;
    backdrop-filter: blur(6px);

    h1 { text-align: center; margin-bottom: 1rem; }
    p { margin-bottom: 1rem; }

    .progress { font-size: 0.95rem; color: #d1d1d1; margin-bottom: 0.6rem; text-align: left; }
    .divider { height: 1px; background: rgba(255,255,255,0.12); margin-bottom: 1rem; width: 100%; }

    .question { margin-bottom: 1.5rem; }
    .question-text { font-weight: 700; margin-bottom: 0.5rem; font-size: 1.35rem; }
    .choice-desc { margin-bottom: 1rem; color: #bcd; }

    .option {
      display: block;
      margin-bottom: 0.9rem;
      padding: 0.6rem 0.9rem;
      border-radius: 0.6rem;
      background: linear-gradient(90deg, rgba(34,197,94,0.06), rgba(34,197,94,0.03));
      transition: background 0.12s ease, transform 0.08s ease, box-shadow 0.12s ease;
      cursor: pointer;
      color: #fff;
      border: 1px solid rgba(255,255,255,0.04);
    }
    .option input { margin-right: 0.8rem; }
    .option.selected { background: linear-gradient(90deg, rgba(16,185,129,0.2), rgba(34,197,94,0.12)); box-shadow: 0 8px 24px rgba(16,185,129,0.08); }

    .controls { display: flex; gap: 1rem; justify-content: space-between; margin-top: 1rem; }

    button { background-color: #10b981; color: white; padding: 0.8rem 1.2rem; border: none; border-radius: 0.4rem; font-size: 1rem; cursor: pointer; }
    button:disabled { opacity: 0.45; cursor: not-allowed; }
    .back { flex: 1 1 40%; }
    .next, .submit { flex: 1 1 55%; }

    .summary { margin-top: 1rem; text-align: center; }
  }
`;
