import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../AuthForm/AuthForm";
import Header from "../Header/Header";

function Register({ loggedIn, onClick, handleSubmitRegister }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    handleSubmitRegister({
      email,
      password,
      // handleSignUp,
      // handleNotSignUp,
      // isAccess
    });
  }

  const { email, password } = formValue;

  return (
    <>
      <Header textLink="Войти" loggedIn={loggedIn} link="/sign-in" />
      <AuthForm
        title="Регистрация"
        textBtn="Зарегистрироваться"
        signUp={"Уже зарегистрированы? Войти"}
        onClick={onClick}
        onSubmitForm={handleSubmit}
        onChangeInput={handleChange}
        formValue={formValue}
      />
    </>
  );
}

export default Register;
