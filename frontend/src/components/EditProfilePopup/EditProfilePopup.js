import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import PopupWithForm from "../PopupWithForm/PopupWithForm.js";

export function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  const [description, setDescription] = useState("");

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      children={
        <>
          <label className="popup__error-box">
            <input
              id="name-input"
              type="text"
              className="popup__item popup__item_type_name"
              name="editHeading"
              placeholder="Имя"
              // defaultValue="Жак-Ив Кусто"
              value={name || ""}
              onChange={handleChangeName}
              required
              minLength="2"
              maxLength="40"
            />
            <span className="popup__error name-input-error"></span>
          </label>
          <label className="popup__error-box">
            <input
              id="description-input"
              type="text"
              className="popup__item popup__item_type_description"
              name="editSubheading"
              placeholder="О себе"
              // defaultValue="Исследователь океана"
              value={description || ""}
              onChange={handleChangeDescription}
              required
              minLength="2"
              maxLength="200"
            />
            <span className="popup__error description-input-error"></span>
          </label>
        </>
      }
      nameBtn="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}
