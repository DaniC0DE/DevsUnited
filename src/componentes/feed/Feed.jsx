import React, { useEffect } from "react";
import { firestore, auth } from "../../firebase.js";
import "./feed.css";
import Heart from "../../svg/heart.svg";

export default function Feed(props) {
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
        props.setTweets(tweets);
      });

    auth.onAuthStateChanged((user) => {
      props.setUser(user);
    });
    return () => desuscribir();
  }, []);
  console.log(props.user);

  const deleteTweet = (id) => {
    firestore.doc(`tweets/${id}`).delete();
  };

  let availableToDeleted;
  if (props.user === null) {
    availableToDeleted = 0;
  } else {
    availableToDeleted = props.user.uid;
  }

  const handleLikes = (id, likes) => {
    if (!likes) likes = 0;
    firestore.doc(`tweets/${id}`).update({ likes: likes + 1 });
  };

  return (
    <div>
      {props.tweets.map((tweet) => {
        return (
          <div className="tweetcontainer" key={tweet.id}>
            <div className="tweet-info">
              <p>{tweet.tweet}</p>
              <p className="tweet-autor">por:{tweet.autor} </p>
              <p className="tweet-email">{tweet.email}</p>
            </div>
            {tweet.uid === availableToDeleted ? (
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
  );
}
