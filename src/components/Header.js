import headerLogo from '../images/logo.svg';
import { Link, Switch, Route } from 'react-router-dom';

function Header(props) {

  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Логотип" />
      <Switch>
        <Route exact path="/">
          <div className="header__navigation">
            <p className="header__email">{props.email}</p>
            <Link to="/sign-in" className="header__link" onClick={props.onSignOut}>Выйти</Link>
          </div>
        </Route>
        <Route path="/sign-up">
          <Link to="/sign-in" className="header__link">Войти</Link>
        </Route>
        <Route path="/sign-in">
          <Link to="/sign-up" className="header__link">Регистрация</Link>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;