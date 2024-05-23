import express from 'express';
import { verifieToken } from '../utils/auth.js';
import { getAll, getById, updateById, deleteById } from "../controllers/subject.controller.js";

const router = express.Router();


// Route pour obtenir tous les utilisateurs
router.get("/all", getAll);
// Route pour obtenir un utilisateur spécifique par son ID
router.get("/get/:id", getById);
// Route pour mettre à jour un utilisateur spécifique par son ID
router.put("/update/:id", verifieToken, updateById);
// Route pour supprimer un utilisateur spécifique par son ID
router.delete("/delete/:id",verifieToken,  deleteById);


export default router;