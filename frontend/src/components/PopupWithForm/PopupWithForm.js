function PopupWithForm({
  title,
  name,
  children,
  nameBtn,
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <div className={`popup popup-${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__content">
        <button
          type="button"
          aria-label="Закрыть"
          className="popup__close-button button"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{`${title}`}</h2>
        <form
          className="popup__container"
          name={`${name}-forma`}
          method="post"
          noValidate
          onSubmit={onSubmit}
        >
          {children}
          <button type="submit" className="popup__save-button button">
            {nameBtn}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
