
import {City} from "../models/index.js";

const add = async (req, res) => {
     try {
          const city = await City.create( req.body);
          res.status(201).json({message : "Comment has been added", comment});
     } catch (error) {
          console.log(error);
     }
}

const getAll = async (req, res) => {

     try {
          const cities = await City.findAll();
          res.status(200).json(cities);
     } catch (error) {
          console.log(error);
     }
}
const getById = async (req, res) => {
     try {
          const city = await City.findByPk(req.params.id);
          res.status(200).json(city);
     } catch (error) {
        console.log(error);  
     }
}
const deleteById = async (req, res) => {
     try {
          const cityDeleted = await City.destroy({where : {id : req.params.id}});
          if (!cityDeleted) return res.status(404).json("City not found !");
        res.status(200).json({ message: "City deleted" });

     } catch (error) {
          console.log(error);
     }
}

export {
     add, getAll, getById, deleteById
}

