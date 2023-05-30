import "./index.css";
import React from "react";
import Nav from "./components/Nav";
import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  return (
    <div className="mx-auto min-h-screen  bg-primary text-white max-w-lg flex flex-col justify-between pt-2">
      <header className="px-4">
        <Header />
      </header>
      <main id="main" className="px-4">
        <Main />
      </main>
      <footer>
        <Nav />
      </footer>
    </div>
  );
}

export default App;
