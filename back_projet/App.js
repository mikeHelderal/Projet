import express from 'express'
import { env } from './config/config.js';
import cookieParser from 'cookie-parser'
import cors from 'cors'

// Connexion MySQL
import './models/index.js'

// // ROUTES
// import routerArticle from './routes/article.js'
// import routerAvis from './routes/avis.js'
import routerUser from './routes/users.route.js';
import routerPublication from './routes/publications.route.js';
import routerEvenement from './routes/events.route.js';
import routerComment from './routes/comments.route.js';
import routerReactionEvents from './routes/reactions_events.route.js';
import routerReactionPublication from './routes/reactions_publications.route.js';
import routerTypes from './routes/types.route.js';
import bodyParser from 'body-parser';
//import bodyParser from 'body-parser';

import path from 'path';
import { fileURLToPath } from 'url';

const app = express()
// MIDDLEWARE
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.text({type: '/'}));

// CORS
app.use(cors({
        origin: env.CORS_ORIGIN, //  <- port React. Ex: 'http://localhost:3000'
        credentials: true,
        methods: ['GET', 'PUT', 'POST', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
}))


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", true);
  return next();
});

// STATIC FILES
app.use('/uploads', express.static('./uploads')); // <- Ici, on valide les images (static files)

// MIDDLEWARE TO ROUTE
// app.use("/api/article", routerArticle)
// app.use("/api/avis", routerAvis)
app.use("/api/user", routerUser);
app.use("/api/publication", routerPublication);
app.use("/api/evenement", routerEvenement);
app.use("/api/comment", routerComment);
app.use("/api/reaction_events", routerReactionEvents);
app.use("/api/reaction_publication", routerReactionPublication);
app.use("/api/type", routerTypes);





export default app ;