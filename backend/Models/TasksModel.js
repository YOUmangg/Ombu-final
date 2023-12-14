const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TasksSchema = new Schema({
  name: { type: String, required: true },
  username: {type: String, required: false},
  nameofperson: {type: String, required: false},
  description: { type: String, required: true },
  roles: [{ type: String, required: false }],
  deadline: {type: Date, required: true},
  score: {type: Number, required: true},
  organizationName: {type: String, required: true}
}, {timestamps: true});

module.exports = mongoose.model('TasksModel', TasksSchema)