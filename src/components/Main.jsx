import Quagga from "https://cdn.skypack.dev/@ericblade/quagga2";
import React, { useEffect, useRef, useState } from "react";
import ReactModal from "react-modal";

function Main() {
  const key = "NBT65Ohkkh5oIVNrbAfFuEO6ftZzZhzHWDdsRXNb";
  const [productName, setProductName] = useState("");
  const [productCalories, setProductCalories] = useState("");
  const barcodeScannerRef = useRef();

  useEffect(() => {
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
      console.log("Scanned barcode:", code);
      test(`products/ean/${code}`);
      stopScanner();
    });

    return () => {
      Quagga.stop();
      Quagga.offDetected();
    };
  }, []);

  async function test(url) {
    try {
      const response = await fetch(`https://kassal.app/api/v1/${url}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
      });

      if (!response.ok) {
        console.log(response);
        console.error(`Error: ${response.status} - ${response.statusText}`);
        return;
      }

      const data = await response.json();
      console.log(data);
      setProductName(data.data.products[0].name);
      setProductCalories(data.data.nutrition[0].amount);
      setIsOpen(true);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  function stopScanner() {
    Quagga.stop();
  }

  ReactModal.setAppElement("#root");

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div ref={barcodeScannerRef}>
      <div className=" max-w-lg">
        <button onClick={openModal}>Open Modal</button>
        <ReactModal
          style={{
            overlay: {
              backgroundColor: "rgba(0, 0, 0, 0.75)",
            },
            content: {
              color: "lightsteelblue",
              backgroundColor: "#EFEFEF",
              maxWidth: "30rem",
              margin: "4rem auto",
              color: "#000",
              top: "35%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
            },
          }}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Info"
        >
          <h2 className=" text-4xl">
            {productName ? productName : "Ingen info tilgjengelig"}
          </h2>
          <div>
            {productCalories ? productCalories : "Ingen info tilgjengelig"}
          </div>
          <button onClick={closeModal}>close</button>
        </ReactModal>
      </div>
    </div>
  );
}

export default Main;
