import { Sequelize } from "sequelize";
import express from 'express'
import { env } from './config.js'



// IMPORT MODEL
import cityModel from "./city.model.js";
import commentModel from "./comment.model.js";
import evenementModel  from "./evenement.model.js";
import neighbordhoodModel  from "./neighbordhood.model.js";
import newsModel  from "./news.model.js";
import publicationModel  from "./publication.model.js";
import subjectModel  from "./subject.model.js";
import userModel  from "./user.model.js";




cityModel(connection, Sequelize);
commentModel(connection, Sequelize);
evenementModel(connection, Sequelize);
neighbordhoodModel(connection, Sequelize);
newsModel(connection, Sequelize);
publicationModel(connection, Sequelize);
subjectModel(connection, Sequelize);
userModel(connection, Sequelize);

const {
    City,
    Comment,
    Evenement,
    Neighbordhood,
    News,
    Publication,
    Subject,
    User
} = connection.models;

//LIEN BDD 

///CITY
City.hasMany(Evenement, { as: 'events' });
Evenement.belongsTo(City);
City.hasMany(Neighbordhood, { as :"hood" });
Neighbordhood.belongsTo(City);

///NEIGHBORDHOOD
Neighbordhood.hasMany(Evenement, { as: 'events' });
Evenement.belongsTo(Neighbordhood);
Neighbordhood.hasMany(News, { as: 'news' });
News.belongsTo(Neighbordhood);

///PUBLICATION
Publication.hasMany(Comment, { as: 'comments' });
Comment.belongsTo(Publication);

///SUBJECT
Subject.hasMany(Publication, { as: 'publications' });
Publication.belongsTo(Subject);
Subject.hasMany(User, {as : "specialists"});
User.belongsTo(Subject);

///USER
User.hasMany(Evenement, {as : "events"});
Evenement.belongsTo(User);
User.hasMany(Comment, {as : "comments"});
Comment.belongsTo(User);
User.hasMany(Publication, {as : "publications"});
Publication.belongsTo(User,);
User.hasMany(News, {as : "news"});
News.belongsTo(User);


await connection.sync()

console.log('Synchro OK');

export {
    City,
    Comment,
    Evenement,
    Neighbordhood,
    News,
    Publication,
    Subject,
    User
}