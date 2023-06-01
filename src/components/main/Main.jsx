import React, { useState } from "react";
import BarcodeScanner from "./BarcodeScanner";
import fetchProductData from "./apiHandler";
import Modal from "./CustomModal";

function Main() {
  const [barcode, setBarcode] = useState("");
  const [product, setProduct] = useState("");
  const [stores, setStores] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isScannerRunning, setScannerRunning] = useState(true);

  const onDetected = async (code) => {
    setBarcode(code);
    setScannerRunning(false);
    try {
      const data = await fetchProductData(`products/ean/${code}`);
      setProduct(data.product);
      setStores(data.stores);
    } catch (error) {
      console.error(error);
      alert(error);
    }
    openModal();
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
      <button
        onClick={async () => {
          openModal();
          const data = await fetchProductData(`products/ean/5060337502238`);
          setProduct(data.product);
          setStores(data.stores);
        }}
      >
        Open Modal
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        product={product}
        stores={stores}
        showAll={showAll}
        setShowAll={setShowAll}
      />
    </div>
  );
}

export default Main;
