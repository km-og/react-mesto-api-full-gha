import { useEffect, useState } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import * as auth from "../Auth/Auth";
import Login from "../Login/Login.js";
import { MainAfterLogIn } from "../MainAfterLogIn/MainAfterLogIn.js";
import ProtectedRouteElement from "../ProtectedRoute/ProtectedRoute.js";
import Register from "../Register/Register.js";
import InfoTooltip from "../InfoTooltip/InfoTooltip";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  function changeOnExit() {
    setLoggedIn(false);
  }

  const [userEmail, setUserEmail] = useState(null);

  function handleSubmitForm() {
    setLoggedIn(true);
  }

  const navigate = useNavigate();

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    tokenCheck();
  }, [loggedIn]);

  const [isInfoTooltip, setIsInfoToolTip] = useState(false);

  function openInfoTolltip() {
    setIsInfoToolTip(true);
  }

  function closeInfoTolltip() {
    setIsInfoToolTip(false);
    navigate("/sign-in");
  }

  const [isAccess, setIsAccess] = useState();

  function handleSignUp() {
    setIsAccess(true);
    console.log(isAccess);
  }

  function handleNotSignUp() {
    setIsAccess(false);
    console.log(isAccess);
  }

  function tokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          console.log(res);
          console.log(res.data.email);
          if (res) {
            const userData = res.data.email;
            console.log(userData);
            setUserEmail(userData);

            setLoggedIn(true);
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
    }
  }

  function handleSubmitLogin({ email, password, setFormValue }) {
    auth
      .authorize(email, password)
      .then((data) => {
        console.log(data);
        if (data.token) {
          setFormValue({ email: "", password: "" });
          // onSubmitForm();
          handleSubmitForm();
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  }

  function handleSubmitRegister({ email, password }) {
    auth
      .register(email, password, handleSignUp, handleNotSignUp)
      .then((res) => {
        openInfoTolltip();
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="page">
      <Routes>
        <Route
          path="/sign-up"
          element={
            <Register
              loggedIn={loggedIn}
              handleSubmitRegister={handleSubmitRegister}
            />
          }
        />
        <Route
          path="/sign-in"
          element={
            <Login
              loggedIn={loggedIn}
              onSubmitForm={handleSubmitForm}
              handleSubmitLogin={handleSubmitLogin}
            />
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRouteElement
              element={MainAfterLogIn}
              loggedIn={loggedIn}
              userEmail={userEmail}
              isChangeOnExit={changeOnExit}
              // onSubmitForm={handleSubmitForm}
            />
          }
        />
      </Routes>
      <InfoTooltip
        isOpen={isInfoTooltip}
        onClose={closeInfoTolltip}
        isSuccessful={isAccess}
      />
    </div>
  );
}

export default App;
