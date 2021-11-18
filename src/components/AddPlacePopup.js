import PopupWithForm from './PopupWithForm';
import React from 'react';

function AddPlacePopup(props) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onAddPlace({
      name: name,
      link: link,
    });
    setName('');
    setLink('');
  }

  return (
    <PopupWithForm title="Новое место" name="place" isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} buttonText='Создать'>
      <section className="popup__input-section">
        <input type="text" className="popup__input popup__input_place_name" onChange={handleNameChange} value={name} name="name" placeholder="Название" minLength="2" maxLength="30" required />
        <span className="popup__input-error name-input-error"></span>
      </section>
      <section className="popup__input-section">
        <input type="url" className="popup__input popup__input_place_link" onChange={handleLinkChange} value={link} name="link" placeholder="Ссылка на картинку" required />
        <span className="popup__input-error link-input-error"></span>
      </section>
    </PopupWithForm>
  )
}

export default AddPlacePopup;