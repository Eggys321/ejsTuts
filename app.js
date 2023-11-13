const express = require("express");
const app = express();
const port = process.env.PORT || 5050
const morgan = require("morgan");
const TASKS = require('./model/taskModel')
// const mongoose = require("mongoose");
const connect = require("./db/mongoDB");
require("dotenv/config");

// custom middlewares
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));
// app.use((req,res,next)=>{
//     console.log('new request made');
//     console.log('host: ', req.hostname);
//     console.log('path',req.path);
//     console.log('method',req.method);
//     next()
// })

// TESTING AWA MODEL AND DATABASE
// .save() mthod is a mongoose method for saving data to awa database
app.get('/post-task',async(req,res)=>{
    const testData = new TASKS({
        name:'Halimat',
        title:'front-end',
        task:'she sabi teach front-end die!!!'
    })

    try{
        const newTask = await testData.save();
        res.status(201).send(newTask)

    }catch(error){
        console.log(error);
    }


})
// .find() method is a mongoose method for getting all d data from awa database

app.get('/get-posts',async(req,res)=>{
    try{
        const getTasks =await TASKS.find();
        res.status(200).send(getTasks)


    }catch(error){
        console.log(error);
    }
})

// .findById() method is a mongoose method for finding a specific data from awa database
app.get('/single-task',async(req,res)=>{
    try{
        const singleTask = await TASKS.findById('65523309d4b4472d5606a998');
        res.status(200).send(singleTask)
        
    }catch(error){
        console.log(error);
    }

})


// END OF DATABASE TEST

app.use(morgan("dev"));
app.use(express.static("public"));

// routes
// app.get('/',(req,res)=>{
//     res.send('Welcome home')
// })
// const tasks = [
//   {
//     name: "Halimat",
//     title: "halimats clothing",
//     task: "client deliveries this morning",
//   },
//   {
//     name: "Chimelu",
//     title: "I.T experience",
//     task: "To give my instructor my log book",
//   },
//   { name: "Steve", title: "New House Alert", task: "show client a new house" },
// ];

// api
app.post('/api/v1/create',async(req,res)=>{
    const ss = new TASKS(req.body)

//   ss.save()
//   .then((result)=>{
//     res.redirect('/')

//   })
try{
    await ss.save();
    res.status(200).redirect('/')

}catch(error){
    console.log(error);
}

})
// page routes
app.get("/", async(req, res) => {
    // TASKS.find()
    // .then((result)=>{

    //     res.render("index", { title: "Home || Page", tasks:result });
    // })
    try{
        const result = await TASKS.find()
        res.render("index", { title: "Home || Page", tasks:result });

    }catch(error){
        console.log(error);
    }
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
      app.listen(port, () => {
        console.log(`Server connected to http://localhost:${port}`);
      });
    } catch (error) {
      console.log("cannot connect to the server");
    }
  })
  .catch((error) => {
    console.log("invalid database connection...!", error);
  });
