import React from 'react';
import io from "socket.io-client";

const axios = require('axios');
const socket = io("//localhost:4000", {transports: ["websocket"]});

let obj = {namse:"saatwsw"}
let obj2 = {namse:"saatwsw",room:"ssss"}
console.log(JSON.stringify(obj2))

let lol ='{"name":"ffrr"}'; 
let test = JSON.stringify(obj)

axios.get("http://localhost:8000/allusers")
.then((res)=>{
  console.log(res)
});
axios.get("http://localhost:8000/roomusers?room=states.user")
.then((res)=>{
  console.log(res)
});
axios.post("http://localhost:8000/newuser",obj)
.then((res)=>{
  console.log(res)
});
axios.post("http://localhost:8000/chatt",obj2)

function App() {
  return (
    <div className="App">
     
    </div>
  );
}
socket.emit("msg",{
  name: "sa",
  room: "states.user",
  message: "t.msg.value",
})
socket.on("sendToClient",(data)=>{
  console.log(data)
})
socket.on("error",(data)=>{
  console.error(data)
})

export default App;
