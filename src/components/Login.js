import React from 'react';

function Login(props) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin({ password, email });
  }

  return (
    <div className="authorize" >
      <p className="authorize__title" >Вход</p>
      <form className="authorize__form" onSubmit={handleSubmit}>
        <section className="authorize__input-section">
          <input className="authorize__input" id="email" name="email" type="email" placeholder="Email" value={email || ''} onChange={handleEmailChange} required />
        </section>
        <section className="authorize__input-section">
          <input className="authorize__input" id="password" name="password" type="password" placeholder="Пароль" value={password || ''} onChange={handlePasswordChange} required />
        </section>
        <div className="authorize__button-container" >
          <button type="submit" className="authorize__submit" > Войти </button>
        </div >
      </form>
    </div >
  );
}

export default Login;