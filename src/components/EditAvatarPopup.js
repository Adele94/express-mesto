import PopupWithForm from './PopupWithForm';
import React from 'react';

function EditAvatarPopup(props) {

  const avatarRef = React.useRef(); // записываем объект, возвращаемый хуком, в переменную

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current/* Значение инпута, полученное с помощью рефа */,
    });
  }

  return (
    <PopupWithForm title="Обновить аватар" name="avatar" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} buttonText='Сохранить'>
      <section className="popup__input-section">
        <input ref={avatarRef} type="url" className="popup__input popup__input_place_link" defaultValue="" name="link" placeholder="Ссылка на аватар" required />
        <span className="popup__input-error link-input-error"></span>
      </section>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;