
import {Reactions_events} from "../models/index.js";
import { Sequelize } from "sequelize";
import { io } from "../Services/Socket.js";



const add = async (req, res) => {
    try {
        const result = await Reactions_events.create( req.body);
        io.emit('newReactionEvents', result);
        res.status(201).json({message : "Reactions_events has been added", data: result});
        } catch (error) {
        res.status(500).json({message : "add Reactions_events encountered a problem", data: error});
    }
}
const getAll = async (req, res) => {
    try {

        const result = await Reactions_events.findAll({
            attributes: [
              'EventId',
              'TypeId',// We had to list all attributes...
              [Sequelize.fn('COUNT', Sequelize.col('EventId')), 'nombre'], // To add the aggregation...
            ],
            group: ['EventId', 'TypeId'],
          });
        if(result.length == 0){
            res.status(200).json({message:"void", data: result});
        }else{
            res.status(200).json({message:"get all reaction event", data: result});
        }
        
    } catch (error) {
        res.status(500).json({message : "get all events  encountered a problem", data: error});
    }
}
const getById = async (req, res) => {
    try {
        const reactions_events = await Reactions_events.findByPk(req.params.id);
        if(!reactions_events) return res.status(404).json({message:"Reactions_events not found!", data: null});
        res.status(200).json({message: "", data: reactions_events});
    } catch (error) {
        res.status(500).json({message : "get by id Reactions_events encountered a problem", data: error});
    }
}

const getByIdUser = async (req, res) => {
    try {
        const reactions = await Reactions_events.findAll({where : {UserId: req.params.id}});
        if(!reactions) return res.status(200).json({message: "Reactions_events not found!", data: null});
        res.status(200).json({ message: "your Reaction Event has been send", data:  reactions});

    } catch (error) {
        res.status(500).json( {message: "une erreur est parvenue !", data: null});

    }
}

const getNumberLikeEvent = async (req,res) => {
    try {
        const result = await Reactions_events.findAll({where : {EventId: req.params.id}});
        //if(!result) return res.status(404).json({message: "Reactions_events not found!", data: ""});
        res.status(200).json({message: "nombre de like", data: result.length});

    } catch (error) {
        res.status(500).json({message : "get number like event encountered a problem", data: error});

    }
}

const countLike = async (req, res) => {
    try {
        const result = await Reactions_events.count({where : {EventId : req.params.id, TypeId: 1}})
        io.emit("nblike", result)
        res.status(201).json({message : "get number of like",data: result});

    } catch (error) {
        res.status(500).json({message : "get number of like encountered a problem", data: error});         

    }
}

const countUnlike = async (req, res) => {
    try {
        const result = await Reactions_events.count({where : {EventId : req.params.id, TypeId: 2}})
        io.emit("nbunlike", result)
        res.status(201).json({message : "get number of like",data: result});

    } catch (error) {
        res.status(500).json({message : "get number of like encountered a problem", data: error});         

    }
}

const updateById = async (req, res) => {
    try {
        const reaction = await Reactions_events.findByPk(req.params.id);
        if(!reaction) return res.status(404).json({message: "Reactions_events not found!", data: null});
        if(reaction.TypeId == 1){
            try {
                reaction.TypeId = 2;
                const result = await reaction.save();
                const response = await Reactions_events.findAll({
                    attributes: [
                        'EventId',
                        'TypeId',// We had to list all attributes...
                        [Sequelize.fn('COUNT', Sequelize.col('EventId')), 'nombre'], // To add the aggregation...
                    ],
                    group: ['EventId', 'TypeId'],
            });
            
            io.emit("getNbReactionE", response);
            res.status(200).json({message: "Reactions event has been updated!", data: result.dataValues});
            } catch (error) {
            }
            
        }else if(reaction.TypeId == 2){
            try {
                reaction.TypeId = 1;
            const result = await reaction.save();
            const response = await Reactions_events.findAll({
                attributes: [
                    'EventId',
                    'TypeId',// We had to list all attributes...
                    [Sequelize.fn('COUNT', Sequelize.col('EventId')), 'nombre'], // To add the aggregation...
                ],
                group: ['EventId', 'TypeId'],
            });
            
            io.emit("getNbReactionE", response);
            res.status(200).json({message: "Reactions event has been updated!", data: result.dataValues});
            } catch (error) {
            }            
        }       
    } catch (error) {
        res.status(500).json({message : "update Reactions event encountered a problem", data: error});
    }
}
const deleteById = async (req, res) => {
    try {
        const reactions_eventsDeleted = await Reactions_events.destroy({where : {id : req.params.id}});
        if(!reactions_eventsDeleted) return res.status(404).json({message:"Reactions_events not found!", data: null });
        res.status(200).json( {message: "Reactions_events has been deleted!", data: null});

    } catch (error) {
        res.status(500).json({message : "delete Reactions_events encountered a problem", data: error});
    }
}



export {
    add, getAll, getById, updateById,getByIdUser ,countLike, countUnlike,  deleteById
}

