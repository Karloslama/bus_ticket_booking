import mongoose from "mongoose";

const busSchema = new mongoose.Schema({
    name: {type: String, required: true},
    from: {type: String, required: true},
    to: {type: String, required: true},
    seats: {type: Number, required: true},
    bookedSeats: {type: [Number], default:[]},

})

export default mongoose.model("Bus", busSchema)