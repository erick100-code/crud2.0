import mongoose from "mongoose";

const modelo = new mongoose.Schema({
    produto: String,
    preço: Number,
    validade: String,
})

export default mongoose.model("produtos", modelo)