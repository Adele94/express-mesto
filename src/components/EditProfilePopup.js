import PopupWithForm from './PopupWithForm';
import React, { useEffect, useState, useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  // Обработчик изменения инпута обновляет стейт
  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm title="Редактировать профиль" name="edit" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} buttonText='Сохранить'>
      <section className="popup__input-section">
        <input type="text" className="popup__input popup__input_edit_name" onChange={handleNameChange} value={name || ''} name="name" placeholder="Имя" required minLength="2" maxLength="40" />
        <span className="popup__input-error name-input-error"></span>
      </section>
      <section className="popup__input-section">
        <input type="text" className="popup__input popup__input_edit_description" onChange={handleDescriptionChange} value={description || ''} name="description" placeholder="О себе" required minLength="2" maxLength="200" />
        <span className="popup__input-error description-input-error"></span>
      </section>
    </PopupWithForm>
  );
}

export default EditProfilePopup;