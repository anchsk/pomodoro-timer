import React, { useState, useEffect, useRef } from "react";
import LengthControls from "./LengthControls";
import useInterval from "../hooks/useInterval.js";

const Pomodoro = () => {
  const [mode, setMode] = useState(""); 
  const [timeLeft, setTimeLeft] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const audio = useRef();

  useEffect(() => {
    document.title = `${convertTime(timeLeft)} ${
      mode !== "" ? `(${mode})` : ""
    } — Pomodoro Timer`;
  });

  //Add transition effect to the background on the first load
  useEffect(() => {
    document.querySelector("body").setAttribute("class", "bg-transition");
    document
      .querySelectorAll("button")
      .forEach((button) => button.setAttribute("class", "bg-transition"));
}, []);

  function convertTime(timeInSec) {
    let minutes = Math.floor(timeInSec / 60);
    let seconds = timeInSec - minutes * 60;
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    return minutes + ":" + seconds;
  }

  function handleZero() {
    audio.current.play();
    if (mode === "Session") {
      document.documentElement.setAttribute(
        "data-theme",
        "orange"
      );
      setMode("Break");
      setTimeLeft(breakLength * 60);
    } else {
      document.documentElement.setAttribute("data-theme", "green");
      setMode("Session");
      setTimeLeft(sessionLength * 60);
    }
  }

  //Is similar to setInterval, in the start it sets the interval to null
  useInterval(
    () => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        handleZero(); //switch theme, update timeLeft
      }
    },
    isRunning ? 1000 : null
  ); //if the timer is not running, the delay value is set to null and it clears the interval

  function handleClick() {
    if (mode === "") {
      setIsRunning(true);
      setMode("Session");
    } else {
      isRunning ? setIsRunning(false) : setIsRunning(true);
    }
  }

  function handleLengthChange(timerLabel, length) {
    if (timerLabel === "session") {
      if (mode === "Session" || mode === "") {
        setSessionLength(length);
        setTimeLeft(length * 60);
      } else {
        setSessionLength(length);
      }
    }

    if (timerLabel === "break") {
      if (mode === "Break") {
        setBreakLength(length);
        setTimeLeft(length * 60);
      } else {
        setBreakLength(length);
      }
    }
  }

  function resetAll() {
    document.documentElement.setAttribute("data-theme", "green");

    setMode("");
    setTimeLeft(1500);
    setIsRunning(false);
    setBreakLength(5);
    setSessionLength(25);

    audio.current.pause();
    audio.current.currentTime = 0;
  }

  return (
    <main id="pomodoro">
      <div id="timer">
        <p id="timer-label">{mode ? mode : "Session"}</p>
        <p id="time-left"><span id="minutes">{convertTime(timeLeft).slice(0,2)}</span>:<span id="seconds">{convertTime(timeLeft).slice(3)}</span></p>
      </div>

  < LengthControls
        timerLabel="break"
        timerLength={breakLength}
        onLengthChange={handleLengthChange}
      />

  < LengthControls
        timerLabel="session"
        timerLength={sessionLength}
        onLengthChange={handleLengthChange}
      />
      <button id="start_stop" onClick={handleClick}>
        {mode === "" ? "Start" : isRunning ? "Pause" : "Resume"}
      </button>

      <button id="reset" onClick={resetAll}>
        Reset
      </button>

      <audio
        src="/sounds/STEELYEC.mp3"
        ref={(ref) => (audio.current = ref)}
        id="beep"
      />
    </main>
  );
};

export default Pomodoro;
