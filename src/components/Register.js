import { Link } from 'react-router-dom';
import React, { useState } from 'react';

function Register(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);

  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister({ password, email });
  }

  return (
    <div className="authorize" >
      <p className="authorize__title">Регистрация</p>
      <form className="authorize__form" onSubmit={handleSubmit}>
        <section className="authorize__input-section">
          <input className="authorize__input" id="email" name="email" type="email" placeholder="Email" value={email || ''} onChange={handleEmailChange} required />
        </section>
        <section className="authorize__input-section">
          <input className="authorize__input" id="password" name="password" type="password" placeholder="Пароль" value={password || ''} onChange={handlePasswordChange} required />
        </section>
        <div className="authorize__button-container" >
          <button type="submit" className="authorize__submit"> Зарегистрироваться </button>
          <p className="authorize__question">Уже зарегистрированы?
            <Link to="sign-in" className="authorize__link"> Войти</Link></p>
        </div >
      </form>
    </div >
  );
}

export default Register;