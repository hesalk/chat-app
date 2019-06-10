const express = require('express')
const app = express()
let config = require('./config.json');
var http = require('http').Server(app);

var io = require('socket.io')(http);

const port = config.PORT
var fs = require('fs');
let users = require('./users.json')
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("hello");
    
})

app.post('/newuser',(req,res)=>{
    let obj = req.body
    let arr = users.names
    function exist(n) {
        return n.name === req.body.name
    }
    console.log(users.names.find(exist))
    if(users.names.find(exist)){
        res.send("User already exist")
        res.status(400).end();
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
        console.log('The file has been saved!');
      })
    res.status(201).end();
    console.log(res.statusCode)
})

app.post('/newrum')

app.listen(port, () => console.log(`Example app listening on port ${port}!`))