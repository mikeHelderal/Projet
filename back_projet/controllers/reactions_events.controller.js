
import {Reactions_events} from "../models/index.js";
import { io } from "../Services/Socket.js";



const add = async (req, res) => {
    try {
          const result = await Reactions_events.create( req.body);
          io.emit('newReactionEvents', result);
         res.status(201).json({message : "Reactions_events has been added", result});
        } catch (error) {
         console.log(error);
         
    }
}
const getAll = async (req, res) => {
    try {
        const reactions_events = await Reactions_events.findAll();
        res.status(200).json(reactions_eventss);
    } catch (error) {
        console.log(error);
    }
}
const getById = async (req, res) => {
    try {
        const reactions_events = await Reactions_events.findByPk(req.params.id);
        res.status(200).json(reactions_events);
    } catch (error) {
        console.log(error);
    }
}

const getByIdUser = async (req, res) => {
    try {
        const reactions = await Reactions_events.findOne({where : {id: req.params.id}});
        if(!reactions) return res.status(404).json("Reactions_events not found!");
        res.status(200).json( reactions);

    } catch (error) {
        res.status(500).json( {message: "une erreur est parvenue !"});

    }
}
const updateById = async (req, res) => {
    try {
        const reactions_events = await Reactions_events.findByPk(req.params.id);
        if(!reactions_events) return res.status(404).json("Reactions_events not found!");
        const result = await reactions_events.update(req.body);
        io.emit("newReactionEvent", result);
        res.status(200).json({message: "Reactions_events has been updated!", Reactions_events});
    } catch (error) {
        console.log(error);
    }
}
const deleteById = async (req, res) => {
    try {
        const reactions_eventsDeleted = await Reactions_events.destroy({where : {id : req.params.id}});
        if(!reactions_eventsDeleted) return res.status(404).json("Reactions_events not found!");
        res.status(200).json( {message: "Reactions_events has been deleted!"});

    } catch (error) {
        console.log(error);
    }
}



export {
    add, getAll, getById, updateById,getByIdUser , deleteById
}

