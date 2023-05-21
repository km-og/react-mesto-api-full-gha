import { useEffect, useState } from "react";
// import { useForm } from "../hooks/useForm";
// import { useFormAndValidation } from "../hooks/useFormAndValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export function AddPlacePopup({ isOpen, onClose, onUpdateCard }) {
  const [cardName, setCardName] = useState("");

  function handleAddCardName(evt) {
    setCardName(evt.target.value);
    console.log(evt.target.value);
  }

  const [cardLink, setCardLink] = useState("");

  function handleAddCardLink(evt) {
    setCardLink(evt.target.value);
  }
  // const cardName = useForm();
  // const cardLink = useForm();

  useEffect(() => {
    setCardName("");
    setCardLink("");
  }, [isOpen]);
  // const { values, handleChange, errors, isValid, setValues, resetForm } =
  // useFormAndValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateCard({
      name: cardName,
      link: cardLink,
    });
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add"
      nameBtn="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
        <label className="popup__error-box">
          <input
            id="title-input"
            type="text"
            className="popup__item popup__item_type_name"
            name="cardName"
            placeholder="Название"
            required
            minLength="2"
            maxLength="30"
            value={cardName}
            // onChange={(e) => useForm.handleChange(e)}
            onChange={handleAddCardName}
          />
          <span className="popup__error title-input-error"></span>
        </label>
        <div className="popup__error-box">
          <input
            id="link-input"
            type="url"
            className="popup__item popup__item_type_link"
            name="cardLink"
            placeholder="Ссылка на картинку"
            required
            value={cardLink}
            onChange={handleAddCardLink}
            // onChange={(e) => useForm.handleChange(e)}
          />
          <span className="popup__error link-input-error"></span>
        </div>
      </>
    </PopupWithForm>
  );
}
