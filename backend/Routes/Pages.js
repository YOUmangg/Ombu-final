const express = require("express");
const Pages = require("../Models/PagesModel");

const router = express.Router();

//GET info related to general page
router.get("/general", async (req, res) => {
    try{
        const org = req.query.organizationName;
  const genPage = await Pages.findOne({ "Name" : org}).sort({ createdAt: -1 });
  const forGen = { Name: genPage.Name, GeneralDescription:  genPage.GeneralDescription };
  res.status(200).json(forGen);
    }
    catch{
        res.status(404).json({ message: "Data for the organization is currently not available"});
    }
});

//GET internal page
router.get("/page", async(req, res) => {
    const org = req.query.organizationName;
    const internalPage = await Pages.findOne({"Name" : org});
    const forInternal = {"Name" : internalPage.Name, "HotTopics" : internalPage.HotTopics};
    res.status(200).json();
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
