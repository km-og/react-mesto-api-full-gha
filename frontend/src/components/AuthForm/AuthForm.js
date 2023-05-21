function AuthForm({
  title,
  textBtn,
  signUp,
  onClick,
  onSubmitForm,
  onChangeInput,
  formValue,
}) {
  console.log(formValue);
  return (
    <section className="auth">
      <h2 className="auth__title">{title}</h2>
      <form className="auth__form" onSubmit={onSubmitForm}>
        <input
          id="userEmail"
          type="email"
          className="auth__input auth__input_type_email"
          name="email"
          placeholder="Email"
          value={formValue.email || ""}
          onChange={onChangeInput}
          required
          minLength="2"
          maxLength="200"
        />
        <input
          id="password-input"
          type="password"
          className="auth__input auth__input_type_password"
          name="password"
          placeholder="Пароль"
          value={formValue.password || ""}
          onChange={onChangeInput}
          required
          minLength="6"
          maxLength="200"
        />
        <button
          type="submit"
          className="auth__button button"
          onClick={onClick}
          onSubmit={onSubmitForm}
        >
          {textBtn}
        </button>
      </form>
      {signUp && (
        <a href="/sign-in" className="auth__link link">
          {signUp}
        </a>
      )}
    </section>
  );
}

export default AuthForm;
