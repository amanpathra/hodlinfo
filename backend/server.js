import express from 'express';
import connectToMongo from "./db.js";
import cors from 'cors';
import api from './api.js';

connectToMongo();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use('/api', api);

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
})