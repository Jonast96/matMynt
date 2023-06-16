import ReactModal from "react-modal";
import { useState } from "react";

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

  return (
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
      isOpen={isOpen}
      shouldCloseOnOverlayClick={true}
      onRequestClose={onRequestClose}
      contentLabel="Info"
    >
      <div className="mb-4 flex items-center justify-around">
        <h2 className=" text-xl">{product.name ? product.name : "..."}</h2>
        <img className="w-12 " src={product.image} alt="" />
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
        className="bg-accent rounded p-2 my-3"
      >
        <h3 className="underline cursor-pointer text-primary font-semibold ">
          Næringsinnhold per 100g
        </h3>
        {showNutrition ? (
          <ul>
            {data?.nutrition?.map((nutrient, index) => (
              <li key={index}>
                {nutrient.display_name}: {nutrient.amount} {nutrient.unit}
              </li>
            ))}
          </ul>
        ) : (
          ""
        )}
      </div>
      <div className="bg-accent rounded p-2 my-3">
        <h3 className="underline cursor-pointer text-primary font-semibold">
          Allergener
        </h3>
      </div>
      <button
        className="bg-secondary text-primary font-bold mt-4 float-right py-2 px-4 rounded"
        onClick={onRequestClose}
      >
        Lukk
      </button>
    </ReactModal>
  );
}

export default Modal;
