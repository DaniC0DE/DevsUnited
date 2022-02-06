import React, { useEffect } from "react";
import { firestore, auth, loginConGoogle, logout } from "../../firebase.js";
import DevsUnitedLogo from "../../svg/devsunitedLogo.svg";
import GoogleSingIn from "../../svg/googleSingIn.svg";
import "./Welcome.css";

export default function WelcomePage({
  user,
  setUser,
  setTweets,
  username,
  setUsername,
  setColor,
  color,
}) {
  return (
    <div className="WelcomeContainer">
      <LeftSide />
      <RightSide
        user={user}
        setUser={setUser}
        setTweets={setTweets}
        username={username}
        setUsername={setUsername}
        color={color}
        setColor={setColor}
      />
    </div>
  );
}

function LeftSide() {
  return (
    <div className="sidecontainer">
      <img
        className="LogoFlagprincipal"
        src={DevsUnitedLogo}
        alt="devsunitedLogo"
      />
    </div>
  );
}

function RightSide({
  user,
  setUser,
  setTweets,
  username,
  setUsername,
  setColor,
  color,
}) {
  useEffect(() => {
    const desuscribir = firestore
      .collection("tweets")
      .onSnapshot((snapshot) => {
        const tweets = snapshot.docs.map((doc) => {
          return {
            tweet: doc.data().tweet,
            autor: doc.data().autor,
            id: doc.id,
            likes: doc.data().likes,
            email: doc.data().email,
            uid: doc.data().uid,
            username: doc.data().username,
            color: doc.data().color,
          };
        });
        setTweets(tweets);
      });

    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => desuscribir();
  }, []);

  const usernameHandler = (e) => {
    const usernameSelected = e.target.value;
    setUsername(usernameSelected);
  };

  const redHandler = (e) => {
    setColor(e.target.id);
  };

  const orangeHandler = (e) => {
    setColor(e.target.id);
  };
  const yellowHandler = (e) => {
    setColor(e.target.id);
  };
  const greenHandler = (e) => {
    setColor(e.target.id);
  };
  const blueHandler = (e) => {
    setColor(e.target.id);
  };
  const violetHandler = (e) => {
    setColor(e.target.id);
  };

  return (
    <div className="sidecontainer">
      {user !== null ? (
        <div className="right-afterlogin-container">
          <div className="TituloWelcomepage2">
            <h1>Welcome</h1>
            <h1 style={{ color: "#F50D5A" }}> {user.displayName}!</h1>
          </div>
          <input
            className="inputwelcomepage"
            type="text"
            placeholder="Type your username"
            onChange={usernameHandler}
          />
          <h3 className="SubtituloWelcomepage">Select your favorite color</h3>
          <div className="colorsboxcontainer">
            <button
              id="redbox"
              className="colorbox"
              onClick={redHandler}
            ></button>
            <button
              id="orangebox"
              className="colorbox"
              onClick={orangeHandler}
            ></button>
            <button
              id="yellowbox"
              className="colorbox"
              onClick={yellowHandler}
            ></button>
            <button
              id="greenbox"
              className="colorbox"
              onClick={greenHandler}
            ></button>
            <button
              id="bluebox"
              className="colorbox"
              onClick={blueHandler}
            ></button>
            <button
              id="violetbox"
              className="colorbox"
              onClick={violetHandler}
            ></button>
          </div>
          <button className="btn-continue-welcomepage">Continue</button>
          <br />
          <button onClick={logout}> Log out </button>
          <div className="footerwelcome">
            <div>
              <h5>© 2020 Devs_United - </h5>
              <h5 style={{ color: "#F50D5A" }}> BETA </h5>
            </div>
            <h5>by Daniel Alvarado </h5>
          </div>
        </div>
      ) : (
        <div>
          <div className="textoiniciowelcome">
            <h1 className="TituloWelcomepage">LET'S GO !!!</h1>
            <h3 className="SubtituloWelcomepage">
              Keep in touch with other Devs! <br /> <br />
              JOIN to DevsUnited
            </h3>
          </div>
          <img
            onClick={loginConGoogle}
            src={GoogleSingIn}
            alt="logInwithgoogle"
            className="btn-signin"
          />
          <div className="footerwelcome">
            <div>
              <h5>© 2020 Devs_United - </h5>
              <h5 style={{ color: "#F50D5A" }}> BETA </h5>
            </div>
            <h5>by Daniel Alvarado </h5>
          </div>
        </div>
      )}
    </div>
  );
}
