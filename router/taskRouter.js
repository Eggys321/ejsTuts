const express = require("express");
const router = express.Router();
// const TASKS = require("../model/taskModel");
const { create_task, delete_task, single_page } = require("../controller/taskController");

// post route C -- create
router.post("/create", create_task);
// route params for single page
router.get("/route/:id", single_page);

// delete route D -- delete
router.get("/delete/:id", delete_task );

module.exports = router;