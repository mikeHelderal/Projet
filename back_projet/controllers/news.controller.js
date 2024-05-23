
import {Neighbordhood, News} from "../models/index.js";

const add = async (req, res) => {
    try {
        await News.create(req.body),
        //        const avis = await Avis.create({ ...req.body, user: req.user.id })

        res.status(201).json({message: "News added successfully"})
    } catch (error) {
        console.log(error);
    }
}
const getAll = async (req, res) => {
    try {
        const news = await News.findAll();
        res.status(200).json(news);
    } catch (error) {
        console.log(error);
    }
}
const getById = async (req, res) => {
    try {
        const news = await News.findByPk(req.params.id);
        res.status(200).json(news);
    } catch (error) {
        console.log(error);
    }
}
const updateById = async (req, res) => {
    try {
        const news = await News.findByPk(req.params.id);
        if(!news) return res.status(404).json("News not found!")
        await news.update(req.body);
        res.status(200).json({message: "News has been updated", news});

    } catch (error) {
        console.log(error);
    }
}
const deleteById = async (req, res) => {
    try {
        const newsDeleted = await News.destroy({where: {id : req.params.id}});
        if (!newsDeleted) return res.status(404).json("News not found !");
        res.status(200).json({ message: "News deleted" });
    } catch (error) {
        
    }
}


export {
    add, getAll, getById, updateById, deleteById
}

