
import {Types} from "../models/index.js";

const getAll = async (req, res) => {
    try {
        const result = await Types.findAll();
        if(!result) return res.status(404).json({message: "types not found!", data: null});
        res.status(200).json({message: "get all types", data: result});
    } catch (error) {
        res.status(500).json({message : "get all type  encountered a problem", data: error});
    }
}
const getById = async (req, res) => {
    try {
        const result = await Types.findByPk(req.params.id);
        if(!result) return res.status(404).json({message: "Subject not found!", data: null});
        res.status(200).json({message: "get by id", data: result});
    } catch (error) {
        res.status(500).json({message : "get by id typr encountered a problem", data: error});
    }
}
const updateById = async (req, res) => {
    try {
        const response = await Types.findByPk(req.params.id);
        if(!response) return res.status(404).json({message: "Types not found!", data: null });
        const result = await response.update(req.body);
        res.status(200).json({message: "Types has been updated!",data: result});
    } catch (error) {
        res.status(500).json({message : "update by id type encountered a problem", data: error});
    }
}
const deleteById = async (req, res) => {
    try {
        const TypesDeleted = await Types.destroy({where : {id : req.params.id}});
        if(!TypesDeleted) return res.status(404).json("Types not found!");
        res.status(200).json( {message: "Types has been deleted!"});
    } catch (error) {
        res.status(500).json({message : "delete by id type encountered a problem", data: error});
    }
}



export {
     getAll, getById, updateById, deleteById
}

