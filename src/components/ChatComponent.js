import React, { useState, useEffect } from 'react';

import { getDatabase, ref, onValue, push, set } from "firebase/database";

import "../chat.css";
import Cookies from 'js-cookie';

function ChatComponent() {

   
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
      const db = getDatabase();
      const messageRef = ref(db, "messages");
      onValue(messageRef, (snapshot) => {
        const messages = snapshot.val();
        const messageList = [];
        for (let id in messages) {
          messageList.push({ id, ...messages[id] });
        }
        setMessages(messageList);
      });
    }, []);
  
    const handleSubmit = (e) => {
      let name = Cookies.get('usertype') ==='user'?"user":"shelter"
      e.preventDefault();
      const db = getDatabase();
      const messageRef = push(ref(db, "messages"));
      set(messageRef, { name, message });
      setMessage("");
    };

  return (
    <div>

      <div class="card text-center container mt-3 p-1 mb-3" style={{width:"900px"}}>
        <div class="card-header bg-info">
          Chat
          <button
       style={{marginLeft:"150px"}}
        type="button"
        class="btn btn-success"
        data-toggle="modal"
        data-target="#exampleModal"
        data-whatever="@getbootstrap"
      >
        Send Message
      </button>
        </div>
        <div class="card-body">
        <ul className="message-list">
        {messages.map((message, index) => (
          <li
            key={message.id}
            className={index % 2 === 0 ? "left" : "right"}
          >

            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <h2 style={{fontSize:"16px"}}>{message.name} : </h2>&nbsp;&nbsp;&nbsp;
                <h2 class="breadcrumb-item active"  style={{fontSize:"14px"}}> {message.message}</h2>
              </ol>
            </nav>
          </li>
        ))}
      </ul>
        </div>
        <div class="card-footer bg-info">
          Connecting Shelter and Users
        </div>
      </div>



    <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Chats
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>

                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                   Message
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={message} onChange={e => setMessage(e.target.value)}
                    required
                  />
                </div>
              
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button className="btn btn-outline-success my-2 my-sm-0 ml-3" data-dismiss="modal" onClick={handleSubmit} >Send</button>
         
            </div>
          </div>
        </div>
      </div>
   
  </div>
  )
}

export default ChatComponent