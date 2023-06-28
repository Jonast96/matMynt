import React, { useState } from "react";

function Header() {
  const [search, setSearch] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const tempData = [
    "Apple",
    "Banana",
    "Carrot",
    "Donut",
    "Eggs",
    "Fish",
    "Grapes",
  ];

  function handleSubmit(e) {
    e.preventDefault();
    console.log(search);
    setDropdownVisible(true);
  }

  return (
    <>
      <h1 className="font-bold text-4xl text-accent">MatMynt</h1>
      <div className="text-center mt-24">
        <h4 className="text-2xl font-medium">Velkommen til MatMynt</h4>
        <p className="text-xl mt-2">Din guide til smartere matshopping</p>
        <p>Scan varekode eller søk etter produkt</p>
      </div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="searchContainer flex justify-center gap-2  mx-auto mt-3"
      >
        <div>
          <input
            type="text"
            name="search"
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Søk etter produkt..."
            className=" bg-primary p-1 text-lg   text-white border-solid border-b-2 border-white focus:outline-none focus:border-accent"
          />
          <button type="submit" className="bg-accent px-2 rounded  text-lg">
            Søk
          </button>

          {dropdownVisible && (
            <div className="relative">
              <div className="absolute z-10  w-full bg-accent text-black shadow-lg  py-2">
                {tempData.map((item, index) => (
                  <div
                    onClick={() => setDropdownVisible(false)}
                    key={index}
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </form>
    </>
  );
}

export default Header;
