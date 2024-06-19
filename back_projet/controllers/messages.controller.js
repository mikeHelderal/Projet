
import {Messages} from "../models/index.js";
import {io} from '../Services/Socket.js';




const add = async (req, res) => {
    try {
          const result = await Messages.create( req.body);
          io.emit('newMessage', result);
         res.status(201).json({message : "message has been added", result});
        } catch (error) {
         console.log(error);
         
    }
}
const getAll = async (req, res) => {
    try {
        const Messages = await Messages.findAll();
        res.status(200).json(Messagess);
    } catch (error) {
        console.log(error);
    }
}
const getById = async (req, res) => {
    try {
        const Messages = await Messages.findByPk(req.params.id);
        res.status(200).json(Messages);
    } catch (error) {
        console.log(error);
    }
}
const updateById = async (req, res) => {
    try {
        const Messages = await Messages.findByPk(req.params.id);
        if(!Messages) return res.status(404).json("Messages not found!");
        const result = await Messages.update(req.body);
        io.emit("updateMessage", result);
        res.status(200).json({message: "Messages has been updated!", Messages});
    } catch (error) {
        console.log(error);
    }
}
const deleteById = async (req, res) => {
    try {
        const MessagesDeleted = await Messages.destroy({where : {id : req.params.id}});
        if(!MessagesDeleted) return res.status(404).json("Messages not found!");
        res.status(200).json( {message: "Messages has been deleted!"});

    } catch (error) {
        console.log(error);
    }
}



export {
    add, getAll, getById, updateById, deleteById
}

