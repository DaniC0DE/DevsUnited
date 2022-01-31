import React, { useEffect } from "react";
import { firestore, auth, logout } from "../../firebase.js";
import "./profile.css";
import WhiteHeart from "../../svg/whiteHeart.svg";
import Trash from "../../svg/deleteTrash.svg";
import Back from "../../svg/back.svg";
import Logout from "../../svg/logout.svg";

export default function Profile(props) {
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
          };
        });
        let tweetsOrdered = tweets.sort((a, b) => {
          return b.unixDate - a.unixDate;
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
      <div className="headercontainer-profile">
        {props.user !== null ? (
          <div className="header-central-container">
            <div className="usernamebackcontainer">
              <div>
                <img className="backsvg-profile" src={Back} alt="back" />
              </div>
              <div className="usernameToBack">{props.user.displayName}</div>
            </div>

            <div className="logout-svg-div">
              <img
                className="logout-svg"
                onClick={logout}
                src={Logout}
                alt="logout"
              />
            </div>
          </div>
        ) : null}
      </div>
      <div className="pic-username-container-profile">
        {props.user !== null ? (
          <div>
            <div className="picANDusernamelabel-container">
              <img
                className="user-pic-profile"
                src={props.user.photoURL}
                alt="profilePic"
              />

              <div className="username-profile">{props.user.displayName}</div>
            </div>
            <div className="post-favotires-container">
              <div className="post-label-profile"> POST </div>
              <div className="favorites-label-profile"> FAVORITES </div>
            </div>
          </div>
        ) : null}
      </div>
      <div className="feed-post-fav-container-profile">
        {props.post
          ? props.tweets
              .filter((tweet) => {
                return tweet.uid === props.user.uid;
              })
              .map((tweet) => {
                return (
                  <div className="tweetcontainer" key={tweet.id}>
                    <div className="userpic-tweet-like-container">
                      <div className="pic-tweet-div">
                        <img
                          className="userPic-tweet"
                          src={props.user.photoURL}
                          alt="userPic"
                        />
                      </div>
                      <div className="tweet-data-likes">
                        <div className="usernametitle-date-container">
                          <span> {props.user.displayName} </span>
                          <div> - {tweet.date}. </div>
                        </div>
                        <div className="tweet-parrafo">{tweet.tweet}</div>
                        <span
                          onClick={() => handleLikes(tweet.id, tweet.likes)}
                          className="likes-container"
                        >
                          <img
                            height="14px"
                            src={WhiteHeart}
                            alt="heartLikes"
                          />
                          <span>{tweet.likes ? tweet.likes : 0}</span>
                        </span>
                      </div>
                    </div>
                    {tweet.uid === availableToDeleted ? (
                      <span
                        onClick={() => deleteTweet(tweet.id)}
                        className="delete"
                      >
                        <img className="delete-svg" src={Trash} alt="" />
                      </span>
                    ) : null}
                  </div>
                );
              })
          : null}
      </div>
    </div>
  );
}
