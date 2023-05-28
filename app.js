const express = require("express");
const app = express();
const http = require("http").createServer(app);
const cors = require("cors");
const port = 8000;
const hostname = "127.0.0.1"

app.use(cors());

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

http.listen(port,hostname, () => {
    console.log(`the app is runing at port http://localhost:${port}`);
});

const io = require("socket.io")(http);

const user = {};
io.on("connection", socket => {
    console.log("ompawar")
    socket.on("new-user-joined", name => {
      console.log('newuser' , name)
      user[socket.id] = name;
      socket.broadcast.emit("urer-joined", name);
    });
    socket.on("send", (massage) => {
      socket.broadcast.emit("receive", {massage: massage,name: user[socket.id],
      });
    });
    socket.on("disconnect", () => {
      socket.broadcast.emit("left", {name: user[socket.id],
      });
      delete user[socket.id]
    });
  });
  
  console.log("ompa")
  