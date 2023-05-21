import { useRef } from "react";
// import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  // const currentUser = useContext(CurrentUserContext);
  // const [avatar, setAvatar] = useState("");

  // useEffect(() => {
  //   setAvatar(currentUser.avatar);
  //   console.log(avatar);
  // }, [avatar]);

  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="change"
      children={
        <>
          <div className="popup__error-box">
            <input
              id="link-avatar-input"
              type="url"
              className="popup__item popup__item_type_link"
              name="cardLink"
              placeholder="Ссылка на фото"
              required
              ref={avatarRef}
            />
            <span className="popup__error link-avatar-input-error"></span>
          </div>
        </>
      }
      nameBtn="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}
