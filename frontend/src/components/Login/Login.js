import { useState } from "react";
import AuthForm from "../AuthForm/AuthForm";
import Header from "../Header/Header";

// компонент авторизации пользователя с необходимыми стейт-переменными.

function Login({ loggedIn, onSubmitForm, handleSubmitLogin }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (!formValue.email || !formValue.password) {
      return;
    }
    handleSubmitLogin({ email, password, setFormValue });
  }

  const { email, password } = formValue;

  return (
    <>
      <Header textLink="Регистрация" loggedIn={loggedIn} link="/sign-up" />
      <AuthForm
        title="Вход"
        textBtn="Войти"
        onSubmitForm={handleSubmit}
        onChangeInput={handleChange}
        formValue={formValue}
      />
    </>
  );
}

export default Login;
