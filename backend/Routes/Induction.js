const express = require("express");
const allInductions = require("../Models/InductionsNoticesModel");
// const EventsModel = require("../Models/EventsModel");

const router = express.Router();

//GET all events list
router.get("/", async(req, res) => {
    const Inductions = await allInductions.find({}).sort({ createdAt : -1});
    res.status(200).json(Inductions);
})

//POST an event
router.post("/", async (req, res) => {
    const { Description, Deadline, Batches, Venue, Link, OrganizationName } = req.body;
    try {
        const Induction = await allInductions.create({
            Description,
            Deadline,
            Batches,
            Venue,
            Link,
            OrganizationName,
        });
        res.status(200).json(Induction);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

module.exports = router;
