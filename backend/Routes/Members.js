const express = require("express");
const Members = require("../Models/MembersModel");

const router = express.Router();

//GET all members list
router.get("/", async (req, res) => {
  const member = await Members.find({}).sort({ createdAt: -1 });
  res.status(200).json(member);
});

//getting the details of a member
router.get("/find", async(req, res) => {
  const search = { "Username": req.query.Username, "organisationName": req.query.organisationName };
  try{
    const member = await Members.findOne({
    $and: [
      {"username" : search.Username},
      {"organisationName" : search.organisationName}
    ]
  })
  res.status(200).json(member);
}catch(error)
{
  res.status(500).json({error: "Internal Server Error"});
  }
})

//organizations the logging in user is a part of
router.get("/find/organizations", async(req, res) => {
  const search = {"Username" : req.query.Username};
  try {
    const orgs = await Members.find({"username" : req.query.Username}, {organisationName: 1});
    res.status(200).json(orgs);
  }catch(error)
  {
    res.status(500).json({error: "Internal Server Error"});
  }
})

//isAdmin array
router.get("/find/organizations/admin", async(req, res) => {
  const search = {"Username" : req.query.Username};
  try {
    const orgs = await Members.find({"username" : req.query.Username, "isAdmin" : true}, {organisationName: 1});
    res.status(200).json(orgs);
  }catch(error)
  {
    res.status(500).json({error: "Internal Server Error"});
  }
})

//MembersList of an organization
router.get("/MembersList", async (req, res) => {
  const org = req.query.OrganizationName;
  try{
  const member = await Members.find({ 'organisationName': org });
  res.status(200).json(member);
  }catch(error)
  {
    res.status(404).json({error: "Internal"});
  }
});

//adding a new member
router.post("/", async (req, res) => {
  const { name, username, roles, phonenumber, isAdmin, organisationName } = req.body;
  try {
    const member = await Members.create({
      name,
      username,
      roles,
      phonenumber,
      isAdmin,
      organisationName,
    });
    // const member = Members.create({name, roles, isAdmin, organizationName})
    //just typing out this is synchronous..we want to make it asynchronous [idk why, confirm]
    //async and await give us the benefits of asynchronous code but also allow us to write promises just as in sync code.
    res.status(200).json(member);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
