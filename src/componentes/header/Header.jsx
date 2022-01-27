import { loginConGoogle, logout } from "../../firebase";
import "./header.css";
import FlagLogo from "../../svg/flagLogo.svg";
import DevsLogo from "../../svg/wordsLogo.svg";

export default function Header(props) {
  return (
    <div className="headercontainer">
      {props.user ? (
        <div className="header-central-container">
          <div className="userProfile">
            <img
              className="userProfilePic"
              src={props.user.photoURL}
              alt="photoUser"
            />
          </div>
          <div className="logo-header">
            <img className="logoflagheader" src={FlagLogo} alt="logoflag" />
          </div>
          <div className="logo-header">
            <img className="logoDevsheader" src={DevsLogo} alt="logodevs" />
          </div>
        </div>
      ) : null}
    </div>
  );
}
