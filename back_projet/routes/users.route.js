import express from 'express';
import {signUp, login, getAll, getById, updateById, deleteById} from "../controllers/users.controller.js";
import { verifieToken } from '../utils/auth.js'
import { verifieAdmin } from '../utils/auth.js'


const router = express.Router();


router.post("/login", login);
router.post("/signUp", signUp);
// Route pour obtenir tous les utilisateurs
router.get("/all",  getAll);
// Route pour obtenir un utilisateur spécifique par son ID
router.get("/get/:id", verifieToken, getById);
// Route pour mettre à jour un utilisateur spécifique par son ID
router.put("/update/:id", updateById);
// Route pour supprimer un utilisateur spécifique par son ID
router.delete("/delete/:id", verifieToken, deleteById);


export default router;
