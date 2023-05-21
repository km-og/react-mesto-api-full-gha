const baseUrl = "https://auth.nomoreparties.co";

function checkingStatusReg(res, handleSignUp, handleNotSignUp) {
  if (res.ok) {
    handleSignUp();
    return res.json();
  } else {
    handleNotSignUp();
    return Promise.reject(new Error("Что-то пошло не так..."));
  }
}

function checkingStatus(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(new Error("Что-то пошло не так..."));
  }
}

const register = (email, password, handleSignUp, handleNotSignUp) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      // try {
      //   if (response.status === 200 || response.status === 201) {
      //     handleSignUp();
      //     return response.json();
      //   } else if (response.status === 400) {
      //     handleNotSignUp();
      //     console.log("некорректно заполнено одно из полей ");
      //   }
      // } catch (e) {
      //   return e;
      // }
      checkingStatusReg(res, handleSignUp, handleNotSignUp);
    })
    .then((res) => {
      console.log(res);
      return res;
    });
};

// email1111111111@yandex.ru
// somepassword

const authorize = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      // try {
      //   if (response.status === 200 || response.status === 201) {
      //     return response.json();
      //   } else if (response.status === 400) {
      //     console.log("не передано одно из полей");
      //   } else if (response.status === 401) {
      //     console.log("пользователь с email не найден ");
      //   }
      // } catch (e) {
      //   return e;
      // }
      return checkingStatus(res);
    })
    .then((res) => {
      if (res.token) {
        localStorage.setItem("token", res.token);
        return res;
      }
    });
};

const getContent = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    // if (response.status === 200 || response.status === 201) {
    //   return response.json();
    // } else if (response.status === 400) {
    //   console.log("Токен не передан или передан не в том формате");
    // } else if (response.status === 401) {
    //   console.log("Переданный токен некорректен");
    // }
    return checkingStatus(res);
  });
};

export { baseUrl, register, authorize, getContent };
