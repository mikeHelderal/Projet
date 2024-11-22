
import {Neighbordhoods} from "../models/index.js";

const getAll = async (req, res) => {
     try {
          const neighbordhoods = await Neighbordhoods.findAll();
          res.status(200).json(neighbordhoods);
     } catch (error) {
          console.log(error);
     }
}
const getById = async (req, res) => {
     try {
          const neighbordhood = await Neighbordhoods.findByPk(req.params.id);
          let test = await 
          res.status(200).json(neighbordhood);
     } catch (error) {
          console.log(error);
     }
}
const getCity = async (req, res) => {
     try {
          const neighbordhood = await Neighbordhoods.findByPk(req.params.id);
          let city = await neighbordhood.getCity();
          console.log(city)
          res.status(200).json(city);
     } catch (error) {
        console.log(error);  
     }    
}       

const deleteById = async (req, res) => {
     try {
          const neighbordhoodDeleted = await Neighbordhoods.destroy({where: {id: req.params.id}});
          if (!neighbordhoodDeleted) return res.status(404).json("neighbordhood not found !");
          res.status(200).json({ message: "neighbordhood deleted" });
      } catch (error) {
          console.log(error);
          
      }
}



export {
     getAll, getById, getCity, deleteById
}

