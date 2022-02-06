import React, { useEffect, useState } from "react";
import { firestore, loginConGoogle, auth, logout } from "./firebase.js";
import WelcomePage from "./componentes/welcomepage/WelcomePage";
import Header from "./componentes/header/Header";
import Textarea from "./componentes/textarea/Textarea";
import Feed from "./componentes/feed/Feed";
import Profile from "./componentes/profile/Profile";
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
  const [username, setUsername] = useState("");
  const [color, setColor] = useState("");

  return (
    <div className="App">
      <WelcomePage
        user={user}
        setUser={setUser}
        tweet={tweet}
        tweets={tweets}
        setTweets={setTweets}
        username={username}
        setUsername={setUsername}
        color={color}
        setColor={setColor}
      />
      <Header user={user} color={color} />
      <Textarea
        user={user}
        tweet={tweet}
        setTweet={setTweet}
        tweets={tweets}
        username={username}
        color={color}
      />
      <Feed
        user={user}
        setUser={setUser}
        setTweets={setTweets}
        tweets={tweets}
        tweet={tweet}
        username={username}
        color={color}
      />
      <Profile
        user={user}
        setUser={setUser}
        setTweets={setTweets}
        tweets={tweets}
        tweet={tweet}
        post={post}
        setPost={setPost}
        username={username}
        color={color}
      />
    </div>
  );
}
