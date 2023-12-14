const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SignUpSchema = new Schema(
  {
    Username: { type: String, required: true },
    Name: { type: String, required: true },
    Password: { type: String, required: true },
    ConfirmPassword: { type: String, required: true },
    Emailid: { type: String, required: true },
    Phonenumber: { type: Number, required: true },
    Organizations: {type: String, required: false},
  },
  { timestamps: true }
);

module.exports = mongoose.model("SignUpModel", SignUpSchema);
