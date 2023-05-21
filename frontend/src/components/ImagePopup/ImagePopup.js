function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup-img ${
        Object.keys(card).length !== 0 ? "popup_opened" : ""
      }`}
    >
      <div className="popup-img__content">
        <button
          type="button"
          aria-label="Закрыть"
          className="popup__close-button button"
          onClick={onClose}
        ></button>
        <img className="popup-img__image" src={card.link} alt={card.name} />
        <p className="popup-img__name">{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
