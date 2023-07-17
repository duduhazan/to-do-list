import mongoose from "mongoose";

const user = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  allowExtraEmails: Boolean,
  rememberMe: Boolean,
});

const userModel = mongoose.model("User", user);

export default userModel;
