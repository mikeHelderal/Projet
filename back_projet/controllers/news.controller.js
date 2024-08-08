
import { News} from "../models/index.js";

const add = async (req, res) => {
    try {
        await News.create(req.body),
        //        const avis = await Avis.create({ ...req.body, user: req.user.id })
        res.status(201).json({message: "News added successfully", data: null})
    } catch (error) {
        res.status(500).json({message : "add News encountered a problem", data: error});
    }
}
const getAll = async (req, res) => {
    try {
        const result = await News.findAll();
        if(!result) return res.status(404).json({message: "News not found!", data: null});
        res.status(200).json({message: "get all news", data: result});
    } catch (error) {
        res.status(500).json({message : "get all News encountered a problem", data: error});
    }
}
const getById = async (req, res) => {
    try {
        const result = await News.findByPk(req.params.id);
        if(!result) return res.status(404).json({message: "News not found!", data: null});
        res.status(200).json({message: "get by id", data: news});
    } catch (error) {
        res.status(500).json({message : "get by id  News encountered a problem", data: error});
    }
}
const updateById = async (req, res) => {
    try {
        const news = await News.findByPk(req.params.id);
        if(!news) return res.status(404).json("News not found!")
        const result = await news.update(req.body);
        if(!result) return res.status(404).json({message: "News not found!", data: null});
        res.status(200).json({message: "News has been updated", data: result});
    } catch (error) {
        res.status(500).json({message : "update by id News encountered a problem", data: error});
    }
}
const deleteById = async (req, res) => {
    try {
        const newsDeleted = await News.destroy({where: {id : req.params.id}});
        if (!newsDeleted) return res.status(404).json({message: "News not found !", data: null});
        res.status(200).json({ message: "News deleted", data: null });
    } catch (error) {
        res.status(500).json({message : "delete News encountered a problem", data: error});
    }
}


export {
    add, getAll, getById, updateById, deleteById
}

