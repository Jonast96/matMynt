import Quagga from "https://cdn.skypack.dev/@ericblade/quagga2";
import React, { useEffect, useRef } from "react";

function BarcodeScanner({ onDetected, running }) {
  const barcodeScannerRef = useRef();

  useEffect(() => {
    if (running) {
      startScanner();
    } else {
      stopScanner();
    }
    return () => {
      stopScanner();
    };
  }, [running]);

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
      onDetected(code);
      Quagga.offDetected();
      stopScanner();
    });
  };

  const stopScanner = () => {
    Quagga.stop();
  };

  return (
    <div
      className="rounded-xl overflow-hidden videoContainer"
      ref={barcodeScannerRef}
    ></div>
  );
}

export default BarcodeScanner;
