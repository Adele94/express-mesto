import React from 'react';
import successImg from '../images/Success.svg';
import failImg from '../images/Fail.svg';

function InfoTooltip(props) {

  return (
    <section className={`popup popup_type_info-tooltip ${props.isOpen ? 'popup_is-opened' : ''}`}  >
      <div className="popup__container">
        <button className="popup__close " onClick={props.onClose} type="button"></button>
        <div className="info-tooltip__content">
          <img src={props.regStatus ? successImg : failImg} alt="Статус регистрации" />
          <p className="info-tooltip__text">{props.regStatus ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</p>
        </div>
      </div>
    </section>
  )
}

export default InfoTooltip;