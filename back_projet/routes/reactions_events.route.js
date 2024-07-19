import express from 'express';
import {add,  getAll, getById, deleteById, getByIdUser} from "../controllers/reactions_events.controller.js";
import { verifieToken } from '../utils/auth.js'

const router = express.Router();

router.post("/add", add);

// Route pour obtenir tous les utilisateurs
router.get("/all", getAll);
// Route pour obtenir un utilisateur spécifique par son ID
router.get("/get/:id", getById);

router.get("getByUser/:id", getByIdUser);

// Route pour supprimer un utilisateur spécifique par son ID
router.delete("/delete/:id", verifieToken, deleteById);


export default router;
