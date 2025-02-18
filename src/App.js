import React, { useState } from "react";

// Suggested initial states
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; // the index the "B" is at

export default function AppFunctional(props) {
  const [message, setMessage] = useState(initialMessage);
  const [email, setEmail] = useState(initialEmail);
  const [steps, setSteps] = useState(initialSteps);
  const [index, setIndex] = useState(initialIndex);
  const [coordinates, setCoordinates] = useState({ x: 2, y: 2 });

  function getXY(direction) {
    let x = coordinates.x;
    let y = coordinates.y;

    switch (direction) {
      case "left":
        x = x - 1;
        break;
      case "up":
        y = y - 1;
        break;
      case "right":
        x = x + 1;
        break;
      case "down":
        y = y + 1;
        break;
      default:
        break;
    }
    return { x, y };
  }

  function getXYMessage() {
    const { x, y } = getXY();
    return `Coordinates (${x}, ${y})`;
  }

  function reset() {
    setMessage(initialMessage);
    setEmail(initialEmail);
    setSteps(initialSteps);
    setIndex(initialIndex);
    setCoordinates({ x: 2, y: 2 });
  }

  function getNextIndex(direction) {
    const x = index % 3;
    const y = Math.floor(index / 3);
    switch (direction) {
      case "left":
        return x > 0 ? index - 1 : index;
      case "up":
        return y > 0 ? index - 3 : index;
      case "right":
        return x < 2 ? index + 1 : index;
      case "down":
        return y < 2 ? index + 3 : index;
      default:
        return index;
    }
  }

  function move(evt) {
    const direction = evt.target.id;
    const nextIndex = getNextIndex(direction);
    if (nextIndex !== index) {
      setIndex(nextIndex);
      setSteps(steps + 1);
      setCoordinates(getXY(direction));
    } else {
      setMessage(`You can't go ${direction}`);
    }
  }

  function onChange(evt) {
    setEmail(evt.target.value);
  }

  function formSubmit(evt) {
    evt.preventDefault();
    setMessage("Thanks for coming!");
    setEmail(initialEmail);
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
        <h3 id="steps">{`You moved ${steps} time${steps !== 1 ? "s" : ""}`}</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === index ? " active" : ""}`}>
            {idx === index ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={move}>
          LEFT
        </button>
        <button id="up" onClick={move}>
          UP
        </button>
        <button id="right" onClick={move}>
          RIGHT
        </button>
        <button id="down" onClick={move}>
          DOWN
        </button>
        <button id="reset" onClick={reset}>
          reset
        </button>
      </div>
      <form onSubmit={formSubmit}>
        <input
          id="email"
          type="email"
          placeholder="type email"
          onChange={onChange}
          value={email}
        ></input>
        <input id="submit" type="submit" value="Submit"></input>
      </form>
    </div>
  );
}
