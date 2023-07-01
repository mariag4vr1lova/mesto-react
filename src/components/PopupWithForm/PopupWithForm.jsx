function PopupWithForm({name, title, titleButton, children, isOpen, onClose}) {
    return(
    <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`} >
        <div className="popup__container">
            <button className="popup__button-close" type="button" onClick={onClose}/>
            <h2 className="popup__title">{title}</h2>
            <form action="#" className="popup__form" name={name} noValidate=""> 
                {children} 
                <button type="submit" className="popup__button popup__button-save popup__button_disabled">
                    {titleButton || 'Сохранить'}
            </button>
            </form>
        </div>
    </div>
    )
}
export default PopupWithForm