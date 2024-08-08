
import citiesModel from "../models/cities.model.js";
import {Cities} from "../models/index.js";

const add = async (req, res) => {
     try {
           const result = await Cities.create( req.body);
          res.status(201).json({message : "Cities has been added", data: result});
         } catch (error) {
          res.status(500).json({message : "get all events message encountered a problem", data: error});
          
     }
}

const getAll = async (req, res) => {

     try {
          const result = await Cities.findAll();
          if(!result) return res.status(404).json({message: "comment not found!", data: null});
          res.status(200).json({message: "get all cities", data: result});
     } catch (error) {
          res.status(500).json({message : "get all events message encountered a problem", data: error});
     }
}
const getById = async (req, res) => {
     try {
          const result = await Cities.findByPk(req.params.id);
          if(!result) return res.status(404).json({message: "comment not found!", data: null});
          res.status(200).json({message: "get by id", data: result});
     } catch (error) {
        res.status(500).json({message : "get all events message encountered a problem", data: error});  
     }
}
const getNeighbordhoods = async (req,res) => {
     try {
          const cities = await Cities.findByPk(req.params.id);
          if(!cities) return res.status(404).json({message: "comment not found!", data: null});
          const result = await cities.getNeighbordhoods();
          if(!result) return res.status(404).json({message: "comment not found!", data: null});
          res.status(200).json({message: "get neighborhood", data: result});
     } catch (error) {
        res.status(500).json({message : "get all events message encountered a problem", data: error});  
     }
}
const deleteById = async (req, res) => {
     try {
          const CitiesDeleted = await Cities.destroy({where : {id : req.params.id}});
          if (!CitiesDeleted) return res.status(404).json({message: "Cities not found !", data: null});
        res.status(200).json({ message: "Cities deleted", data: null });

     } catch (error) {
          res.status(500).json({message : "get all events message encountered a problem", data: error});
     }
}

export {
     add, getAll, getById,getNeighbordhoods, deleteById
}

