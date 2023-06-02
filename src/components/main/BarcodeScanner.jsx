import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Quagga from "https://cdn.skypack.dev/@ericblade/quagga2";

function getMedian(arr) {
  arr.sort((a, b) => a - b);
  const half = Math.floor(arr.length / 2);
  if (arr.length % 2 === 1) {
    return arr[half];
  }
  return (arr[half - 1] + arr[half]) / 2;
}

function getMedianOfCodeErrors(decodedCodes) {
  const errors = decodedCodes
    .filter((x) => x.error !== undefined)
    .map((x) => x.error);
  const medianOfErrors = getMedian(errors);
  return medianOfErrors;
}

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
          constraints: {
            width: { min: 640 },
            height: { min: 480 },
            aspectRatio: { min: 1, max: 100 },
            facingMode: "environment",
          },
        },
        locator: {
          patchSize: "medium",
          halfSample: true,
        },
        numOfWorkers: 4,
        frequency: 10,
        decoder: {
          readers: ["ean_reader", "upc_reader", "code_128_reader"],
          multiple: false,
        },
        locate: true,
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
      console.log(result);
      const err = getMedianOfCodeErrors(result.codeResult.decodedCodes);
      // If Quagga is at least 75% certain that it read correctly, then accept the code.
      if (err < 0.25) {
        onDetected(code);
      }
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

BarcodeScanner.propTypes = {
  onDetected: PropTypes.func.isRequired,
  running: PropTypes.bool.isRequired,
};

export default BarcodeScanner;
