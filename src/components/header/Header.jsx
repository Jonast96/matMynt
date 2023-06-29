import React, { useState, useCallback } from "react";
import { debounce } from "lodash";

function Header() {
  const [search, setSearch] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const key = "NBT65Ohkkh5oIVNrbAfFuEO6ftZzZhzHWDdsRXNb";

  const fetchData = async (search) => {
    const response = await fetch(
      `https://kassal.app/api/v1/products?search=${search}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
      }
    );
    const data = await response.json();
    setSearchResults(data.data);
    console.log(data.data);
  };
  const debounceFetchData = useCallback(debounce(fetchData, 500), []);

  function handleChange(e) {
    const { value } = e.target;
    setSearch(value);
    setDropdownVisible(true);
    debounceFetchData(value);
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
          e.preventDefault();
        }}
        className="searchContainer flex justify-center gap-2  mx-auto mt-3"
      >
        <div>
          <input
            type="text"
            name="search"
            id="search"
            value={search}
            onChange={handleChange}
            placeholder="Søk etter produkt..."
            className=" bg-primary p-1 text-lg   text-white border-solid border-b-2 border-white focus:outline-none focus:border-accent"
          />
          <button type="submit" className="bg-accent px-2 rounded  text-lg">
            Søk
          </button>

          {dropdownVisible && (
            <div className="relative">
              <div className="absolute z-10  w-full bg-accent text-black shadow-lg  py-2">
                {searchResults.map((item, index) => (
                  <div
                    onClick={() => {
                      setSearch("");
                      setDropdownVisible(false);
                    }}
                    key={index}
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  >
                    {item.name}
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
