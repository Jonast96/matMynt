import "./index.css";
import React from "react";
import Footer from "./components/nav/Footer";
import Search from "./components/header/Search";
import Main from "./components/main/Main";
import Nav from "./components/header/Nav";

import { hotjar } from "react-hotjar";
hotjar.initialize(3561950, 6);

function App() {
  function setVh() {
    let vh = window.innerHeight * 0.01;

    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  setVh();

  window.addEventListener("resize", setVh);

  window.addEventListener("orientationchange", setVh);

  return (
    <div className="bg-primary">
      <div className="mx-auto main-app  text-white max-w-2xl flex flex-col justify-between">
        <header>
          <Nav />
        </header>
        <main id="main" className=" gap-5 flex-col flex">
          <Search />
          <Main />
        </main>
        <footer className="">
          <Footer />
        </footer>
      </div>
    </div>
  );
}

export default App;
