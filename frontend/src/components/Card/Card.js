import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
// import { CardsContext } from "../../contexts/CardsContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const userInfo = useContext(CurrentUserContext);
  // const cardsInfo = useContext(CardsContext);

  const isOwn = card.owner._id === userInfo._id;
  const isLiked = card.likes.some((i) => i._id === userInfo._id);
  const cardLikeBtnClassName = `elements__like-button button ${
    isLiked && "elements__like-button_type_active"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="elements__item">
      <div className="elements__card">
        {isOwn && (
          <button
            type="button"
            aria-label="Удалить"
            className="elements__delete-button button"
            onClick={handleDeleteClick}
          ></button>
        )}
        <img
          className="elements__photo"
          src={card.link}
          onClick={handleClick}
          alt={card.name}
        />
      </div>
      <div className="elements__subline">
        <h2 className="elements__title">{card.name}</h2>
        <div className="elements__likes">
          <button
            type="button"
            aria-label="Нравится"
            className={cardLikeBtnClassName}
            onClick={handleLikeClick}
          ></button>
          <p className="elements__likes-quantity">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
