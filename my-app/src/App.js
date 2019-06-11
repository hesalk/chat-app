import React from 'react';
import io from "socket.io-client";

const axios = require('axios');
const socket = io("//localhost:4000", {transports: ["websocket"]});

let obj = {namse:"saatwsw"}
let lol ='{"name":"ffrr"}'; 
let test = JSON.stringify(obj)

axios.get("http://localhost:8000/newuser")
.then((res)=>{
  console.log(res)
});

axios.post("http://localhost:8000/newuser",obj)
.then((res)=>{
  console.log(res)
});

function App() {
  return (
    <div className="App">
     
    </div>
  );
}

export default App;
