import React from "react";

const Header = () => {
  function handleVisibility() {
    let infobox = document.querySelector(".infobox");

    infobox.style.visibility === "visible"
      ? (infobox.style.visibility = "hidden")
      : (infobox.style.visibility = "visible");
  };

  return (
    <header>
      <p id="app-name">Pomodoro Timer</p>
      <div id="info-icon" onClick={handleVisibility}>
        ?
      </div>
    </header>
  );
};

export default Header;
