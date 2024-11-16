
import {Events} from "../models/index.js";

const add = async (req, res) => {
    let profilePicture = ""
    const EventObject = req.body
    try {

        if (req.file) {
            const { buffer, originalname } = req.file
            const timestamp = Date.now()
            const name = originalname.split(' ').join('_')
            const ref = `${name}-${timestamp}.webp`
            const path = `./uploads/${ref}`
            sharp(buffer).resize(450).webp().toFile(path)
            profilePicture = `${req.protocol}://${req.get('host')}/images/${ref}`
        }






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
        const event = await Events.findByPk(req.params.id);
        if(!event) return res.status(404).json({message: "Event not found!", data: null})

            event.is_valid = true;
            const enregistrement = await event.save();
            const result = await Events.findAll();




        if(!result) return res.status(404).json({message: "Event not found!", data: null})
        res.status(200).json({message: "Event has been updated", result});
    } catch (error) {
        res.status(500).json({message : "update by id Event encountered a problem", data: error});
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

