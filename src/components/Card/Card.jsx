function Card({card, onCardClick}) {
    return(
    //<li className="element">
    <article>
        <img 
            className="element__image" 
            alt={`Изображение ${card.name}`} 
            src={card.link} 
            onClick={() => onCardClick({link: card.link, name: card.name})}/>
        <div className="element__block">
            <h2 className="element__title">{card.name}</h2>
            <div className="element__like-container">
                <button className="element__like" aria-label="Лайк" type="button" />
                <p className="element__counter" />
            </div>
        </div>
        <button
            className="element__delete-button"
            aria-label="Удалить"
            type="button"
        />
    </article>
    //</li>

    )
}
export default Card