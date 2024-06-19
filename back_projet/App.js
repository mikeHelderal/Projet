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
import routerSubject from './routes/subjects.route.js';
import routerPublication from './routes/publications.route.js';
import routerNews from './routes/news.route.js'
import routerNeighbordhood from './routes/neighbordhoods.route.js';
import routerEvenement from './routes/events.route.js';
import routerComment from './routes/comments.route.js';
import routerCity from './routes/cities.route.js';
import routerReactionEvents from './routes/reactions_events.route.js';
import routerReactionPublication from './routes/reactions_publications.route.js';
import routerTypes from './routes/types.route.js';
import routerResponse from './routes/response.route.js';
import routerMessages from './routes/messages.route.js';


const app = express()



// MIDDLEWARE
app.use(express.json())
app.use(cookieParser())
app.use(cors())

// MIDDLEWARE TO ROUTE
// app.use("/api/article", routerArticle)
// app.use("/api/avis", routerAvis)
app.use("/api/user", routerUser);
app.use("/api/subject", routerSubject);
app.use("/api/publication", routerPublication);
app.use("/api/news", routerNews);
app.use("/api/neighborhood", routerNeighbordhood);
app.use("/api/evenement", routerEvenement);
app.use("/api/comment", routerComment);
app.use("/api/city", routerCity);

export default app ;