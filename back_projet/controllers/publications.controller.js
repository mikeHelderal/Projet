
import { model } from "mongoose";
import {Comments, Publications, Users} from "../models/index.js";


const add = async (req, res,next) => {
    const publicationObject = req.body
    try {
        const publi = {
            title: publicationObject.title,
            resume: publicationObject.resume,
            image: req.files[0].key,
            content: publicationObject.content,
            UserId: publicationObject.UserId
        }

        console.log("PUBLI ==> ",publi);
        
        await Publications.create(publi),
        res.status(201).json({message: "Publication added successfully", data: null})
    } catch (error) {
        res.status(500).json({message : "add Publication encountered a problem", data: error});

    }
}

const getAllPubli = async (req, res) => {
    try {
        console.log("COOKIES ==> ",req.cookies);
        const result = await Publications.findAll();
        if(!result) return res.status(404).json({message: "Publication not found!", data: null})
        res.status(200).json({message: "get all publication ", data: result});
    } catch (error) {
        res.status(500).json({message : "get all Publication encountered a problem", data: error});
    }
}

const getAllPubliValider = async (req, res) => {
    try {
        console.log("COOKIES ==> ",req.cookies);
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
            const result = await Publications.findAll();




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
    add, getAllPubli, getAllPubliValider, getAllPubliEnAttente,getAllPubliEnAttenteByIdUser, getById, updateById, deleteById
}

