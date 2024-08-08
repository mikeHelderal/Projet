
import {Response} from "../models/index.js";
import { io } from "../Services/Socket.js";


const add = async (req, res) => {
    try {
        const result = await Response.create( req.body);
        if(!result) return res.status(404).json({message:"Response not found!", data: ""});
        io.emit("newResponse", result);
        res.status(201).json({message : "response has been added",data: result});
        } catch (error) {
        res.status(500).json({message : "add  response encountered a problem", data: error});         
    }
}


const getAll = async (req, res) => {
    try {
        const result = await Response.findAll();
        if(!result) return res.status(404).json({message:"Response not found!", data: ""});
        res.status(200).json({message: "get all", data: result});
    } catch (error) {
        res.status(500).json({message : "get all  response encountered a problem", data: error});
    }
}
const getById = async (req, res) => {
    try {
        const result = await Response.findByPk(req.params.id);
        if(!result) return res.status(404).json({message:"Response not found!", data: ""});
        res.status(200).json({message: "get by id", data: result});
    } catch (error) {
        res.status(500).json({message : "get by id  response encountered a problem", data: error});
    }
}
const updateById = async (req, res) => {
    try {
        const response = await Response.findByPk(req.params.id);
        if(!response) return res.status(404).json({message:"Response not found!", data: ""});
        const result = await Response.update(req.body);
        if(!result) return res.status(404).json({message:"Response not found!", data: ""});
        io.emit("updateResponse", result);
        res.status(200).json({message: "Response has been updated!", data: result});
    } catch (error) {
        res.status(500).json({message : "update by id  events message encountered a problem", data: error});
    }
}
const deleteById = async (req, res) => {
    try {
        const responseDeleted = await Response.destroy({where : {id : req.params.id}});
        if(!responseDeleted) return res.status(404).json({message:"Response not found!"});
        res.status(200).json( {message: "Response has been deleted!"});

    } catch (error) {
        res.status(500).json({message : "delete by id  events message encountered a problem", data: error});
    }
}



export {
    add, getAll, getById, updateById, deleteById
}

