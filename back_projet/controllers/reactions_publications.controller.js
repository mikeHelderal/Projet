
import {Reactions_publications} from "../models/index.js";
import { io } from "../Services/Socket.js";



const add = async (req, res) => {
    try {
          const result = await Reactions_publications.create( req.body);
          io.emit("newReactionPublication", result);
         res.status(201).json({message : "Reactions_events has been added", result});
        } catch (error) {
         console.log(error);
         
    }
}

const getAll = async (req, res) => {
    try {
        const Reactions_publications = await Reactions_publications.findAll();
        res.status(200).json(Reactions_publicationss);
    } catch (error) {
        console.log(error);
    }
}
const getById = async (req, res) => {
    try {
        const Reactions_publications = await Reactions_publications.findByPk(req.params.id);
        res.status(200).json(Reactions_publications);
    } catch (error) {
        console.log(error);
    }
}
const updateById = async (req, res) => {
    try {
        const Reactions_publications = await Reactions_publications.findByPk(req.params.id);
        if(!Reactions_publications) return res.status(404).json("Reactions_publications not found!");
        const result = await Reactions_publications.update(req.body);
        io.emit("updateReactionPublication",result);
        res.status(200).json({message: "Reactions_publications has been updated!", Reactions_publications});
    } catch (error) {
        console.log(error);
    }
}
const deleteById = async (req, res) => {
    try {
        const Reactions_publicationsDeleted = await Reactions_publications.destroy({where : {id : req.params.id}});
        if(!Reactions_publicationsDeleted) return res.status(404).json("Reactions_publications not found!");
        res.status(200).json( {message: "Reactions_publications has been deleted!"});

    } catch (error) {
        console.log(error);
    }
}



export {
    add, getAll, getById, updateById, deleteById
}

