const express = require("express");
const Tasks = require("../Models/TasksModel");

const router = express.Router();

//GET all tasks relevant to the organization
// router.get("/", async (req, res) => {
//   const task = await Tasks.find({}).sort({ createdAt: -1 });
//   res.status(200).json(task);
// });

router.get("/find", async(req, res) => {
    const org = req.query.organization;
  try{
    const tasks = await Tasks.find({"organizationName" : org}).sort({createdAt: -1});
  res.status(200).json(tasks);
  }
  catch(error){
    res.status(400).json({error: error.message});
  }
})

router.post("/", async (req, res) => {
  const { name, description, username, nameofperson, roles, score, deadline, organizationName } = req.body;
  try {
    const task = await Tasks.create({
      name,
      score,
      description,
      username,
      nameofperson,
      roles,
      deadline,
      organizationName,
    });
    
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
