import express from 'express';
import {add, getAll, getById, updateById, deleteById} from "../controllers/events.controller.js";
import { verifieToken } from '../utils/auth.js'

import upload from "../config/multerConfig.js"

import * as multerController from "../controllers/multer.controller.js"; 
import  multerS3 from '../middlewares/multerS3.js'


const router = express.Router();


router.post("/add",  multerS3.any(), add);
// Route pour obtenir tous les utilisateurs
router.get("/all", getAll);
// Route pour obtenir un utilisateur spécifique par son ID
router.get("/get/:id", getById);
// Route pour mettre à jour un utilisateur spécifique par son ID
router.put("/update/:id", updateById);
// Route pour supprimer un utilisateur spécifique par son ID
router.delete("/delete/:id", verifieToken, deleteById);


export default router;
