import mongoose from 'mongoose';

const mongoURI = process.env.MONGO_URI

const connectToMongo = ()=> {
    mongoose.connect(mongoURI);
}

export default connectToMongo;