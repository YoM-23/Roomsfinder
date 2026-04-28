import mongoose from "mongoose";

const homeSchema = new mongoose.Schema({
    name: {type: String, required: true },
    address: {type: String, required: true },
    contact: {type: String, required: true },
<<<<<<< HEAD
    owner: {type: String, required: true, ref: "User" },
=======
    owner: {type: String, ref: "User", required: true },
>>>>>>> ac9f9e132bbf8a30dec436546d3e6ca8fe2aca46
    city: {type: String, required: true },
    
},{timestamps: true});

const Home = mongoose.model("Home", homeSchema);

export default Home;