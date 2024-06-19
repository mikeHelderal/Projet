
import {Comments} from "../models/index.js";


const add = async (req, res) => {
     try {
          const comment = await Comment.create( req.body);
          res.status(201).json({message : "Comment has been added", comment});
     } catch (error) {
          console.log(error);
     }
}
const getAll = async (req, res) => {
     try {
          const comments = await Comment.findAll();
          res.status(200).json(comments);
     } catch (error) {
          console.log(error);
     }
}
const getById = async (req, res) => {
     try {
          const comment = await Comment.findByPk(req.params.id);
          res.status(200).json(comment);
     } catch (error) {
          console.log(error);
     }
}
const updateById = async (req, res) => {
     try {
          const comment = await Comment.findByPk(req.params.id);
          if(!comment) return res.status(404).json("Comment not found!");
          await comment.update(req.body);
          res.status(200).json({message: "Comment has been updated!", comment});
     } catch (error) {
          console.log(error);
     }
}
const deleteById = async (req, res) => {
     try {
          const commentDeleted = await Comment.destroy({where : {id : req.params.id}});
          if(!commentDeleted) return res.status(404).json("Comment not found!");
          res.status(200).json( {message: "Comment has been deleted!"});

     } catch (error) {
          console.log(error);
     }
}



export {
     add, getAll, getById, updateById, deleteById
}

