
import {Comments, Users} from "../models/index.js";
import {io} from '../Services/Socket.js';

const add = async (req, res) => {
     try {
          const result = await Comments.create( req.body);
          
          const response =  await Comments.findAll({include: [{
               model: Users,
               attributes: ["firstName"]
               }               
          ],where :{PublicationId : result.PublicationId}});
          io.emit('newComment', response);
          res.status(201).json({message : "Comment has been added", response});
     } catch (error) {
          res.status(500).json({message : "get all events message encountered a problem", data: error});         
     }
}
const getAll = async (req, res) => {
     try {
          const result = await Comments.findAll({include: [{
               model: Users,
               attributes: ["firstName"]
               }               
          ]});
          if(!result) return res.status(404).json({message: "comments not found!", data: null});

          res.status(200).json({message: "get all comment", data: result});
     } catch (error) {
          res.status(500).json({message : "get all events message encountered a problem", data: error});
     }
}
const getById = async (req, res) => {
     try {
          const result = await Comments.findByPk(req.params.id);
          if(!result) return res.status(404).json({message: "comment not found!", data: null});
          res.status(200).json({message:"get by id", data: result});
     } catch (error) {
          res.status(500).json({message : "get all events message encountered a problem", data: error});
     }
}

const getByPublication = async (req, res) => {
     try {
          const result = await Comments.findAll({include: [{
               model: Users,
               attributes: ["firstName"]
               }               
          ],where :{PublicationId : req.params.id}});
          if(!result) return res.status(404).json({message: "comment not found!", data: null});
          res.status(200).json({message:"get by id", data: result});
     } catch (error) {
          res.status(500).json({message : "get all events message encountered a problem", data: error});
     }
}
const updateById = async (req, res) => {
     try {
          const response = await Comments.findByPk(req.params.id);
          if(!response) return res.status(404).json("Comment not found!");
          const result = await response.update(req.body);
          if(!result) return res.status(404).json({message: "update comment not found!", data: null});
          res.status(200).json({message: "Comment has been updated!", data: result});
     } catch (error) {
          res.status(500).json({message : "get all events message encountered a problem", data: error});
     }
}
const deleteById = async (req, res) => {
     try {
          const commentDeleted = await Comments.destroy({where : {id : req.params.id}});
          if(!commentDeleted) return res.status(404).json({message:"Comment not found!", data: null });
          res.status(200).json( {message: "Comment has been deleted!", data: null});

     } catch (error) {
          res.status(500).json({message : "get all events message encountered a problem", data: error});
     }
}



export {
     add, getAll, getById, getByPublication, updateById, deleteById
}

