import { firestore } from "../../firebase";
import "./textarea.css";

export default function Textarea(props) {
  const handleChange = (e) => {
    let newTweet = {
      tweet: e.target.value,
      uid: props.user.uid,
      email: props.user.email,
      autor: props.user.displayName,
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
    };
    firestore.collection("tweets").add(newTweet);
  };

  return (
    <div>
      <form>
        <div className="inputtweet">
          <textarea
            name="tweet"
            onChange={handleChange}
            value={props.tweet.tweet}
            cols="30"
            rows="10"
            placeholder="escriba su tweet aqui..."
          ></textarea>
        </div>
        <div className="inputautor">
          <button onClick={sendTweet}>enviar tweet</button>
        </div>
      </form>
    </div>
  );
}
