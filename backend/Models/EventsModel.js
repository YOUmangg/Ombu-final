const mongoose = require("mongoose"); //for creating schemas, you require mongoose. MongoDB alone is schema-less.
//that is the utility of mongoose, you can set the type of data you want a particular collection to have, like a set of
//rules as such, that there should be this particular field which should be a string necessarily, this is a required
//field, this is an optional field and so on. some other functionalities should be available there as well.

const Schema = mongoose.Schema;

const EventsSchema = new Schema({
  EventName: { type: String, required: true },
  EventDescription: {type: String, required: true},
  EventDate: {type: Date, required : true},
  EventTime: {type: String, required: false},
  EventVenue: { type: String, required: true },
  RegistrationLink: { type: String, required: false },
  OrganizationName: {type: String, required: true}
}, {timestamps: true});

module.exports = mongoose.model('EventsModel', EventsSchema)