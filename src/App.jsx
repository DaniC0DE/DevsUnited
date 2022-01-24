import React, { useEffect, useState } from "react";
import { firestore, loginConGoogle, auth, logout } from "./firebase.js";
import Heart from "./svg/heart.svg";
import "./App.css";

export default function App() {
  const [tweets, setTweets] = useState([]);
  const [tweet, setTweet] = useState({
    tweet: "",
    autor: "",
    uid: "",
    email: "",
  });
  const [user, setUser] = useState(null);

  const handleChange = (e) => {
    let newTweet = {
      tweet: e.target.value,
      uid: user.uid,
      email: user.email,
      autor: user.displayName,
      // ...tweet,
      // [e.target.name]: e.target.value
    };
    setTweet(newTweet);
  };

  const sendTweet = (e) => {
    e.preventDefault();
    let newTweet = {
      tweet: tweet.tweet,
      autor: user.displayName,
      email: user.email,
      likes: 0,
      uid: user.uid,
    };
    firestore.collection("tweets").add(newTweet);
  };

  const deleteTweet = (id) => {
    // const newTweets = tweets.filter((tweet) => {
    //   return tweet.id !== id;
    // });
    // setTweets(newTweets);
    firestore.doc(`tweets/${id}`).delete();
  };

  // let availableToDeleted;
  // if (user === null) {
  //   availableToDeleted === 0;
  // } else {
  //   availableToDeleted === tweet.uid;
  // }

  const handleLikes = (id, likes) => {
    if (!likes) likes = 0;
    firestore.doc(`tweets/${id}`).update({ likes: likes + 1 });
  };

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
      console.log(user);

      setUser(user);
    });
    return () => desuscribir();
  }, []);

  return (
    <div className="App">
      {user ? (
        <div>
          <div className="userProfile">
            <img
              className="userProfilePic"
              src={user.photoURL}
              alt="photoUser"
            />
            <p>Hola {user.displayName}</p>
            <button onClick={logout}>Log out</button>
          </div>
        </div>
      ) : (
        <button className="login-btn" onClick={loginConGoogle}>
          Login with Google
        </button>
      )}
      <form>
        <div className="inputtweet">
          <textarea
            name="tweet"
            onChange={handleChange}
            value={tweet.tweet}
            cols="30"
            rows="10"
            placeholder="escriba su tweet aqui..."
          ></textarea>
        </div>
        <div className="inputautor">
          <button onClick={sendTweet}>enviar tweet</button>
        </div>
      </form>
      <h1>Tweets:</h1>
      <div>
        {tweets.map((tweet) => {
          return (
            <div className="tweetcontainer" key={tweet.id}>
              <div className="tweet-info">
                <p>{tweet.tweet}</p>
                <p className="tweet-autor">por:{tweet.autor} </p>
                <p className="tweet-email">{tweet.email}</p>
              </div>
              {tweet.uid === user.uid ? (
                <span onClick={() => deleteTweet(tweet.id)} className="delete">
                  Borrar
                </span>
              ) : null}

              <span
                onClick={() => handleLikes(tweet.id, tweet.likes)}
                className="likes"
              >
                <img height="14px" src={Heart} alt="heartLikes" />
                <span>{tweet.likes ? tweet.likes : 0}</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
