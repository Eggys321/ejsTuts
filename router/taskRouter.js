const express = require("express");
const router = express.Router();
// const TASKS = require("../model/taskModel");
const { create_task, delete_task, single_page, edit_task } = require("../controller/taskController");

// post route C -- create
router.post("/create", create_task);
// route params for single page
router.get("/route/:id", single_page);

// delete route D -- delete
router.get("/delete/:id", delete_task );

// update route U -- update
router.post('/edit/:id',edit_task)

module.exports = router;
