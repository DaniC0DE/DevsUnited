import React, { useEffect } from "react";
import { firestore, auth, loginConGoogle, logout } from "../../firebase.js";
import DevsUnitedLogo from "../../svg/devsunitedLogo.svg";
import GoogleSingIn from "../../svg/googleSingIn.svg";
import "./Welcome.css";

export default function WelcomePage({ user, setUser, setTweets }) {
  return (
    <div className="WelcomeContainer">
      <LeftSide />
      <RightSide user={user} setUser={setUser} setTweets={setTweets} />
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

function RightSide({ user, setUser, setTweets }) {
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
          };
        });
        setTweets(tweets);
      });

    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => desuscribir();
  }, []);

  return (
    <div className="sidecontainer">
      {user !== null ? (
        <div className="right-afterlogin-container">
          <div className="TituloWelcomepage">
            <h1>Welcome</h1>
            <h1 style={{ color: "#F50D5A" }}> {user.displayName}!</h1>
          </div>
          <input
            className="inputwelcomepage"
            type="text"
            placeholder="Type your username"
          />
          <h3 className="SubtituloWelcomepage">Select your favorite color</h3>
          <div className="colorsboxcontainer">
            <button className=" colorbox redbox"></button>
            <button className="colorbox orangebox"></button>
            <button className="colorbox yellowbox"></button>
            <button className="colorbox greenbox"></button>
            <button className="colorbox bluebox"></button>
            <button className="colorbox violetbox"></button>
          </div>
          <button className="btn-continue-welcomepage">Continue</button>
          <br />
          <button onClick={logout}> Log out </button>
          <div className="footerwelcome">
            <h5>© 2020 Devs_United - </h5>
            <h5 style={{ color: "#F50D5A" }}> BETA </h5>
          </div>
        </div>
      ) : (
        <div>
          <div className="textoiniciowelcome">
            <h1 className="TituloWelcomepage">
              LOREM <br /> IPSUM DOLOR
            </h1>
            <h3 className="SubtituloWelcomepage">
              Lorem ipsum dolor sit amet, <br /> consectetur adipiscing elit
            </h3>
          </div>
          <img
            onClick={loginConGoogle}
            src={GoogleSingIn}
            alt="logInwithgoogle"
            className="btn-signin"
          />
          <div className="footerwelcome">
            <h5>© 2020 Devs_United - </h5>
            <h5 style={{ color: "#F50D5A" }}> BETA </h5>
          </div>
        </div>
      )}
    </div>
  );
}
