import { Sequelize } from "sequelize";
import express from 'express';
import { env } from '../config/config.js';
import connection from "../config/DatabaseConfig.js";



// IMPORT MODEL
import CommentsModel from "./comments.model.js";
import eventsModel from "./events.model.js";
import publicationsModel from "./publications.model.js";
import usersModel from "./users.model.js";
import reactions_eventsModel from "./reactions_events.model.js";
import reactions_publicationsModel from "./reactions_publications.model.js";
import typesModel from "./types.model.js";



CommentsModel(connection, Sequelize);
eventsModel(connection, Sequelize);
publicationsModel(connection, Sequelize);
usersModel(connection, Sequelize);
reactions_eventsModel(connection, Sequelize);
reactions_publicationsModel(connection, Sequelize);
typesModel(connection, Sequelize);

const {
    
    Comments,
    Events,
    Publications,
    Users,
    Reactions_events,
    Reactions_publications,
    Types
} = connection.models;

//LIEN BDD reaction message response

/// COMMENTS


//EVENTS
Events.hasMany(Reactions_events);
Reactions_events.belongsTo(Events);


///PUBLICATION
Publications.hasMany(Comments);
Comments.belongsTo(Publications);
Publications.hasMany(Reactions_publications);
Reactions_publications.belongsTo(Publications);


///USER
Users.hasMany(Events);
Events.belongsTo(Users);

Users.hasMany(Comments);
Comments.belongsTo(Users);

Users.hasMany(Publications);
Publications.belongsTo(Users);


Users.hasMany(Reactions_events);
Reactions_events.belongsTo(Users);

Users.hasMany(Reactions_publications);
Reactions_publications.belongsTo(Users);

///TYPES
Types.hasMany(Reactions_events);
Reactions_events.belongsTo(Types);

Types.hasMany(Reactions_publications);
Reactions_publications.belongsTo(Types);




await connection.sync()

console.log('Synchro OK');

export {
    Comments,
    Events,
    Publications,
    Users,
    Reactions_events,
    Reactions_publications,
    Types,
    

}