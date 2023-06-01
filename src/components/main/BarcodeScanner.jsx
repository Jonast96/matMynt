import Quagga from "https://cdn.skypack.dev/@ericblade/quagga2";
import { useState, useRef, useEffect } from "react";

function BarcodeScanner({ onDetected }) {
  const barcodeScannerRef = useRef();

  useEffect(() => {
    startScanner();
    return () => {
      stopScanner();
    };
  }, []);

  const startScanner = () => {
    /* Start scanner code */
  };

  const stopScanner = () => {
    /* Stop scanner code */
  };

  Quagga.onDetected(function (result) {
    /* On detected code */
    const code = result.codeResult.code;
    onDetected(code);
    stopScanner();
  });

  return (
    <div
      className="rounded-xl overflow-hidden videoContainer"
      ref={barcodeScannerRef}
    ></div>
  );
}

export default BarcodeScanner;
