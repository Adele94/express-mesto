import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ cardItem, onCardClick, onCardLike, onCardDelete }) {

  // Подписываемся на контекст CurrentUserContext
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = cardItem.owner._id === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `element__trash ${isOwn ? 'element__trash_visible' : ''}`
  );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = cardItem.likes.some(i => i._id === currentUser._id);

  const cardLikeButtonClassName = (
    `element__like ${isLiked ? 'element__like_active' : ''}`
  );

  function handleClick() {
    onCardClick(cardItem);
  }

  function handleLikeClick() {
    onCardLike(cardItem);
  }

  function handleDeleteClick() {
    onCardDelete(cardItem);
  }

  return (
    <div className="element">
      <img className="element__image" onClick={handleClick} src={cardItem.link} alt={cardItem.name} />
      <button className={cardDeleteButtonClassName} onClick={handleDeleteClick} type="button"></button>
      <div className="element__info">
        <h2 className="element__text">{cardItem.name}</h2>
        <div>
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
          <h2 className="element__like-count">{cardItem.likes.length}</h2>
        </div>
      </div>
    </div>
  );
}

export default Card;