const TASKS = require("../model/taskModel");
// post request
const create_task = async (req, res) => {
  // console.log(req.body);
  const newTask = new TASKS(req.body);
  try {
    await newTask.save();
    res.status(201).redirect("/");
  } catch (error) {
    console.log(error);
  }
};

// delete request
const delete_task = async (req, res) => {
  const id = req.params.id;
  try {
    await TASKS.findByIdAndDelete(id);

    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};
// params route for getting single page

const single_page = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const result = await TASKS.findById(id);
    res
      .status(200)
      .render("singlepage", { title: "single || page", task: result });
  } catch (error) {
    console.log(error);
  }
};

// update route 

const edit_task = async(req,res)=>{
  const id = req.params.id;
  const updatedData = req.body;
  try{
    await TASKS.findByIdAndUpdate(id, updatedData,{new:true})
    res.status(301).redirect('/')

  }catch(error){
    console.log(error);
  }
}
// edit page
const edit_page = async (req,res)=>{
  const id = req.params.id
  try{
    const result =await TASKS.findById(id)
    res.render('editpage',{title:'edit || page',task:result})

  }catch(error){
    console.log(error);
  }

}


module.exports = {
  create_task,
  delete_task,
  single_page,
  edit_task,
  edit_page
};
