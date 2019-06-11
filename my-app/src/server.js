const express = require('express')
const app = express()
let config = require('./config.json');
var http = require('http').Server(app);

var io = require('socket.io')(4000);

const port = config.PORT
var fs = require('fs');
let rooms = require('./rooms.json')
let users = require('./users.json')
let msgs = require('./msg.json')
app.use(express.json())

app.get('/chatt',(req,res)=>{
    console.log(req.query)
    res.send("hello");
})

// Creat user
app.post('/newuser',(req,res)=>{
    let obj = req.body
    let arr = users.names
    console.log(Object.keys(obj).length)
    if(Object.keys(obj).length > 1){
        res.status(400).send("fel data").end()
        return
    }
    if(Object.keys(obj)[0] !== "name"){
        res.status(400).send("the key must be name").end()
        console.log("not name")
        console.log(res.statusCode)
        return
    }
    //check if the user exist
    function exist(n) {
        return n.name === req.body.name
    }
    console.log(users.names.find(exist))
    if(users.names.find(exist)){
        res.status(400);
        res.send("user exsist")
        res.end()
        console.log(res.statusCode)
        return 
    }
    arr.push(obj)
    console.log(arr)
    let test = {
        "names":arr
    }
    let data = JSON.stringify(test)
    fs.writeFile('./users.json',data,(err) => {
        if (err) throw err;
        console.log('The user is created!');
      })
    res.status(201).send("Created").end()
    console.log(res.statusCode)
})
//creat room
app.post('/newroom',(req,res)=>{
    let obj = req.body
    let arr = rooms.roomname
    console.log(Object.keys(obj).length)
    if(Object.keys(obj).length > 1){
        res.status(400).send("fel data").end()
        return
    }
    if(Object.keys(obj)[0] !== "room"){
        res.status(400).send("the key must be room").end()
        console.log("not room")
        console.log(res.statusCode)
        return
    }
    //check if the room exist
    function exist(n) {
        return n.room === req.body.room
    }
    console.log(rooms.roomname.find(exist))
    if(rooms.roomname.find(exist)){
        res.status(400);
        res.send("user exsist")
        res.end()
        console.log(res.statusCode)
        return 
    }
    arr.push(obj)
    console.log(arr)
    let test = {
        "roomname":arr
    }
    let data = JSON.stringify(test)
    fs.writeFile('./rooms.json',data,(err) => {
        if (err) throw err;
        console.log('The room is created!');
      })
    res.status(201).send("Created").end()
    console.log(res.statusCode)
})
app.post('')
app.post('/newrum')
//send msg
io.on('connection',(socket)=>{
    console.log("conected")
    socket.on("msg",(data)=>{
        console.log("new msg has resived")
        console.log(data)
        if(Object.keys(data).length>3 || Object.keys(data)[0] !== "name" || Object.keys(data)[1] !== "roomname" || Object.keys(data)[2] !== "message"){
            io.emit("error","You have sent wrong data format to the server");
            return
        }
        io.emit("sendToClient",data)
        let arr = msgs.messages
        arr.push(data);
        let tosave = {"messages":arr}
        console.log(tosave)
        fs.writeFile('./msg.json',JSON.stringify(tosave),(err) => {
            if (err) throw err;
            console.log('The room is created!');
        })
    })
    
})

//send msg
app.post('/chatt',(req,res)=>{
    console.log(req.body);
    let body = req.body;

    res.end()
})

app.listen(port, () => console.log(`Server runningg on port ${port}!`))
app.listen(() => {
    console.log("Socket listening on 4000");
  })