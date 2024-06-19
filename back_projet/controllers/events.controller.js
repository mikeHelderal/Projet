
import {Events} from "../models/index.js";

const add = async (req, res) => {
    try {
        await Evenement.create(req.body),
        res.status(201).json({message: "Evenement added successfully"})
    } catch (error) {
        console.log(error);
    }
}
const getAll = async (req, res) => {
    try {
        const evenements = await Evenement.findAll();
        res.status(200).json(evenements);
    } catch (error) {
        console.log(error);
    }
}
const getById = async (req, res) => {
    try {
        const evenement = await Evenement.findByPk(req.params.id);
        res.status(200).json(evenement);
    } catch (error) {
        console.log(error);
    }
}
const updateById = async (req, res) => {
    try {
        const evenement = await Evenement.findByPk(req.params.id);
        if(!evenement) return res.status(404).json("Evenement not found!")
        await evenement.update(req.body);
        res.status(200).json({message: "Evenement has been updated", evenement});

    } catch (error) {
        console.log(error);
    }
}
const deleteById = async (req, res) => {
    try {
        const evenementDeleted = await Evenement.destroy({where: {id : req.params.id}});
        if (!evenementDeleted) return res.status(404).json("Evenement not found !");
        res.status(200).json({ message: "Evenement deleted" });
    } catch (error) {
        
    }
}



export {
    add, getAll, getById, updateById, deleteById
}

