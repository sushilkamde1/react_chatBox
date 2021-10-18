import { useEffect, useState } from "react";
import { getDatabase, push, ref, set, onChildAdded } from "firebase/database";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import "./App.css";

function App() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const googleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setUser({
          name: result.user.displayName,
          email: result.user.email,
          UserImg: result.user.photoURL,
        });
        console.log(token, user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const [User, setUser] = useState([]);
  console.log("user", User);
  const [chats, setChats] = useState([]);
  const [msg, setMsg] = useState("");

  const db = getDatabase();
  const chatListRef = ref(db, "posts");

  const updateHeight = () => {
    const msg = document.getElementById("msg");
    if (msg) {
      msg.scrollTop = msg.scrollHeight;
    }
  };
  useEffect(() => {
    onChildAdded(chatListRef, (data) => {
      setChats((chats) => [...chats, data.val()]);
      setTimeout(() => {
        updateHeight();
      }, 100);
      return () => {
        console.log("cleaned up");
      };
    });
  }, []);

  const sendMsg = () => {
    const newChatRef = push(chatListRef);
    set(newChatRef, {
      User,
      message: msg,
    });
    setMsg("");
  };
  return (
    <div>
      {User.email ? null : (
        <div id="main">
          <h2 id="heading">React Chat Application</h2>
          <div className="input_box">
            <button className="login" onClick={() => googleLogin()}>
              Google SignIn
            </button>
          </div>
        </div>
      )}
      {User.email ? (
        <div>
          <div className="user_container">
            <span>
              <img id="userImg" src={User.UserImg} alt="user" />
            </span>
            <span id="userName"> {User.name}</span>
          </div>
          <div id="msg" className="msg_container">
            {chats.map((val, i) => (
              <div
                key={i}
                className={`container ${
                  val.User.name === User.name ? "me" : ""
                }`}
              >
                <p className="chatBox">
                  <strong>{val.User.name}: </strong>
                  <span>{val.message}</span>
                </p>
              </div>
            ))}
          </div>
          <div className="btn">
            <input
              type="text"
              onInput={(e) => setMsg(e.target.value)}
              placeholder="Type a message"
              value={msg}
            />
            <button onClick={() => sendMsg()}>send</button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
export default App;
