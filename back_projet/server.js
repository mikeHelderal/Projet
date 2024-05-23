import express from 'express'
import { env } from './config.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

// Connexion MySQL
import './models/index.js'

// // ROUTES
// import routerArticle from './routes/article.js'
// import routerAvis from './routes/avis.js'
import routerUser from './routes/user.route.js';
import routerSubject from './routes/subject.route.js';
import routerPublication from './routes/publication.route.js';
import routerNews from './routes/news.route.js';
import routerNeighbordhood from './routes/neighbordhood.route.js';
import routerEvenement from './routes/evenement.route.js';
import routerComment from './routes/comment.route.js';
import routerCity from './routes/city.route.js';


const app = express()

// PORT
const PORT = env.port || 8080


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

// LISTEN
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
})