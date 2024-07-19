
import {Publications} from "../models/index.js";
import multer from 'multer'


const add = async (req, res) => {
    try {
        console.log("body => ", req.body);
        console.log("req file => ", req.file );
        //await Publications.create(req.body),
        //res.status(201).json({message: "Publication added successfully"})
    } catch (error) {
        console.log(error);
    }
}
const getAll = async (req, res) => {
    try {
        const publications = await Publications.findAll();
        res.status(200).json(publications);
    } catch (error) {
        console.log(error);
    }
}
const getById = async (req, res) => {
    try {
        const publication = await Publications.findByPk(req.params.id);
        res.status(200).json(publication);
    } catch (error) {
        console.log(error);
    }
}
const updateById = async (req, res) => {
    try {
        const publication = await Publications.findByPk(req.params.id);
        if(!publication) return res.status(404).json("Publication not found!")
        await publication.update(req.body);
        res.status(200).json({message: "Publication has been updated", publication});

    } catch (error) {
        console.log(error);
    }
}
const deleteById = async (req, res) => {
    try {
        const publicationDeleted = await Publications.destroy({where: {id : req.params.id}});
        if (!publicationDeleted) return res.status(404).json("Publication not found !");
        res.status(200).json({ message: "Publication deleted" });
    } catch (error) {
        
    }
}



export {
    add, getAll, getById, updateById, deleteById
}

