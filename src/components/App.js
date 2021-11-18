import '../App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import AddPlacePopup from './AddPlacePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';

import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import api from "../utils/Api";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import * as auth from '../utils/auth';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [isRegSuccess, setRegSuccess] = useState(false);
  const [selectedCard, setSelctedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const history = useHistory();


  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelctedCard(card)
  }

  function handleUpdateUser(user) {
    api.updateUserProfile(user.name, user.about)
      .then(result => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateAvatar(user) {
    api.updateAvatarProfile(user.avatar.value)
      .then((result) => {
        setCurrentUser(result);
        //popupAvatarSubmitBtn.textContent = "Сохранить";
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.renderLikes(card._id, isLiked ? 'DELETE' : 'PUT').then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    // Отправляем запрос в API на удаление карточки
    api.deleteCard(card._id)
      .then(() => {
        setCards(cards.filter(item => item._id !== card._id))
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(card) {
    api.addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setInfoTooltipPopupOpen(false);
    setSelctedCard(null);
  }

  function handleRegister({ password, email }) {
    auth.register({ password, email })
      .then(() => {
        setRegSuccess(true);
        history.push('/sign-in');
      })
      .catch((err) => {
        setRegSuccess(false);
        console.log(err);
      })
      .finally(() => {
        setInfoTooltipPopupOpen(true);
      })
  }

  function handleLogin({ password, email }) {
    auth.authorize({ password, email })
      .then((res) => {
        localStorage.setItem('token', res.token);
        setUserEmail(email);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      })
  }
  function handleSignOut() {
    localStorage.removeItem('token');
    setUserEmail('');
    setLoggedIn(false);
  }


  function handleTokenCheck() {
    if (localStorage.getItem('token')) {
      const jwt = localStorage.getItem('token');
      // проверяем токен пользователя
      auth.checkToken(jwt)
        .then((res) => {
          setUserEmail(res.data.email)
          setLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    handleTokenCheck();
    api.getUserProfile()
      .then((result) => {
        setCurrentUser(result);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  useEffect(() => {
    api.getInitialCards()
      .then((result) => {
        setCards(result);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  useEffect(() => {
    if (loggedIn === true) {
      history.push("/");
    }
  }, [loggedIn, history]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header email={userEmail} onSignOut={handleSignOut} />
        <Switch>
          <ProtectedRoute exact path="/"
            component={Main} loggedIn={loggedIn} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} >
          </ProtectedRoute>
          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>
          <Route path="/sign-up">
            <Register onRegister={handleRegister} />
          </Route>
        </Switch>
        {loggedIn && <Footer />}
        <InfoTooltip isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups} regStatus={isRegSuccess} />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <ImagePopup onClose={closeAllPopups} card={selectedCard} />
        <PopupWithForm title="Вы уверены" name="delete-card" buttonText='Да' />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
