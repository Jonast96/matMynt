import Quagga from "https://cdn.skypack.dev/@ericblade/quagga2";
import React, { useEffect, useRef, useState } from "react";
import ReactModal from "react-modal";
import "./main.scss";

function Main() {
  const key = "NBT65Ohkkh5oIVNrbAfFuEO6ftZzZhzHWDdsRXNb";
  const [product, setProduct] = useState("");
  const [stores, setStores] = useState([]);
  const [showAll, setShowAll] = useState(false); // New state variable
  const [barcode, setBarcode] = useState("");
  const barcodeScannerRef = useRef();

  useEffect(() => {
    startScanner();
    return () => {
      stopScanner();
    };
  }, []);

  const startScanner = () => {
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: barcodeScannerRef.current,
        },
        decoder: {
          readers: ["ean_reader", "upc_reader", "code_128_reader"],
        },
      },
      function (err) {
        if (err) {
          console.log(err);
          return;
        }
        Quagga.start();
      }
    );

    Quagga.onDetected(function (result) {
      const code = result.codeResult.code;
      setBarcode(code);
      console.log("Scanned barcode:", code);
      test(`products/ean/${code}`);
      stopScanner();
      openModal();
    });
  };

  const stopScanner = () => {
    Quagga.stop();
    Quagga.offDetected();
  };

  async function test(url) {
    try {
      const response = await fetch(`https://kassal.app/api/v1/${url}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
      });

      const data = await response.json();
      console.log(data);
      setProduct(data?.data?.products?.[0] || "");

      const sortedStores = data?.data?.products?.sort((a, b) => {
        return a?.current_price?.price - b?.current_price?.price;
      });

      setStores(sortedStores || []);
      console.log(sortedStores);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  ReactModal.setAppElement("#root");

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setShowAll(false);
    startScanner();
  }
  const storesToShow = showAll ? stores : stores.slice(0, 4);

  return (
    <div>
      <div
        className="rounded-xl overflow-hidden videoContainer"
        ref={barcodeScannerRef}
      ></div>
      <div className=" max-w-lg">
        <button
          onClick={() => {
            openModal();
            test(`products/ean/5060337502238`);
          }}
        >
          Open Modal
        </button>
        <ReactModal
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.75)",
            },
            content: {
              backgroundColor: "#EFEFEF",
              maxWidth: "30rem",
              margin: "4rem auto",
              color: "#000",
            },
          }}
          isOpen={modalIsOpen}
          shouldCloseOnOverlayClick={true}
          onRequestClose={closeModal}
          contentLabel="Info"
        >
          <div className="mb-4 flex ">
            <h2 className=" text-xl">{product.name ? product.name : "..."}</h2>
            <img className="w-12 " src={product.image} alt="" />
          </div>
          <div className="flex flex-col gap-2 ">
            {storesToShow.map((store, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-between border-b-2 border-white pb-1"
                >
                  <img className=" h-8 me-2" src={store?.store?.logo} alt="" />
                  <h3>{store?.store?.name}</h3>
                  <h3>{store?.current_price?.price}kr</h3>
                </div>
              );
            })}
            {!showAll && (
              <button onClick={() => setShowAll(true)}>Show More</button>
            )}
          </div>
          <button
            className="bg-secondary text-primary font-bold mt-4 py-2 px-4 rounded"
            onClick={closeModal}
          >
            close
          </button>
        </ReactModal>
      </div>
    </div>
  );
}

export default Main;
