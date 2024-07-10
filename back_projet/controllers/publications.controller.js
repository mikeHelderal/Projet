
import {Publications} from "../models/index.js";

const add = async (req, res) => {
    try {
        console.log(res.body)
        await Publication.create(req.body),
        res.status(201).json({message: "Publication added successfully"})
    } catch (error) {
        console.log(error);
    }
}
const getAll = async (req, res) => {
    try {
        const publications = await Publication.findAll();
        res.status(200).json(publications);
    } catch (error) {
        console.log(error);
    }
}
const getById = async (req, res) => {
    try {
        const publication = await Publication.findByPk(req.params.id);
        res.status(200).json(publication);
    } catch (error) {
        console.log(error);
    }
}
const updateById = async (req, res) => {
    try {
        const publication = await Publication.findByPk(req.params.id);
        if(!publication) return res.status(404).json("Publication not found!")
        await publication.update(req.body);
        res.status(200).json({message: "Publication has been updated", publication});

    } catch (error) {
        console.log(error);
    }
}
const deleteById = async (req, res) => {
    try {
        const publicationDeleted = await Publication.destroy({where: {id : req.params.id}});
        if (!publicationDeleted) return res.status(404).json("Publication not found !");
        res.status(200).json({ message: "Publication deleted" });
    } catch (error) {
        
    }
}



export {
    add, getAll, getById, updateById, deleteById
}

