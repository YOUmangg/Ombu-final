const express = require("express");
const allEvents = require("../Models/EventsModel");
// const EventsModel = require("../Models/EventsModel");

const router = express.Router();

//GET all events list
router.get("/", async(req, res) => {
    const events = await allEvents.find({}).sort({ createdAt : -1});
    res.status(200).json(events);
})

//POST an event
router.post("/", async (req, res) => {
    const {EventName, EventDescription, EventDate, EventTime, EventVenue, RegistrationLink, OrganizationName} = req.body;
    try {
        const event = await allEvents.create({
            EventName, 
            EventDescription,
            EventDate,
            EventTime,
            EventVenue,
            RegistrationLink,
            OrganizationName,
        });
        res.status(200).json(event);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});
//GET all members list
// router.get("/", async (req, res) => {
//   const newuser = await newusers.find({}).sort({ createdAt: -1 });
//   res.status(200).json(newuser);
// });

//Find a member
// router.get("/find", async (req, res) => {
//   //search object creation
//   const search = {"Name": req.query.Name, "Username": req.query.Username};

//   try {
//     //search member
//     const result = await newusers.find({
//       $and: [
//         { "Name": search.Name },
//         { "Username": search.Username }
//       ],
//     })
//     res.json(result);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// //POST [register a new user]
// router.post("/", async (req, res) => {
//   const { Username, Name, Password, ConfirmPassword, Emailid, Phonenumber, Organizations } =
//     req.body;
//   try {
//     const newuser = await newusers.create({
//       Username,
//       Name,
//       Password,
//       ConfirmPassword,
//       Emailid,
//       Phonenumber,
//       Organizations,
//     });
//     res.status(200).json(newuser);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

module.exports = router;
