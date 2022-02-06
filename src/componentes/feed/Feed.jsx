import React, { useEffect } from "react";
import { firestore, auth } from "../../firebase.js";
import "./feed.css";
import WhiteHeart from "../../svg/whiteHeart.svg";
import Trash from "../../svg/deleteTrash.svg";
import DefaultUserPic from "../../svg/profilePicDefault.svg";

export default function Feed(props) {
  // const dateUnits = {
  //   day: 86400,
  //   hour: 3600,
  //   minute: 60,
  //   second: 1,
  // };

  // const getSecondsDiff = (timestamp) => (Date.now() - timestamp) / 1000;

  // const getUnitAndValueDate = (secondElapse) => {
  //   const entries = Object.entries(dateUnits);

  //   for (const [unit, secondsInUnit] of entries) {
  //     const match = secondElapse >= secondsInUnit || unit === "second";
  //     if (match) {
  //       const value = Math.floor(secondElapse / secondsInUnit) * -1;
  //       return { value, unit };
  //     }
  //   }
  // };

  // const timeAgo = (timestamp, locale) => {
  //   const rtf = new Intl.RelativeTimeFormat(locale);
  //   const secondsElapsed = getSecondsDiff(timestamp);
  //   const { value, unit } = getUnitAndValueDate(secondsElapsed);
  //   return rtf.format(value, unit);
  // };

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
            date: doc.data().date,
            unixDate: doc.data().unixDate,
            username: doc.data().username,
            color: doc.data().color,
          };
        });
        let tweetsOrdered = tweets.sort((a, b) => {
          return b.unixDate - a.unixDate;
        });
        props.setTweets(tweets);
        console.log(tweets);
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
    <div className="feed-container">
      {props.tweets.length > 0 &&
        props.tweets.map((tweet) => {
          return (
            <div className="tweetcontainer" key={tweet.id}>
              <div className="userpic-tweet-like-container">
                <div className="pic-tweet-div">
                  {props.user ? (
                    <img
                      className="userPic-tweet"
                      src={props.user.photoURL}
                      alt="userPic"
                    />
                  ) : (
                    <img
                      className="userPic-tweet"
                      src={DefaultUserPic}
                      alt="userPic"
                    />
                  )}
                </div>
                <div className="tweet-data-likes">
                  <div className="usernametitle-date-container">
                    <span id={tweet.color ? tweet.color : "white"}>
                      {tweet.username ? tweet.username : tweet.autor}
                    </span>
                    <div> - {tweet.date}. </div>
                  </div>
                  <div className="tweet-parrafo">{tweet.tweet}</div>
                  <span
                    onClick={() => handleLikes(tweet.id, tweet.likes)}
                    className="likes-container"
                  >
                    <img height="14px" src={WhiteHeart} alt="heartLikes" />
                    <span>{tweet.likes ? tweet.likes : 0}</span>
                  </span>
                </div>
              </div>
              {tweet.uid === availableToDeleted ? (
                <span onClick={() => deleteTweet(tweet.id)} className="delete">
                  <img className="delete-svg" src={Trash} alt="" />
                </span>
              ) : null}
            </div>
          );
        })}
    </div>
  );
}
