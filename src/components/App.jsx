import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import { useCallback, useEffect, useState } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.jsx";

function App() {
  //стейты попапа
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopup, setIsImagePopup] = useState(false);
  const [isSend, setIsSend] = useState(false);
  //стейты контекста
  const [currentUser, setCurrentUser] = useState({});
  //стейты карточки
  const [cards, setCards] = useState([]);
  const [isLoadingCards, setIsLoadingCards] = useState(true);
  const [deleteCardId, setDeleteCardId] = useState("");

  const setAllStatesForClosePopups = useCallback(() => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsImagePopup(false);
  }, []);
  const closePopupByEsc = useCallback(
    (evt) => {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    },
    [setAllStatesForClosePopups]
  );
  const closeAllPopups = useCallback(() => {
    setAllStatesForClosePopups();
    document.removeEventListener("keydown", closePopupByEsc);
  }, [setAllStatesForClosePopups, closePopupByEsc]);
  function setEvantListnerForDocument() {
    document.addEventListener("keydown", closePopupByEsc);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    setEvantListnerForDocument();
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    setEvantListnerForDocument();
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    setEvantListnerForDocument();
  }
  function handleDeletePopupClick(cardId) {
    setDeleteCardId(cardId);
    setIsDeletePopupOpen(true);
    setEvantListnerForDocument();
  }
  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopup(true);
    setEvantListnerForDocument();
  }
  useEffect(() => {
    setIsLoadingCards(true);
    Promise.all([api.getInfo(), api.getCards()])
      .then(([dataUser, dataCard]) => {
        setCurrentUser(dataUser);
        setCards(dataCard);
        setIsLoadingCards(false);
      })
      .catch((error) =>
        console.error(
          "Ошибка при получении данных с сервера о пользователе и карточках"`${error}`
        )
      );
  }, []);
  function handleCardDelete(evt) {
    evt.preventDefault();
    setIsSend(true);
    api
      .deleteCard(deleteCardId)
      .then(() => {
        setCards(
          cards.filter((card) => {
            return card._id !== deleteCardId;
          })
        );
        closeAllPopups();
      })
      .catch((error) => console.error("Ошибка при удалении карточки"`${error}`))
      .finally(() => setIsSend(false));
  }
  function handleUpdateUser(dataUser, reset) {
    setIsSend(true);
    api
      .setUserInfo(dataUser)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        reset();
      })
      .catch((error) =>
        console.error("Ошибка при редактировании профиля"`${error}`)
      )
      .finally(() => setIsSend(false));
  }
  function handleUpdateAvatar(dataUser, reset) {
    setIsSend(true);
    api
      .setNewAvatar(dataUser)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        reset();
      })
      .catch((error) =>
        console.error("Ошибка при редактировании ававтара"`${error}`)
      )
      .finally(() => setIsSend(false));
  }
  function handleAddPlaceSubmit(dataCard, reset) {
    setIsSend(true);
    api
      .addCard(dataCard)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
        reset();
      })
      .catch((error) =>
        console.error("Ошибка при добавлении карточки"`${error}`)
      )
      .finally(() => setIsSend(false));
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <Header />

        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onDelete={handleDeletePopupClick}
          cards={cards}
          isLoading={isLoadingCards}
        />

        <Footer />

        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          isSend={isSend}
        />

        <AddPlacePopup
          onAddPlace={handleAddPlaceSubmit}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          isSend={isSend}
        />

        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          isSend={isSend}
        />

        <PopupWithForm
          name="popup-delete"
          title="Вы уверены?"
          titleButton="Да"
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
          isSend={isSend}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopup}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
