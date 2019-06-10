import React from 'react';
import logo from './logo.svg';

import io from "socket.io-client";
const socket = io("//localhost:4000", {transports: ["websocket"]});

function App() {
  return (
    <div className="App">
     
    </div>
  );
}

export default App;
