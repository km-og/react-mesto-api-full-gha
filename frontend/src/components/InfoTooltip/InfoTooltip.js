import iconSuccess from "../../images/Union.png";
import iconFail from "../../images/UnionFail.png";

function InfoTooltip({ isOpen, onClose, isSuccessful }) {
  console.log(isSuccessful);
  return (
    <div className={`popup popup-status ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__content">
        <button
          type="button"
          aria-label="Закрыть"
          className="popup__close-button button"
          onClick={onClose}
        ></button>
        <div className="popup__container">
          <img
            src={isSuccessful ? iconSuccess : iconFail}
            alt="иконка статуса регистрации"
            className="popup__icon"
          />
          <h2 className="popup__subtitle">
            {isSuccessful
              ? "Вы успешно зарегистрировались!"
              : `Что-то пошло не так! Попробуйте ещё раз.`}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
