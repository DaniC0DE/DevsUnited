import { loginConGoogle, logout } from "../../firebase";
import "./header.css";

export default function Header(props) {
  return (
    <div>
      {props.user ? (
        <div>
          <div className="userProfile">
            <img
              className="userProfilePic"
              src={props.user.photoURL}
              alt="photoUser"
            />
            <p>Hola {props.user.displayName}</p>
            <button onClick={logout}>Log out</button>
          </div>
        </div>
      ) : (
        <button className="login-btn" onClick={loginConGoogle}>
          Login with Google
        </button>
      )}
    </div>
  );
}
