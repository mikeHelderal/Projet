
import {Response} from "../models/index.js";
import { io } from "../Services/Socket.js";


const add = async (req, res) => {
    try {
          const result = await Response.create( req.body);
          io.emit("newResponse", result);
         res.status(201).json({message : "Reactions_events has been added", result});
        } catch (error) {
         console.log(error);
         
    }
}


const getAll = async (req, res) => {
    try {
        const Response = await Response.findAll();
        res.status(200).json(Responses);
    } catch (error) {
        console.log(error);
    }
}
const getById = async (req, res) => {
    try {
        const Response = await Response.findByPk(req.params.id);
        res.status(200).json(Response);
    } catch (error) {
        console.log(error);
    }
}
const updateById = async (req, res) => {
    try {
        const Response = await Response.findByPk(req.params.id);
        if(!Response) return res.status(404).json("Response not found!");
        const result = await Response.update(req.body);
        io.emit("updateResponse", result);
        res.status(200).json({message: "Response has been updated!", Response});
    } catch (error) {
        console.log(error);
    }
}
const deleteById = async (req, res) => {
    try {
        const ResponseDeleted = await Response.destroy({where : {id : req.params.id}});
        if(!ResponseDeleted) return res.status(404).json("Response not found!");
        res.status(200).json( {message: "Response has been deleted!"});

    } catch (error) {
        console.log(error);
    }
}



export {
    add, getAll, getById, updateById, deleteById
}

