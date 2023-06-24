import React, { useState } from "react";
import BarcodeScanner from "./BarcodeScanner";
import fetchProductData from "./apiHandler";
import Modal from "./CustomModal";
import "./main.scss";

function Main() {
  const [product, setProduct] = useState("");
  const [stores, setStores] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isScannerRunning, setScannerRunning] = useState(true);
  const [mainData, setMainData] = useState({});

  const onDetected = async (code) => {
    setScannerRunning(false);
    try {
      const data = await fetchProductData(`products/ean/${code}`);
      setProduct(data.product);
      setStores(data.stores);
      setMainData(data.data);
      openModal();
    } catch (error) {
      console.error(error);
      alert(
        "Ingen resultater, prøv igjen eller skriv inn produktet du leter etter i søkefeltet"
      );
      setScannerRunning(true);
    }
  };

  const openModal = () => {
    setIsOpen(true);
    setScannerRunning(false);
  };

  const closeModal = () => {
    setIsOpen(false);
    setShowAll(false);
    setScannerRunning(true);
  };

  return (
    <div>
      <BarcodeScanner onDetected={onDetected} running={isScannerRunning} />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        product={product}
        stores={stores}
        showAll={showAll}
        setShowAll={setShowAll}
        data={mainData}
      />
    </div>
  );
}

export default Main;
