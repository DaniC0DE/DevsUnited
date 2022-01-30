import { firestore } from "../../firebase";
import "./textarea.css";
import ImgPost from "../../svg/PostButtonOff.svg";

export default function Textarea(props) {
  let dateNow = new Date();
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let dateDay = dateNow.getUTCDate();
  let dateMonth = month[dateNow.getMonth()];

  const handleChange = (e) => {
    let newTweet = {
      tweet: e.target.value,
      uid: props.user.uid,
      email: props.user.email,
      autor: props.user.displayName,
      date: dateDay + " " + dateMonth,
    };
    props.setTweet(newTweet);
  };

  const sendTweet = (e) => {
    e.preventDefault();
    let newTweet = {
      tweet: props.tweet.tweet,
      autor: props.user.displayName,
      email: props.user.email,
      likes: 0,
      uid: props.user.uid,
      date: props.tweet.date,
    };
    firestore.collection("tweets").add(newTweet);
    // setTweet({ tweet: "", autor: "", uid: "", email: "", date: "" });
  };

  return (
    <div className="textareacontainer">
      {props.user !== null ? (
        <div>
          <div className="img-text-container">
            <img
              className="textareaImage"
              src={props.user.photoURL}
              alt="textareaImage"
            />
            <textarea
              className="inputtweet"
              name="tweet"
              onChange={handleChange}
              value={props.tweet.tweet}
              cols="30"
              rows="10"
              maxLength="200"
              placeholder="What’s happening?"
            ></textarea>
          </div>
          <div className="counter-textarea-container">
            <span className="counter-left">0</span>
            <span className="counter-right"> 200 max.</span>
          </div>
          <div className="btn-post-textarea-container">
            <img
              src={ImgPost}
              alt="sendbutton"
              className="inputautor"
              onClick={sendTweet}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
