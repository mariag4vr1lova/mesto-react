function ImagePopup({card, isOpen, onClose}) {
    return(
      <div className={`popup popup_zoom_cards ${isOpen && 'popup_opened'}`}>
        <div className="popup__zoom-container">
          <button
            type="button"
            className="popup__button-close popup__button-close-zoom"
            onClick={onClose}
          />
          <img className="popup__zoom-image" src={card.link ? card.link : '#'} alt={card.name ? `Изображение ${card.name}` : '#'} />
          <figcaption className="popup__zoom-title"> {card.name} </figcaption>
        </div>
      </div>
    )
}
export default ImagePopup