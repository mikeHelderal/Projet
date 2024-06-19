
import {Types} from "../models/index.js";

const getAll = async (req, res) => {
    try {
        const Types = await Types.findAll();
        res.status(200).json(Types);
    } catch (error) {
        console.log(error);
    }
}
const getById = async (req, res) => {
    try {
        const Types = await Types.findByPk(req.params.id);
        res.status(200).json(Types);
    } catch (error) {
        console.log(error);
    }
}
const updateById = async (req, res) => {
    try {
        const Types = await Types.findByPk(req.params.id);
        if(!Types) return res.status(404).json("Types not found!");
        await Types.update(req.body);
        res.status(200).json({message: "Types has been updated!", Types});
    } catch (error) {
        console.log(error);
    }
}
const deleteById = async (req, res) => {
    try {
        const TypesDeleted = await Types.destroy({where : {id : req.params.id}});
        if(!TypesDeleted) return res.status(404).json("Types not found!");
        res.status(200).json( {message: "Types has been deleted!"});
    } catch (error) {
        console.log(error);
    }
}



export {
     getAll, getById, updateById, deleteById
}

