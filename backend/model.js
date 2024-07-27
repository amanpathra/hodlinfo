import mongoose from "mongoose";
const { Schema, model } = mongoose;

const tickerSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    last:{
        type: String,
        required: true
    },
    buy:{
        type: String,
        required: true
    },
    sell: {
        type: String,
        required: true
    },
    volume: {
        type: String,
        required: true
    },
    base_unit:{
        type: String,
        required: true
    }
});

const Ticker = model("ticker", tickerSchema);
export default Ticker;