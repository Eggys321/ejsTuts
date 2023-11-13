// Require mongoose
// From mongoose, we wud use a method called Schema. This defines d structure of the document dt we wud store in d collection. model is used to wrap the Schema and den sends it to d DB

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    task:{
        type:String,
        required:true
    }
},{timestamps:true}) 

// Lets create awa model(Model is wt surrounds d Schema and provides us with an interface by wich to communicate wit awa database)
const TASKS = mongoose.model('Task',taskSchema);
module.exports = TASKS