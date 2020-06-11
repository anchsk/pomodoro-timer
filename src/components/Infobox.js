import React from "react";

const Infobox = () => {
  function closeInfobox() {
    let infobox = document.querySelector(".infobox");
    infobox.style.visibility = "hidden";
  }

  return (
    <div className="infobox">
      
      <div className="closebuttonrow">
        <div className="closebutton" onClick={closeInfobox}>
          x
        </div>
      </div>

      <h3>Hello, stranger</h3>
      <p>This is a simple Pomodoro Timer built with React Hooks.</p>
      <p>
{/*         Read more at <a href="https://github.com/anchsk/pomodoro-timer" target="_blank" rel="noopener noreferrer">GitHub repo</a>
 */}      </p>
    </div>
  );
};

export default Infobox;
