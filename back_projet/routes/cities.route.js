import express from 'express';
import {add,  getAll, getById, getNeighbordhoods, deleteById} from "../controllers/cities.controller.js";
import { verifieToken } from '../utils/auth.js'

const router = express.Router();

router.post("/add", add);

// Route pour obtenir tous les utilisateurs
router.get("/all", getAll);
// Route pour obtenir un utilisateur spécifique par son ID
router.get("/get/:id", getById);

router.get("/getNeighborhoods/:id", getNeighbordhoods);


// Route pour supprimer un utilisateur spécifique par son ID
router.delete("/delete/:id", verifieToken, deleteById);


export default router;
