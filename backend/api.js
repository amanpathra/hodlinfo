import express from 'express';
import axios from "axios";
import Ticker from "./model.js";

const router = express.Router();

router.get('/fetchData', async (req, res) => {

    let success = false;

    try{
        const fetchedData = await axios.get("https://api.wazirx.com/api/v2/tickers");
        // const f2 = await fetchedData.json();
        const mainData = fetchedData.data;

        await Ticker.deleteMany({});
        
        let counter = 0;
        for(let key in mainData){
            await Ticker.create(mainData[key]);
            counter++;
            if(counter === 10) break;
        }

        success = true;
        res.status(200).json({
            success,
            message: "Data fetched successfully."
        })
    }
    catch(error){
        console.log(error.message, 'ff');
        res.status(500).json({
            success,
            message: "Internal server error."
        })
    }

})

router.get('/getData', async (req, res) => {

    let success = false;

    try{
        const storedData = await Ticker.find();
        
        success = true;
        res.status(200).json({
            success,
            data: storedData
        })
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({
            success,
        })
    }
})



export default router;