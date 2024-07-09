
import citiesModel from "../models/cities.model.js";
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
          const cities = await Cities.findByPk(req.params.id);
          res.status(200).json(cities);
     } catch (error) {
        console.log(error);  
     }
}
const getNeighbordhoods = async (req,res) => {
     try {
          const cities = await Cities.findByPk(req.params.id);
          let neighbordhood = await cities.getNeighbordhoods();
          res.status(200).json(neighbordhood);
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
     add, getAll, getById,getNeighbordhoods, deleteById
}

