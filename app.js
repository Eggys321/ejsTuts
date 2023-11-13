const express = require("express");
const app = express();
const PORT = 5050;
const morgan = require("morgan");
const mongoose = require("mongoose");
const connect = require("./db/mongoDB");
require("dotenv/config");

// custom middlewares
app.set("view engine", "ejs");
// app.use((req,res,next)=>{
//     console.log('new request made');
//     console.log('host: ', req.hostname);
//     console.log('path',req.path);
//     console.log('method',req.method);
//     next()
// })

app.use(morgan("dev"));
app.use(express.static("public"));

// routes
// app.get('/',(req,res)=>{
//     res.send('Welcome home')
// })
const tasks = [
  {
    name: "Halimat",
    title: "halimats clothing",
    task: "client deliveries this morning",
  },
  {
    name: "Chimelu",
    title: "I.T experience",
    task: "To give my instructor my log book",
  },
  { name: "Steve", title: "New House Alert", task: "show client a new house" },
];
// routes
app.get("/", (req, res) => {
  res.render("index", { title: "Home || Page", tasks });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About || Page" });
});

app.get("/tasks", (req, res) => {
  res.render("tasks", { title: "New Task || Page" });
});

app.use((req, res) => {
  res.render("404", { title: "Error || Page" });
});

// db Connection
connect()
  .then(() => {
    try {
      app.listen(PORT, () => {
        console.log(`Server connected to http://localhost:${PORT}`);
      });
    } catch (error) {
      console.log("cannot connect to the server");
    }
  })
  .catch((error) => {
    console.log("invalid database connection...!", error);
  });
