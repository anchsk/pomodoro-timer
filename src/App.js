import React from "react";
import "./style/css/style.min.css";
import Header from "./components/Header";
import Pomodoro from "./components/Pomodoro";
import Footer from "./components/Footer";
import Infobox from "./components/Infobox";


function App() {
  return (
    <div id="app">
      <Header />
      <Pomodoro />
      <Footer />
      <Infobox />
    </div>
  );
}

export default App;
