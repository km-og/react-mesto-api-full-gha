import { useEffect, useState } from "react";
import { EditProfilePopup } from "../EditProfilePopup/EditProfilePopup";
import { AddPlacePopup } from "../AddPlacePopup/AddPlacePopup";
import { EditAvatarPopup } from "../EditAvatarPopup/EditAvatarPopup";
import Header from "../Header/Header";
import Main from "../Main/Main";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import ImagePopup from "../ImagePopup/ImagePopup";
import Footer from "../Footer/Footer";
import { apiCards, apiNewUserInfo, apiUserInfo } from "../utils/Api";
import { CardsContext } from "../../contexts/CardsContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export function MainAfterLogIn({
  loggedIn,
  userEmail,
  isChangeOnExit,
  // onSubmitForm,
}) {
  // onSubmitForm();
  // console.log('rer');
  // console.log(loggedIn);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  const [selectedCard, setSelectedCard] = useState({});

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
  }
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    function getUserInfo() {
      apiUserInfo
        .getData()
        .then((data) => {
          setCurrentUser(data);
          // console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getUserInfo();
  }, []);

  const [cards, setCards] = useState([]);
  useEffect(() => {
    function getCardsInfo() {
      apiCards
        .getData()
        .then((data) => {
          setCards(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getCardsInfo();
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    const methodType = isLiked ? "DELETE" : "PUT";
    // console.log(methodType);
    apiCards
      .likeCard(card._id, methodType)
      .then((newCard) => {
        // console.log(newCard); данные карточки, которую лайкнули
        setCards((state) =>
          // console.log(state)  массив со всеми карточками
          state.map((c) =>
            // console.log(c)  каждая карточка этого массива
            c._id === card._id ? newCard : c
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    apiCards
      .deleteCardBtn(card._id)
      .then((newCard) => {
        setCards((state) => {
          const newState = state.filter((item) => {
            return item._id !== card._id;
          });
          return newState;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // сделать сначала

  function handleUpdateUser(data) {
    apiNewUserInfo
      .sendData(data, "PATCH")
      .then((newData) => {
        setCurrentUser(newData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(data) {
    apiNewUserInfo
      .changeAvatar(data)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    apiCards
      .sendData(data, "POST")
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardsContext.Provider value={cards}>
        <Header
          textLink="Выйти"
          loggedIn={loggedIn}
          email={userEmail}
          link="/sign-in"
          isChangeOnExit={isChangeOnExit}
        />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onUpdateCard={handleAddPlaceSubmit}
        />

        <PopupWithForm
          title="Вы уверены?"
          name="delete"
          children={null}
          nameBtn="Да"
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <Footer />
      </CardsContext.Provider>
    </CurrentUserContext.Provider>
  );
}
