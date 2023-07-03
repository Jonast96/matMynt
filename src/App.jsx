import "./index.css";
import React from "react";
import Nav from "./components/nav/Nav";
import Header from "./components/header/Header";
import Main from "./components/main/Main";

function App() {
  function setVh() {
    let vh = window.innerHeight * 0.01;

    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  setVh();

  window.addEventListener("resize", setVh);

  window.addEventListener("orientationchange", setVh);

  return (
    <div className="mx-auto main-app bg-primary text-white max-w-lg pt-2  flex flex-col justify-between">
      <main id="main" className="px-4 gap-5 flex-col flex">
        <Header />
        <Main />
      </main>
      <footer className="">
        <Nav />
      </footer>
    </div>
  );
}

export default App;
