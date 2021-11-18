class Api {

  constructor(options) {
    this.url = options.baseUrl;
    this.headers = options.headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  //получение массива карточек 
  getInitialCards() {
    return fetch(this.url + '/cards', {
      headers: this.headers
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  //получаем данные пользователя
  getUserProfile() {
    return fetch(this.url + '/users/me', {
      headers: this.headers,
      method: 'GET'
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  //добавить карточку
  addNewCard(data) {
    return fetch(this.url + '/cards', {
      headers: this.headers,
      method: 'POST',
      body: JSON.stringify(data)
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  //удаляем карточку
  deleteCard(cardID) {
    return fetch(this.url + '/cards/' + cardID, {
      headers: this.headers,
      method: 'DELETE',
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  //обновляем данные пользователя
  updateUserProfile(userName, userAbout) {
    return fetch(this.url + '/users/me', {
      headers: this.headers,
      method: 'PATCH',
      body: JSON.stringify({
        name: userName,
        about: userAbout
      })
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  //обновляем аватар пользователя
  updateAvatarProfile(avatarUrl) {
    return fetch(this.url + '/users/me/avatar', {
      headers: this.headers,
      method: 'PATCH',
      body: JSON.stringify({
        avatar: avatarUrl
      })
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  //добавление или удаление лайка
  renderLikes(cardID, method) {
    return fetch(this.url + '/cards/likes/' + cardID, {
      headers: this.headers,
      method: method
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }
  // другие методы работы с API
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-27',
  headers: {
    authorization: 'c38fc67e-bfd7-4e8c-84be-5445e5cdf811',
    'Content-Type': 'application/json'
  }
});


export default api;