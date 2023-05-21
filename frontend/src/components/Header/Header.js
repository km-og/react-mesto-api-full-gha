import { useNavigate } from "react-router-dom";
import logo from "../../images/header-logo.svg";

function Header({ textLink, loggedIn, email, link, isChangeOnExit }) {
  // const history = useHistory();
  const navigate = useNavigate();

  function signOut() {
    localStorage.removeItem("token");
    navigate("/sign-in");
    isChangeOnExit();
  }

  console.log(loggedIn);

  return (
    <header className="header">
      <img src={logo} alt="логотип" className="header__logo" />
      {loggedIn ? (
        <div className="header__box">
          <p className="header__email">{email}</p>
          <a
            // href={link}
            className="link"
            onClick={signOut}
          >
            {textLink}
          </a>
        </div>
      ) : (
        <a href={link} className="link">
          {textLink}
        </a>
      )}
    </header>
  );
}

export default Header;
