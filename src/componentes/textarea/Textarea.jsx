import { firestore } from "../../firebase";
import "./textarea.css";

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
  // let unixDate = Date.now()

  const handleChange = (e) => {
    let newTweet = {
      tweet: e.target.value,
      uid: props.user.uid,
      email: props.user.email,
      autor: props.user.displayName,
      date: dateDay + " " + dateMonth,
      unixDate: Date.now(),
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
      unixDate: props.tweet.unixDate,
    };
    firestore.collection("tweets").add(newTweet);
    props.setTweet({ ...props.tweet, tweet: "" });
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
            <span className="counter-left">{props.tweet.tweet.length}</span>
            <span className="counter-right"> 200 max.</span>
          </div>
          <div className="btn-post-textarea-container">
            <div className="inputautor" onClick={sendTweet}>
              POST
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
