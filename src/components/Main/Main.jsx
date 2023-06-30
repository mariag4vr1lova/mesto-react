import { useEffect, useState } from "react"
import api from "../../utils/api"
import Card from "../Card/Card.jsx"

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {
    const [userName, setUserName] = useState ('')
    const [userDescription, setUserDescription] = useState ('')
    const [userAvatar, setUserAvatar] = useState ('') 
    const [cards, setCards] = useState ([])
    
    useEffect(() => {
        Promise.all([api.getInfo(), api.getCards()])
            .then(([dataUser, dataCard]) => {
                setUserName(dataUser.name)
                setUserDescription(dataUser.about)
                setUserAvatar(dataUser.avatar)
                dataCard.forEach(data => data.myid = dataUser._id);  
                setCards(dataCard)
            });
    }, [])
    return(
    <main className="content">
        <section className="profile">
            <div className="profile__container">
                <button className="profile__avatar-overlay" onClick={onEditAvatar}>
                    <img className="profile__avatar" src={userAvatar} alt="Аватар пользователя" />
                </button>
            </div>
            <div className="profile__info">
                <div className="profile__personal-info">
                    <h1 className="profile__title"> {userName} </h1>
                    <button
                        className="profile__edit-button hover-animation"
                        type="button"
                        aria-label="Редактировать"
                        onClick={onEditProfile}
                    />
                </div>
                <p className="profile__subtitle"> {userDescription} </p>
            </div>
            <button className="profile__add-button hover-animation" type="button" onClick={onAddPlace}/>
        </section>
        <section>
            <ul className="elements">
                {cards.map(data => {
                   return(
                    <li className="element" key = {data._id}>
                     <Card card = {data} onCardClick= {onCardClick}/> 
                    </li>
                    )
                })}
            </ul>
        </section>
    </main>
    )
}
export default Main