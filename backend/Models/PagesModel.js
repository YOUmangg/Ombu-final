const mongoose = require("mongoose"); //for creating schemas, you require mongoose. MongoDB alone is schema-less.
//that is the utility of mongoose, you can set the type of data you want a particular collection to have, like a set of
//rules as such, that there should be this particular field which should be a string necessarily, this is a required
//field, this is an optional field and so on. some other functionalities should be available there as well.

const Schema = mongoose.Schema;

const PagesSchema = new Schema({
  //   EventName: { type: String, required: true },
  Name: { type: String, required: true },
  GeneralDescription: { type: String, required: true },
  HotTopics: { type: String, required: true },
  PORs: { type: [String], required: false, default: [] },
  Tips: { type: String, required: false },
}, { timestamps: true });

module.exports = mongoose.model('PagesModel', PagesSchema)



// const mongoose = require("mongoose"); //for creating schemas, you require mongoose. MongoDB alone is schema-less.
// //that is the utility of mongoose, you can set the type of data you want a particular collection to have, like a set of
// //rules as such, that there should be this particular field which should be a string necessarily, this is a required
// //field, this is an optional field and so on. some other functionalities should be available there as well.

// const Schema = mongoose.Schema;

// const InductionsSchema = new Schema({
// //   EventName: { type: String, required: true },
//   Description: {type: String, required: true},
//   Deadline: {type: Date, required : true},
//   Batches: {type: String, required: false},
//   Venue: { type: String, required: false },
//   Link: { type: String, required: false },
//   OrganizationName: {type: String, required: true}
// }, {timestamps: true});

// module.exports = mongoose.model('InductionsNoticesModel', InductionsSchema)