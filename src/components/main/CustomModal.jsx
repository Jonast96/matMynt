import ReactModal from "react-modal";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

ReactModal.setAppElement("#root");
function Modal({
  isOpen,
  onRequestClose,
  product,
  stores,
  showAll,
  setShowAll,
  data,
}) {
  const storesToShow = showAll ? stores : stores.slice(0, 4);
  const [showNutrition, setShowNutrition] = useState(false);
  const [showAllergens, setShowAllergens] = useState(false);
  const [showPriceHistory, setShowPriceHistory] = useState(
    Array(stores.length).fill(false)
  );

  function formatDate(isoDate) {
    let date = new Date(isoDate);
    let day = String(date.getDate()).padStart(2, "0");
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  let noAllergens = data?.allergens?.every(
    (allergen) => allergen.contains === "NO"
  );

  return (
    <ReactModal
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          maxWidth: "32rem",
          margin: "auto",
          bottom: 0,
          backgroundColor: "rgba(255, 255, 255, 0.75)",
        },
        content: {
          position: "absolute",
          top: "40px",
          left: "40px",
          right: "40px",
          bottom: "40px",
          border: "1px solid #ccc",
          background: "#fff",
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
          borderRadius: "4px",
          outline: "none",
          padding: "10px",
          inset: "0px",
          width: "90%",
          margin: "auto",
          height: "90%",
        },
      }}
      isOpen={isOpen}
      shouldCloseOnOverlayClick={true}
      onRequestClose={onRequestClose}
      contentLabel="Info"
    >
      <div className="customModal">
        <div className="mb-4 flex justify-center items-center gap-4">
          <img className="w-12 " src={product.image} alt="" />
          <h2 className=" text-xl testing">
            {product.name ? product.name : "..."}
          </h2>
        </div>
        <div className="flex flex-col gap-2 ">
          {storesToShow.map((store, index) => {
            const formattedData = store.price_history.map((item) => ({
              ...item,
              date: formatDate(item.date),
            }));

            return (
              <div
                key={index}
                className=" border-b-2 border-white pb-1 flex-wrap"
              >
                <div
                  onClick={() => {
                    const newShowPriceHistory = [...showPriceHistory];
                    newShowPriceHistory[index] = !newShowPriceHistory[index];
                    setShowPriceHistory(newShowPriceHistory);
                  }}
                  className="flex justify-between items-center"
                >
                  <img className=" h-8 me-2" src={store?.store?.logo} alt="" />
                  <h3>{store?.store?.name}</h3>
                  <div className=" text-center">
                    <h3>{store?.current_price?.price}kr</h3>
                    <h3 className=" text-sm">
                      {formatDate(store?.current_price?.date)}
                    </h3>
                  </div>
                </div>

                {showPriceHistory[index] && (
                  <>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart
                        data={formattedData}
                        syncId="anyId"
                        margin={{
                          top: 10,
                          right: 30,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="price"
                          stroke="#8884d8"
                          fill="#8884d8"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                    <FontAwesomeIcon
                      onClick={() => {
                        const newShowPriceHistory = [...showPriceHistory];
                        newShowPriceHistory[index] = false;
                        setShowPriceHistory(newShowPriceHistory);
                      }}
                      className="ms-auto m-2"
                      icon={faArrowUp}
                    />
                  </>
                )}
              </div>
            );
          })}
          {!showAll && (
            <button
              className="  underline text-primary font-semibold"
              onClick={() => setShowAll(true)}
            >
              Vis Mer
            </button>
          )}
          {showAll && (
            <button
              className="  underline text-primary font-semibold"
              onClick={() => setShowAll(false)}
            >
              Vis Mindre
            </button>
          )}
        </div>
        <div
          onClick={() => setShowNutrition(!showNutrition)}
          className="bg-white rounded p-2 mt-4"
        >
          <div className="flex justify-between items-center">
            <h3 className="underline cursor-pointer text-secondary font-semibold ">
              Næringsinnhold per 100g
            </h3>
            <FontAwesomeIcon icon={faArrowDown} />
          </div>
          {showNutrition ? (
            <ul className="mt-3">
              {data?.nutrition?.map((nutrient, index) => (
                <li key={index} className="mb-1">
                  {nutrient.display_name}:{" "}
                  <span className="  font-semibold">
                    {nutrient.amount} {nutrient.unit}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            ""
          )}
        </div>
        <div
          onClick={() => setShowAllergens(!showAllergens)}
          className="bg-white rounded p-2"
        >
          <div className="flex justify-between items-center">
            <h3 className="underline cursor-pointer text-secondary font-semibold ">
              Allergener
            </h3>
            <FontAwesomeIcon icon={faArrowDown} />
          </div>
          {showAllergens ? (
            data?.allergens?.length > 0 ? (
              <ul className="mt-3">
                {noAllergens ? (
                  <li className="mb-1">Ingen allergener</li>
                ) : (
                  data?.allergens?.map(
                    (allergen, index) =>
                      allergen.contains === "YES" && (
                        <li key={index} className="mb-1">
                          {allergen.code}
                        </li>
                      )
                  )
                )}
              </ul>
            ) : (
              "Det finnes ikke informasjon på dette produktet"
            )
          ) : (
            ""
          )}
        </div>
        <button
          className="bg-accent text-white font-bold mt-4 float-right py-2 px-4 rounded"
          onClick={onRequestClose}
        >
          Lukk
        </button>
      </div>
    </ReactModal>
  );
}

export default Modal;
