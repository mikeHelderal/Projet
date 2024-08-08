
import {Messages} from "../models/index.js";
import {io} from '../Services/Socket.js';




const add = async (req, res) => {
    try {
        const result = await Messages.create( req.body);
        io.emit('newMessage', result);
        res.status(201).json({message : "message has been added",data:  result});
        } catch (error) {
        res.status(500).json({message : "add message encountered a problem", data: error});         
    }
}
const getAll = async (req, res) => {
    try {
        const result = await Messages.findAll();
        if(!result) return res.status(404).json({message: "message not found!", data: null})
        res.status(200).json({message: "get all message", data: result});
    } catch (error) {
        res.status(500).json({message : "get all message encountered a problem", data: error});         
    }
}
const getById = async (req, res) => {
    try {
        const result = await Messages.findByPk(req.params.id);
        if(!result) return res.status(404).json({message: "message not found!", data: null})
        res.status(200).json({message: "get by id", data: result});
    } catch (error) {
        res.status(500).json({message : "get by id message encountered a problem", data: error});         
    }
}
const updateById = async (req, res) => {
    try {
        const msg = await Messages.findByPk(req.params.id);
        if(!msg) return res.status(404).json({message: "Messages not found!", data: null});
        const result = await Messages.update(req.body);
        io.emit("updateMessage", result);
        res.status(200).json({message: "Messages has been updated!", data: result});
    } catch (error) {
        res.status(500).json({message : "update by id message encountered a problem", data: error});         
    }
}
const deleteById = async (req, res) => {
    try {
        const MessagesDeleted = await Messages.destroy({where : {id : req.params.id}});
        if(!MessagesDeleted) return res.status(404).json({message: "Messages not found!", data: null});
        res.status(200).json( {message: "Messages has been deleted!", data: null});

    } catch (error) {
        res.status(500).json({message : "delete by id message encountered a problem", data: error});         
    }
}



export {
    add, getAll, getById, updateById, deleteById
}

