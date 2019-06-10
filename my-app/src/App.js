import React from 'react';
import io from "socket.io-client";

const axios = require('axios');
const socket = io("//localhost:4000", {transports: ["websocket"]});

axios.get("http://localhost:8000/newuser")

function App() {
  return (
    <div className="App">
     
    </div>
  );
}

export default App;
