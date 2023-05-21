import { useContext } from "react";
import Card from "../Card/Card";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
// import { CardsContext } from "../../contexts/CardsContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const userInfo = useContext(CurrentUserContext);
  // const cardsInfo = useContext(CardsContext);

  return (
    <>
      <main className="content">
        <section className="profile">
          <div className="profile__avatar-box">
            <img
              src={userInfo.avatar}
              alt="аватар"
              className="profile__avatar"
            />
            <button
              type="button"
              aria-label="Редактировать фото"
              className=" button profile__avatar-overlay"
              onClick={onEditAvatar}
            ></button>
          </div>
          <div className="profile__info">
            <div className="profile__heading">
              <h1 className="profile__name">{userInfo.name}</h1>
              <button
                type="button"
                aria-label="Редактировать информацию страницы"
                className="profile__edit-button button"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__description">{userInfo.about}</p>
          </div>
          <button
            type="button"
            aria-label="Добавить"
            className="profile__add-button button"
            onClick={onAddPlace}
          ></button>
        </section>

        <section className="elements">
          <ul className="elements__table">
            {cards.map((card) => (
              <Card
                card={card}
                onCardClick={onCardClick}
                key={card._id}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}

export default Main;
