import React, { useState, useCallback, useEffect } from "react";
import { debounce } from "lodash";
import Modal from "../main/CustomModal";
import fetchProductData from "../main/apiHandler";

function Header() {
  const [search, setSearch] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const [mainData, setMainData] = useState({});
  const [stores, setStores] = useState([]);
  const [product, setProduct] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const key = "NBT65Ohkkh5oIVNrbAfFuEO6ftZzZhzHWDdsRXNb";

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setShowAll(false);
  };

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
    setSearchResults(data);
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        product={product}
        stores={stores}
        showAll={showAll}
        setShowAll={setShowAll}
        data={mainData}
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="searchContainer w-3/4  mx-auto mt-3"
      >
        <div>
          <input
            type="text"
            name="search"
            id="search"
            value={search}
            onChange={(e) => {
              handleChange(e);
            }}
            //FIKS PRISEN SÅNN LAVESTE ER FØRST
            placeholder="Søk etter produkt..."
            className=" bg-primary p-1 text-lg  w-full  text-white border-solid border-b-2 border-white focus:outline-none focus:border-accent"
          />

          {dropdownVisible && (
            <div className="relative">
              <div className="absolute z-10  w-full bg-accent text-black shadow-lg  py-2">
                {searchResults?.data?.length > 0
                  ? searchResults?.data?.map((item, index) => (
                      <div
                        onClick={async () => {
                          const data = await fetchProductData(
                            `products/ean/${item.ean}`
                          );
                          setSearch("");
                          setDropdownVisible(false);
                          setProduct(item);
                          setMainData(item);
                          openModal();
                          setStores(data.stores);
                        }}
                        key={index}
                        className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex justify-between items-center gap-2 text-center"
                      >
                        <img src={item.image} alt="" className="w-4" />
                        <p>{item.name}</p>

                        <p>{item.current_price},-</p>
                      </div>
                    ))
                  : ""}
              </div>
            </div>
          )}
        </div>
      </form>
    </>
  );
}

export default Header;
