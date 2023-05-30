import "./index.css";
import React from "react";
import Nav from "./components/Nav";
import Header from "./components/Header";

function App() {
  return (
    <div className="mx-auto min-h-screen  bg-primary text-white max-w-lg flex flex-col justify-between pt-2">
      <header className="px-4">
        <Header />
      </header>
      <main className="px-4"></main>
      <footer>
        <Nav />
      </footer>
    </div>
  );
}

export default App;
