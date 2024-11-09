
import { model } from "mongoose";
import {Comments, Publications, Users} from "../models/index.js";


const add = async (req, res,next) => {
    let profilePicture = ""
    const publicationObject = req.body
    try {
       
        console.log("body => ", req.body);
        console.log("req file => ", req.file );
        if (req.file) {
            const { buffer, originalname } = req.file
            console.log("Jusqu'ici tout va bien...", req.file.originalname)
            const timestamp = Date.now()
            const name = originalname.split(' ').join('_')
            const ref = `${name}-${timestamp}.webp`
            const path = `./uploads/${ref}`
            sharp(buffer).resize(450).webp().toFile(path)
            profilePicture = `${req.protocol}://${req.get('host')}/images/${ref}`
        }

        const publi = {
            idSubject: publicationObject.idSubject,
            title: publicationObject.title,
            resume: publicationObject.resume,
            image: profilePicture,
            content: publicationObject.content
        }
        
       // await Publications.create(req.body),
       // res.status(201).json({message: "Publication added successfully", data: null})
    } catch (error) {
        res.status(500).json({message : "add Publication encountered a problem", data: error});

    }
}
const getAllPubliValider = async (req, res) => {
    try {
        const result = await Publications.findAll({where :
             {is_valid: true},
             include: [{model: Comments, include: [{model: Users}]}]});
        if(!result) return res.status(404).json({message: "Publication not found!", data: null})
        res.status(200).json({message: "get all publication ", data: result});
    } catch (error) {
        res.status(500).json({message : "get all Publication encountered a problem", data: error});
    }
}

const getAllPubliEnAttente = async (req, res) => {
    try {
        const result = await Publications.findAll({where : {is_valid: false,include: [{model: Comments, include: [{model: Users}]}]}});
        if(!result) return res.status(404).json({message: "Publication not found!", data: null})
        res.status(200).json({message: "get all publication ", data: result});
    } catch (error) {
        res.status(500).json({message : "get all Publication encountered a problem", data: error});
    }
}

const getAllPubliEnAttenteByIdUser = async (req, res) => {
    try {
        const result = await Publications.findAll({where :
            {UserId: req.params.UserId, is_valid: false}
            ,include: [{model: Comments, include: [{model: Users}]}]});
        if(!result) return res.status(404).json({message: "Publication not found!", data: null})
        res.status(200).json({message: "get all publication ", data: result});
    } catch (error) {
        res.status(500).json({message : "get all Publication encountered a problem", data: error});
    }
}
const getById = async (req, res) => {
    try {
        const result = await Publications.findByPk(req.params.id);
        if(!result) return res.status(404).json({message: "Publication not found!", data: null})
        res.status(200).json({message: "get publication by id", data: result});
    } catch (error) {
        res.status(500).json({message : "get by id Publication encountered a problem", data: error});
    }
}
const updateById = async (req, res) => {
    try {
        const publication = await Publications.findByPk(req.params.id);
        if(!publication) return res.status(404).json({message: "Publication not found!", data: null})

            publication.is_valid = true;
            const enregistrement = await publication.save();
            const result = await Publications.findAll({where :
                {UserId: publication.UserId, is_valid: false}
                ,include: [{model: Comments, include: [{model: Users}]}]});




        if(!result) return res.status(404).json({message: "Publication not found!", data: null})
        res.status(200).json({message: "Publication has been updated", result});
    } catch (error) {
        res.status(500).json({message : "update by id Publication encountered a problem", data: error});
    }
}
const deleteById = async (req, res) => {
    try {
        const publicationDeleted = await Publications.destroy({where: {id : req.params.id}});
        if (!publicationDeleted) return res.status(404).json({message: "Publication not found !", data: null });
        res.status(200).json({ message: "Publication deleted", data: null });
    } catch (error) {
        res.status(500).json({message : "delete Publication encountered a problem", data: error});
    }
}



export {
    add, getAllPubliValider, getAllPubliEnAttente,getAllPubliEnAttenteByIdUser, getById, updateById, deleteById
}

