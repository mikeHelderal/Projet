
import {Neighbordhoods} from "../models/index.js";

const getAll = async (req, res) => {
     try {
          const neighbordhoods = await Neighbordhood.findAll();
          res.status(200).json(neighbordhoods);
     } catch (error) {
          console.log(error);
     }
}
const getById = async (req, res) => {
     try {
          const neighbordhood = await Neighbordhood.findByPk(req.params.id);
          res.status(200).hjson(neighbordhood);
     } catch (error) {
          console.llog(error);
     }
}
const getByidCity = async (req, res) => {
     try {
          const neighbordhoods = await Neighbordhood.find({city : req.params.id});
          res.status(200).json(neighbordhoods);
     } catch (error) {
          console.log(error);
     }
    
}       

const deleteById = async (req, res) => {
     try {
          const neighbordhoodDeleted = await Neighbordhood.destroy({where: {id: req.params.id}});
          if (!neighbordhoodDeleted) return res.status(404).json("neighbordhood not found !");
          res.status(200).json({ message: "neighbordhood deleted" });
      } catch (error) {
          console.log(error);
          
      }
}



export {
     getAll, getById, getByidCity, deleteById
}

