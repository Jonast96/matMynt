import ReactModal from "react-modal";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

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

  console.log(noAllergens);

  return (
    <ReactModal
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.75)",
        },
        content: {
          backgroundColor: "#EFEFEF",
          margin: "1rem auto",
          color: "#000",
          scrollbarGutter: "stable both-edges",
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
          {storesToShow.map((store, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b-2 border-white pb-1"
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
          ))}
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
