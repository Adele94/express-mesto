import plusImg from '../images/plus.svg';
import avatarEditImg from '../images/Vector-avatar.svg';
import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Main(props) {

  // Подписываемся на контекст CurrentUserContext
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <button className="profile__avatar-button">
          <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
          <img className="profile__avatar-edit" onClick={props.onEditAvatar} src={avatarEditImg} alt="Иконка редактирования" />
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button className="profile__button-edit" onClick={props.onEditProfile} type="button"></button>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button className="profile__button-add" onClick={props.onAddPlace} type="button">
          <img src={plusImg} alt="Знак '+'" />
        </button>
      </section>
      <section className="elements">
        {props.cards.map((item) => (
          <Card
            key={item._id} cardItem={item} onCardClick={props.onCardClick}
            onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}
          />
        )
        )}
      </section>
    </main>
  );
}

export default Main;