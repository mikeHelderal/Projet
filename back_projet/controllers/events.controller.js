
import {Events} from "../models/index.js";

const add = async (req, res) => {
    const EventObject = req.body
    try {

        const evenement = {
            title: EventObject.title,
            content: EventObject.content,
            UserId: EventObject.UserId,
            image: req.files[0].key,
            adresse: EventObject.adresse,
            ville: EventObject.ville,
            date_event: EventObject.date_event,
            heure_debut: EventObject.heure_event,
            heure_fin: EventObject.heure_fin,
        }



        const result = await Events.create(evenement);
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

