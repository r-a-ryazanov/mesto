export class Api {
  constructor(options) {
    this._options = options;
  }
  //-------Функция загрузки карточек с сервера
  getInitialCards(handleCardGet) {
    fetch(`${this._options.baseUrl}/cards`, {
      headers: this._options.headers
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
        handleCardGet(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //-----------Функция загрузки информации о пользователе с сервера
  getUserInfo(handleUserInfoGet) {
    fetch(`${this._options.baseUrl}/users/me`, {
      headers: this._options.headers
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
        handleUserInfoGet(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //---------------Функция обновления данных пользователя
  updateUserInfo(inputData, handleUserInfoUpdate, renderLoading) {
    renderLoading(true);
    fetch(`${this._options.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        name: inputData.name,
        about: inputData.about
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
        handleUserInfoUpdate(result);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false);
      });
  }
  //--------Функция добавления карточки
  addCard(inputData, handleAddCard, renderLoading) {
    renderLoading(true);
    fetch(`${this._options.baseUrl}/cards`, {
      method: 'POST',
      headers: this._options.headers,
      body: JSON.stringify({
        name: inputData.name,
        link: inputData.link
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
        handleAddCard(result);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false);
      });
  }
  //-----Функция удаления карточки
  deleteCard(cardId, handleDeleteCard) {
    fetch(`${this._options.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._options.headers
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
        handleDeleteCard(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //------Функция добавления лайка карточке
  likeCard(cardId, handleLikeCard) {
    fetch(`${this._options.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._options.headers
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
        handleLikeCard(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //--------Функция удаления лайка карточки
  disLikeCard(cardId, handleDisLikeCard) {
    fetch(`${this._options.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._options.headers
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
        handleDisLikeCard(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //---------Функция обновления аватара пользователя
  updateUserAvatar(inputData, handleUserAvatarUpdate, renderLoading) {
    renderLoading(true);
    fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._options.headers,
      body: JSON.stringify({
        avatar: inputData
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
        handleUserAvatarUpdate(result);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        renderLoading(false);
      });
  }
}