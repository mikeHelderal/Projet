import {City} from "../models/index.js";

const createCity = async (city) => {
    try {
         const myCity = await City.create( req.body);
         res.status(201).json({message : "City has been added", result});
        } catch (error) {
         console.log(error);
         return false
    }
}
export {
    createCity
}