const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProgressSheetSchema = new Schema({
  name: { type: String, required: true },
  score: { type: Number, required: true },
  available: { type: Boolean, required: true },
  tasksdone: [{type: String, required: false}],
  organisationName: {type: String, required: true}
}, {timestamps: true});

module.exports = mongoose.model('ProgressSheetModel', ProgressSheetSchema)

//need to decide on what the schema should have, for all the models.