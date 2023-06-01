import ReactModal from "react-modal";

ReactModal.setAppElement("#root");
function Modal({
  isOpen,
  onRequestClose,
  product,
  stores,
  showAll,
  setShowAll,
}) {
  const storesToShow = showAll ? stores : stores.slice(0, 4);

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
      <div className="mb-4 flex ">
        <h2 className=" text-xl">{product.name ? product.name : "..."}</h2>
        <img className="w-12 " src={product.image} alt="" />
      </div>
      <div className="flex flex-col gap-2 ">
        {storesToShow.map((store, index) => (
          <div
            key={index}
            className="flex justify-between border-b-2 border-white pb-1"
          >
            <img className=" h-8 me-2" src={store?.store?.logo} alt="" />
            <h3>{store?.store?.name}</h3>
            <h3>{store?.current_price?.price}kr</h3>
          </div>
        ))}
        {!showAll && (
          <button onClick={() => setShowAll(true)}>Show More</button>
        )}
      </div>
      <button
        className="bg-secondary text-primary font-bold mt-4 py-2 px-4 rounded"
        onClick={onRequestClose}
      >
        Close
      </button>
    </ReactModal>
  );
}

export default Modal;
