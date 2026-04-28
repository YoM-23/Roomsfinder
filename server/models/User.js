import mongoose from "mongoose";

<<<<<<< HEAD
const userSchema = mongoose.Schema(
  {
    _id: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String, required: true },
    role: { type: String, enum: ["user", "homeOwner"], default: "user" },
    recentSearchedCities: [{ type: String, required: true }],
  },
  { timestamps: true },
=======
const userSchema = mongoose.Schema({
    _id: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true},
    image: {type: String, required: true},
    role: {type: String, enum: ["user", "homeOwner"], default: "user"},
    recentSearchedCities: {type: [String], default: []},

},{timestamps: true}
>>>>>>> ac9f9e132bbf8a30dec436546d3e6ca8fe2aca46
);

const User = mongoose.model("User", userSchema);

export default User;
