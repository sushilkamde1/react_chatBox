import { useEffect, useState } from "react";
import { getDatabase, push, ref, set, onChildAdded } from "firebase/database";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [chats, setChats] = useState([]);
  const [msg, setMsg] = useState("");

  const db = getDatabase();
  const chatListRef = ref(db, "posts");

  useEffect(() => {
    onChildAdded(chatListRef, (data) => {
      setChats((chats) => [...chats, data.val()]);
    });
  }, []);

  const sendMsg = () => {
    const newChatRef = push(chatListRef);
    set(newChatRef, {
      name,
      message: msg,
    });
    setMsg("");
  };
  return (
    <div>
      {name ? null : (
        <div className="input_box">
          <input
            type="text"
            className="user_input"
            onBlur={(e) => setName(e.target.value)}
            placeholder="Enter Your Name To Start"
          />
          <img src="https://img.icons8.com/fluency/48/000000/start.png" />
        </div>
      )}
      {name ? (
        <div>
          <h3>User: {name}</h3>
          <div className="msg_container">
            {chats.map((val, i) => (
              <div
                key={i}
                className={`container ${val.name === name ? "me" : ""}`}
              >
                <p className="chatBox">
                  <strong>{val.name}: </strong>
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
