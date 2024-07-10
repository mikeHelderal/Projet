import { Sequelize } from "sequelize";
import express from 'express';
import { env } from '../config/config.js';
import connection from "../config/DatabaseConfig.js";



// IMPORT MODEL
import citiesModel from "./cities.model.js";
import CommentsModel from "./comments.model.js";
import eventsModel from "./events.model.js";
import neighbordhoodsModel from "./neighbordhoods.model.js";
import newsModel  from "./news.model.js";
import publicationsModel from "./publications.model.js";
import subjectsModel from "./subjects.model.js";
import usersModel from "./users.model.js";
import reactions_eventsModel from "./reactions_events.model.js";
import reactions_publicationsModel from "./reactions_publications.model.js";
import typesModel from "./types.model.js";
import responseModel from "./response.model.js";
import messagesModel from "./messages.model.js";



citiesModel(connection, Sequelize);
CommentsModel(connection, Sequelize);
eventsModel(connection, Sequelize);
neighbordhoodsModel(connection, Sequelize);
newsModel(connection, Sequelize);
publicationsModel(connection, Sequelize);
subjectsModel(connection, Sequelize);
usersModel(connection, Sequelize);
reactions_eventsModel(connection, Sequelize);
reactions_publicationsModel(connection, Sequelize);
typesModel(connection, Sequelize);
responseModel(connection, Sequelize);
messagesModel(connection, Sequelize);

const {
    Cities,
    Comments,
    Events,
    Neighbordhoods,
    News,
    Publications,
    Subjects,
    Users,
    Reactions_events,
    Reactions_publications,
    Types,
    Response,
    Messages
} = connection.models;

//LIEN BDD reaction message response

///Cities
Cities.hasMany(Neighbordhoods);
Neighbordhoods.belongsTo(Cities);

/// COMMENTS


//EVENTS
Events.hasMany(Reactions_events);
Reactions_events.belongsTo(Events);

///NEIGHBORDHOOD
Neighbordhoods.hasMany(Events);
Events.belongsTo(Neighbordhoods);
Neighbordhoods.hasMany(News);
News.belongsTo(Neighbordhoods);

///PUBLICATION
Publications.hasMany(Comments);
Comments.belongsTo(Publications);
Publications.hasMany(Reactions_publications);
Reactions_publications.belongsTo(Publications);

///SUBJECT
Subjects.hasMany(Publications);
Publications.belongsTo(Subjects);
Subjects.hasMany(Users);
Users.belongsTo(Subjects);

///USER
Users.hasMany(Events);
Events.belongsTo(Users);

Users.hasMany(Comments);
Comments.belongsTo(Users);

Users.hasMany(Publications);
Publications.belongsTo(Users,);

Users.hasMany(News);
News.belongsTo(Users);

Users.hasMany(Reactions_events);
Reactions_events.belongsTo(Users);

Users.hasMany(Reactions_publications);
Reactions_publications.belongsTo(Users);

///TYPES
Types.hasMany(Reactions_events);
Reactions_events.belongsTo(Types);

Types.hasMany(Reactions_publications);
Reactions_publications.belongsTo(Types);


//MESSAGES
Messages.hasMany(Response);
Response.belongsTo(Messages);



await connection.sync()

console.log('Synchro OK');

export {
    Cities,
    Comments,
    Events,
    Neighbordhoods,
    News,
    Publications,
    Subjects,
    Users,
    Reactions_events,
    Reactions_publications,
    Types,
    Response,
    Messages

}