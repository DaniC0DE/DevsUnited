import { loginConGoogle } from "../../firebase";
import DevsUnitedLogo from "../../svg/devsunitedLogo.svg";
import GoogleSingIn from "../../svg/googleSingIn.svg";

export default function WelcomePage() {
  return (
    <div>
      <LeftSide />
      <RightSide />
    </div>
  );
}

function LeftSide() {
  return (
    <div>
      <img src={DevsUnitedLogo} alt="devsunitedLogo" />
    </div>
  );
}

function RightSide(props) {
  return (
    <div>
      {props.user ? (
        <div>
          <h1> Welcome {props.user.displayName}!</h1>
          <input type="text" placeholder="Type your username" />
          <h3>Select your favorite color</h3>
          <div>
            <div>red</div>
            <div>orange</div>
            <div>yellow</div>
            <div>green</div>
            <div>blue</div>
            <div>violet</div>
          </div>
          <button>Continue</button>
          <h5>© 2020 Devs_United - BETA</h5>
        </div>
      ) : (
        <div>
          <h1>Titulo</h1>
          <h3>subtitulo</h3>
          <img
            onClick={loginConGoogle}
            src={GoogleSingIn}
            alt="logInwithgoogle"
          />
          <h5>© 2020 Devs_United - BETA</h5>
        </div>
      )}
    </div>
  );
}
