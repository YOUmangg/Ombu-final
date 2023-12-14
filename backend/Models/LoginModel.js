const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SignInSchema = new Schema(
  {
    OrganizationName: {type: String, required: true},
    Username: { type: String, required: true },
    Password: { type: String, required: true }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("SignInModel", SignInSchema);
