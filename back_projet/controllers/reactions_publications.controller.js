
import {Reactions_publications} from "../models/index.js";
import { io } from "../Services/Socket.js";



const add = async (req, res) => {
    try {
        const result = await Reactions_publications.create( req.body);
        io.emit("newReactionPublication", result);
        if(req.body.TypeId == 1){
            const response = await Reactions_publications.count({where : {PublicationId : req.body.PublicationId, TypeId: 1}})
            io.emit("nblike", response);
        }else {
            const response = await Reactions_publications.count({where : {PublicationId : req.body.PublicationId, TypeId: 2}})
            io.emit("nbunlike", response);
        }
        
        res.status(201).json({message : "Reactions_events has been added",data: result});
        } catch (error) {
        res.status(500).json({message : "get all events message encountered a problem", data: error});         
    }
}

const countLike = async (req, res) => {
    try {
        const result = await Reactions_publications.count({where : {PublicationId : req.params.id, TypeId: 1}})
        io.emit("nblike", result)
        res.status(201).json({message : "get number of like",data: result});

    } catch (error) {
        res.status(500).json({message : "get number of like encountered a problem", data: error});         

    }
}

const countUnlike = async (req, res) => {
    try {
        const result = await Reactions_publications.count({where : {PublicationId : req.params.id, TypeId: 2}})
        io.emit("nbunlike", result)
        res.status(201).json({message : "get number of like",data: result});

    } catch (error) {
        res.status(500).json({message : "get number of like encountered a problem", data: error});         

    }
}
const getAll = async (req, res) => {
    try {
        const result = await Reactions_publications.findAll();
        if(result.length == 0){
            res.status(200).json({message:"void", data: result});
        }else{
            res.status(200).json({message:"get all", data: result});
        }
        
    } catch (error) {
        res.status(500).json({message : "get all events message encountered a problem", data: error});
    }
}

const getNumberLikePublication = async (req,res) => {
    try {
        const result = await Reactions_publications.findAll({where : {PublicationId: req.params.id}});
        //if(!result) return res.status(404).json({message: "Reactions_events not found!", data: ""});
        res.status(200).json({message: "nombre de like", data: result.length});

    } catch (error) {
        res.status(500).json({message : "get all events message encountered a problem", data: error});

    }
}

const getById = async (req, res) => {
    try {
        const result = await Reactions_publications.findByPk(req.params.id);
        res.status(200).json({message:"get by id", data: result});
    } catch (error) {
        res.status(500).json({message : "get all events message encountered a problem", data: error});
    }
}


const getByIdUser = async (req, res) => {
    try {
        const result = await Reactions_publications.findAll({where : {UserId: req.params.id}});
        if(!result) return res.status(404).json({message: "Reactions_events not found!", data: ""});
        res.status(200).json({ message: "your Reaction Publication has been send", data:  result});

    } catch (error) {
        res.status(500).json( {message: "une erreur est parvenue !", data:""});

    }
}

const updateById = async (req, res) => {
    try {
        const reaction = await Reactions_publications.findByPk(req.params.id);
        if(!reaction) return res.status(404).json({message: "Reactions_publications not found!", data: null});
        console.log("avant save => ");
        if(reaction.TypeId == 1){
            try {
                reaction.TypeId = 2;
            const result = await reaction.save();
            console.log("apres save => ")
            console.log("avant res => ",result.dataValues);
            res.status(200).json({message: "Reactions publications has been updated!", data: result.dataValues});
            } catch (error) {
                console.log("ERROR => ",error);
            }
            
        }else if(reaction.TypeId == 2){
            try {
                reaction.TypeId = 1;
            const result = await reaction.save();
            console.log("apres save => ");
            console.log("avant res => ",result.dataValues);
            res.status(200).json({message: "Reactions publications has been updated!", data: result.dataValues});
            } catch (error) {
                console.log("ERROR => ", error);
            }
            
        }
       
    } catch (error) {
        res.status(500).json({message : "update Reactions publications encountered a problem", data: error});
    }
}
const deleteById = async (req, res) => {
    try {
        const result = await Reactions_publications.destroy({where : {id : req.params.id}});
        if(!result) return res.status(404).json({message: "Reactions publications not found!"});
        res.status(200).json( {message: "Reactions_publications has been deleted!"});

    } catch (error) {
        res.status(500).json({message : "get all events message encountered a problem", data: error});
    }
}



export {
    add, getAll, getById, getByIdUser, countLike, countUnlike,  updateById, deleteById
}

