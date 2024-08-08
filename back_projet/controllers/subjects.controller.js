
import {Subjects} from "../models/index.js";

const getAll = async (req, res) => {
     try {
          const result = await Subjects.findAll();
          if(!result) return res.status(404).json({message: "Subject not found!", data: null});
          res.status(200).json({message: "get all subject", data: result});
     } catch (error) {
          res.status(500).json({message : "get all  subject encountered a problem", data: error});
     }
}
const getById = async (req, res) => {
     try {
          const result = await Subjects.findByPk(req.params.id);
          if(!result) return res.status(404).json({message: "Subject not found!", data: null});
          res.status(200).json(subject);
     } catch (error) {
          res.status(500).json({message : "get by id  subject encountered a problem", data: error});
     }
}
const updateById = async (req, res) => {
     try {
          const subject = await Subjects.findByPk(req.params.id);
          if(!result) return res.status(404).json({message: "Subject not found!", data: null});
          await subject.update(req.body);
          res.status(200).json({message: "Subject has been updated!", subject});
     } catch (error) {
          res.status(500).json({message : "update by id  subject encountered a problem", data: error});
     }
}
const deleteById = async (req, res) => {
     try {
          const subjectDeleted = await Subjects.destroy({where : {id : req.params.id}});
          if(!subjectDeleted) return res.status(404).json("Subject not found!");
          res.status(200).json( {message: "Subject has been deleted!"});
     } catch (error) {
          res.status(500).json({message : "delete by id  subject encountered a problem", data: error});
     }
}



export {
     getAll, getById, updateById, deleteById
}

