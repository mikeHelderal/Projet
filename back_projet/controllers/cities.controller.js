
import {Cities} from "../models/index.js";

const add = async (req, res) => {
     try {
           const result = await Cities.create( req.body);
          res.status(201).json({message : "Cities has been added", result});
         } catch (error) {
          console.log(error);
          
     }
}

const getAll = async (req, res) => {

     try {
          const cities = await Cities.findAll();
          res.status(200).json(cities);
     } catch (error) {
          console.log(error);
     }
}
const getById = async (req, res) => {
     try {
          const Cities = await Cities.findByPk(req.params.id);
          res.status(200).json(Cities);
     } catch (error) {
        console.log(error);  
     }
}
const deleteById = async (req, res) => {
     try {
          const CitiesDeleted = await Cities.destroy({where : {id : req.params.id}});
          if (!CitiesDeleted) return res.status(404).json("Cities not found !");
        res.status(200).json({ message: "Cities deleted" });

     } catch (error) {
          console.log(error);
     }
}

export {
     add, getAll, getById, deleteById
}

