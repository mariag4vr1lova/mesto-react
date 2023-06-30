import Header from './Header/Header.jsx'
import Main from './Main/Main.jsx';
import Footer from './Footer/Footer.jsx';
import PopupWithForm from './PopupWithForm/PopupWithForm.jsx';
import PopupImage from './PopupImage/PopupImage.jsx';
import { useState } from 'react';
function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard ] = useState({})
  const [isImagePopup, setIsImagePopup] = useState(false)
  
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsImagePopup(false)
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)

  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }
  function handleDelete() {
    
  }
  function handleCardClick(card) {
    setSelectedCard(card)
    setIsImagePopup(true)
    //setEvantListenerForDocument()
  } 
  return (
  <div className="page__content">

    <Header />

    <Main
    onEditProfile = {handleEditProfileClick}
    onAddPlace = {handleAddPlaceClick}
    onEditAvatar = {handleEditAvatarClick}
    onCardClick = {handleCardClick}
     />

    <Footer />

    <PopupWithForm 
      name='popup-profile'
      title = 'Редактировать профиль'
      isOpen = {isEditProfilePopupOpen}
      onClose = {closeAllPopups}
    >
       <input
              id="input-username"
              type="text"
              className="popup__input popup__input_user_name"
              placeholder="Ваше имя"
              defaultValue=""
              name="username"
              minLength={2}
              maxLength={40}
              required=""
            />
            <span className="popup__error popup__error_visible input-username-error" />
            <input
              id="input-subtitle"
              type="text"
              className="popup__input popup__input_user_text"
              placeholder="О себе"
              defaultValue=""
              name="subtitle"
              minLength={2}
              maxLength={200}
              required=""
            />
            <span className="popup__error popup__error_visible input-subtitle-error" />
    </PopupWithForm>

    <PopupWithForm 
      name='popup-cards'
      title = 'Новое место'
      titleButton = 'Создать'
      isOpen = {isAddPlacePopupOpen}
      onClose = {closeAllPopups}
    >
      <input
              type="text"
              className="popup__input popup__input_image_name"
              id="title"
              placeholder="Название"
              defaultValue=""
              name="title"
              minLength={2}
              maxLength={30}
              required=""
            />
            <span className="popup__error popup__error_visible title-error" />
            <input
              type="url"
              className="popup__input popup__input_link_image"
              id="link"
              placeholder="Ссылка на картинку"
              defaultValue=""
              name="link"
              required=""
            />
            <span className="popup__error popup__error_visible link-error" />
    </PopupWithForm>

    <PopupWithForm 
      name='popup-edit-avata'
      title = 'Обновить аватар'
      isOpen = {isEditAvatarPopupOpen}
      onClose = {closeAllPopups}
    >
       <input
              type="url"
              className="popup__input popup__input_avatar_link"
              id="avatar"
              placeholder="Ссылка на картинку"
              name="avatar"
              required=""
            />
            <span className="popup__error popup__error_visible avatar-error" />
    </PopupWithForm>

    <PopupWithForm 
      name='popup-delete'
      title = 'Вы уверены?'
      titleButton = 'Да'
    /> 
    <PopupImage
      card = {selectedCard}
      isOpen = {isImagePopup}
      onClose = {closeAllPopups}
    /> 
      
  </div>
  );
}

export default App;
