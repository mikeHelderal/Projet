
import {Subjects} from "../models/index.js";

const getAll = async (req, res) => {
     try {
          const subjects = await Subjects.findAll();
          res.status(200).json(subjects);
     } catch (error) {
          console.log(error);
     }
}
const getById = async (req, res) => {
     try {
          const subject = await Subjects.findByPk(req.params.id);
          res.status(200).json(subject);
     } catch (error) {
          console.log(error);
     }
}
const updateById = async (req, res) => {
     try {
          const subject = await Subjects.findByPk(req.params.id);
          if(!subject) return res.status(404).json("Subject not found!");
          await subject.update(req.body);
          res.status(200).json({message: "Subject has been updated!", subject});
     } catch (error) {
          console.log(error);
     }
}
const deleteById = async (req, res) => {
     try {
          const subjectDeleted = await Subjects.destroy({where : {id : req.params.id}});
          if(!subjectDeleted) return res.status(404).json("Subject not found!");
          res.status(200).json( {message: "Subject has been deleted!"});

     } catch (error) {
          console.log(error);
     }
}



export {
     getAll, getById, updateById, deleteById
}

