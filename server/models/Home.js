import mongoose from "mongoose";

const homeSchema = new mongoose.Schema({
    name: {type: String, required: true },
    address: {type: String, required: true },
    contact: {type: String, required: true },
    owner: {type: String, ref: "User", required: true },
    city: {type: String, required: true },
    
},{timestamps: true});

const Home = mongoose.model("Home", homeSchema);

export default Home;