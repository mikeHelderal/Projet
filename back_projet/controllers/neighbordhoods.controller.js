
import {Neighbordhoods} from "../models/index.js";

const getAll = async (req, res) => {
     try {
          const result = await Neighbordhoods.findAll();
          if(!result) return res.status(404).json({message: "neighbordhoods not found!", data: null})
          res.status(200).json({message: "get all neighbordhood", data: result});
     } catch (error) {
          res.status(500).json({message : "get all neighbordhood encountered a problem", data: error});
     }
}
const getById = async (req, res) => {
     try {
          const result = await Neighbordhoods.findByPk(req.params.id);
          if(!result) return res.status(404).json({message: "neighbordhoods not found!", data: null})
          res.status(200).json({message: "get by id ", data: result});
     } catch (error) {
          res.status(500).json({message : "get by id neighbordhood encountered a problem", data: error});
     }
}
const getCity = async (req, res) => {
     try {
          const neighbordhood = await Neighbordhoods.findByPk(req.params.id);
          if(!neighbordhood) return res.status(404).json({message: "neighbordhoods not found!", data: null})
          const city = await neighbordhood.getCity();
          if(!city) return res.status(404).json({message: "city not found!", data: null})
          res.status(200).json({message: "get city", data: city});
     } catch (error) {
          res.status(500).json({message : "get city neighbordhood encountered a problem", data: error});
     }    
}       

const deleteById = async (req, res) => {
     try {
          const neighbordhoodDeleted = await Neighbordhoods.destroy({where: {id: req.params.id}});
          if (!neighbordhoodDeleted) return res.status(404).json("neighbordhood not found !");
          res.status(200).json({ message: "neighbordhood deleted", data: null });
     } catch (error) {
          res.status(500).json({message : "delete neighbordhood encountered a problem", data: error});          
     }
}



export {
     getAll, getById, getCity, deleteById
}

