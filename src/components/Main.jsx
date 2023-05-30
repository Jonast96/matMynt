import Quagga from "https://cdn.skypack.dev/@ericblade/quagga2";
import React, { useEffect, useRef, useState } from "react";

function Main() {
  const [productName, setProductName] = useState("");
  const [productCalories, setProductCalories] = useState("");
  const key = "NBT65Ohkkh5oIVNrbAfFuEO6ftZzZhzHWDdsRXNb";

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
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  function stopScanner() {
    Quagga.stop();
  }

  return (
    <div ref={barcodeScannerRef} className="w-full h-64">
      <button onClick={() => test(`products/ean/5900951027307`)}>
        test it
      </button>
      <p>{productName}</p>
      <p>{productCalories}</p>
    </div>
  );
}

export default Main;
