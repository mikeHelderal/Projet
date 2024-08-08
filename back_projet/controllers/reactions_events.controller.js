
import {Reactions_events} from "../models/index.js";
import { io } from "../Services/Socket.js";



const add = async (req, res) => {
    try {
        const result = await Reactions_events.create( req.body);
        io.emit('newReactionEvents', result);
        res.status(201).json({message : "Reactions_events has been added", data: result});
        } catch (error) {
        res.status(500).json({message : "add Reactions_events encountered a problem", data: error});

         
    }
}
const getAll = async (req, res) => {
    try {
        const reactions_events = await Reactions_events.findAll();
        if(!reactions_events) return res.status(404).json({message:"Reactions_events not found!", data: null});
        res.status(200).json({message: "", data: reactions_events});
    } catch (error) {
        res.status(500).json({message : "get all Reactions_events encountered a problem", data: error});
    }
}
const getById = async (req, res) => {
    try {
        const reactions_events = await Reactions_events.findByPk(req.params.id);
        if(!reactions_events) return res.status(404).json({message:"Reactions_events not found!", data: null});
        res.status(200).json({message: "", data: reactions_events});
    } catch (error) {
        res.status(500).json({message : "get by id Reactions_events encountered a problem", data: error});
    }
}

const getByIdUser = async (req, res) => {
    try {
        const reactions = await Reactions_events.findOne({where : {id: req.params.id}});
        if(!reactions) return res.status(404).json({message: "Reactions_events not found!", data: null});
        res.status(200).json( reactions);

    } catch (error) {
        res.status(500).json( {message: "une erreur est parvenue !", data: null});

    }
}
const updateById = async (req, res) => {
    try {
        const reactions_events = await Reactions_events.findByPk(req.params.id);
        if(!reactions_events) return res.status(404).json({message:"Reactions_events not found!", data: null});
        const result = await reactions_events.update(req.body);
        io.emit("newReactionEvent", result);
        res.status(200).json({message: "Reactions_events has been updated!", data: result});
    } catch (error) {
        res.status(500).json({message : "update Reactions_events encountered a problem", data: error});
    }
}
const deleteById = async (req, res) => {
    try {
        const reactions_eventsDeleted = await Reactions_events.destroy({where : {id : req.params.id}});
        if(!reactions_eventsDeleted) return res.status(404).json({message:"Reactions_events not found!", data: null });
        res.status(200).json( {message: "Reactions_events has been deleted!", data: null});

    } catch (error) {
        res.status(500).json({message : "delete Reactions_events encountered a problem", data: error});
    }
}



export {
    add, getAll, getById, updateById,getByIdUser , deleteById
}

