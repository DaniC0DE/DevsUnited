import React, { useEffect, useState } from "react";
import { firestore, loginConGoogle, auth, logout } from "./firebase.js";
import WelcomePage from "./componentes/welcomepage/WelcomePage";
import Header from "./componentes/header/Header";
import Textarea from "./componentes/textarea/Textarea";
import Feed from "./componentes/feed/Feed";
import Profile from "./componentes/profile/Profile";
import Heart from "./svg/heart.svg";
import "./App.css";

export default function App() {
  const [tweets, setTweets] = useState([]);
  const [tweet, setTweet] = useState({
    tweet: "",
    autor: "",
    uid: "",
    email: "",
    date: "",
  });
  const [user, setUser] = useState(null);
  const [post, setPost] = useState(true);

  return (
    <div className="App">
      {/* <WelcomePage
        user={user}
        setUser={setUser}
        tweet={tweet}
        tweets={tweets}
        setTweets={setTweets}
      /> */}
      <Header user={user} />
      <Textarea user={user} tweet={tweet} setTweet={setTweet} tweets={tweets} />
      <Feed
        user={user}
        setUser={setUser}
        setTweets={setTweets}
        tweets={tweets}
        tweet={tweet}
      />
      {/* <Profile
        user={user}
        setUser={setUser}
        setTweets={setTweets}
        tweets={tweets}
        tweet={tweet}
        post={post}
        setPost={setPost}
      /> */}
    </div>
  );
}
