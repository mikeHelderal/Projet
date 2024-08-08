
import {Events} from "../models/index.js";

const add = async (req, res) => {
    try {
        const result = await Events.create(req.body);
        res.status(201).json({message: "Evenement added successfully", data: result})
    } catch (error) {
        res.status(500).json({message : "add events message encountered a problem", data: error});         
    }
}
const getAll = async (req, res) => {
    try {
        const result = await Events.findAll();
        if(!result) return res.status(404).json({message: "events not found!", data: null});
        res.status(200).json({message: "get all events", data: result});
    } catch (error) {
        res.status(500).json({message : "get all events message encountered a problem", data: error});         
    }
}
const getById = async (req, res) => {
    try {
        const result = await Events.findByPk(req.params.id);
        if(!result) return res.status(404).json({message: "events not found!", data: null});
        res.status(200).json({message: "get by id", data: result});
    } catch (error) {
        res.status(500).json({message : "add events message encountered a problem", data: error});         
    }
}
const updateById = async (req, res) => {
    try {
        const response = await Events.findByPk(req.params.id);
        if(!response) return res.status(404).json({message: "Events not found!", data: null})
        const result = await response.update(req.body);
        res.status(200).json({message: "Evenement has been updated", data: result});

    } catch (error) {
        res.status(500).json({message : "add events message encountered a problem", data: error});         
    }
}
const deleteById = async (req, res) => {
    try {
        const evenementDeleted = await Evenement.destroy({where: {id : req.params.id}});
        if (!evenementDeleted) return res.status(404).json({message: "Evenement not found !", data: null});
        res.status(200).json({ message: "Evenement deleted" , data: null});
    } catch (error) {
        res.status(500).json({message : "add events message encountered a problem", data: error});         
    }
}



export {
    add, getAll, getById, updateById, deleteById
}

