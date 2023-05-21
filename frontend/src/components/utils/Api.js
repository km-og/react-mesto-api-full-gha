class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  // проверка статуса ответа сервера

  _checkingStatus(response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(new Error("Что-то пошло не так..."));
    }
  }

  // получить данные с сервера

  getData() {
    return fetch(`${this._url}`, {
      method: "GET",
      headers: this._headers,
    }).then((response) => {
      return this._checkingStatus(response);
    });
  }

  // отправить данные на сервер

  sendData(data, methodType) {
    return fetch(`${this._url}`, {
      method: methodType,
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((response) => {
      console.log(response);
      return this._checkingStatus(response);
    });
  }

  // удалить карточку

  deleteCardBtn(id) {
    return fetch(`${this._url}/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((response) => {
      return this._checkingStatus(response);
    });
  }

  // поставить лайк

  likeCard(id, methodType) {
    return fetch(`${this._url}/${id}/likes`, {
      method: methodType,
      // method: `${isLiked ? "PUT" : "DELETE"}`,
      headers: this._headers,
    }).then((response) => {
      return this._checkingStatus(response);
    });
  }
  // обновить аватар

  changeAvatar(avatar) {
    return fetch(`${this._url}/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(avatar),
    }).then((response) => {
      return this._checkingStatus(response);
    });
  }
}

const configApiAboutUser = {
  url: "https://nomoreparties.co/v1/cohort-58/users/me",
  headers: {
    authorization: "c10b13af-a0c9-404f-bfd6-c1073097221f",
  },
};

const apiUserInfo = new Api(configApiAboutUser);

const configApiCards = {
  url: "https://mesto.nomoreparties.co/v1/cohort-58/cards",
  headers: {
    authorization: "c10b13af-a0c9-404f-bfd6-c1073097221f",
    "Content-Type": "application/json",
  },
};

const apiCards = new Api(configApiCards);

// отправка отредактированных данных профиля на сервер

const configApiNewUserInfo = {
  url: "https://mesto.nomoreparties.co/v1/cohort-58/users/me",
  headers: {
    authorization: "c10b13af-a0c9-404f-bfd6-c1073097221f",
    "Content-Type": "application/json",
  },
};

const apiNewUserInfo = new Api(configApiNewUserInfo);

export { apiUserInfo, apiCards, apiNewUserInfo };
