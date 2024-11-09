import express from 'express';
import {add, getAllPubliValider, getAllPubliEnAttente,getAllPubliEnAttenteByIdUser, getById, updateById, deleteById} from "../controllers/publications.controller.js";
import { verifieToken } from '../utils/auth.js'


import upload from "../config/multerConfig.js"

import * as multerController from "../controllers/multer.controller.js"; 
const router = express.Router();


router.post("/add", upload, multerController.uploadImage);
// Route pour obtenir tous les utilisateurs
router.get("/all", getAllPubliValider);
router.get("/all/attente", getAllPubliEnAttente);
router.get("/all/attente/user/:UserId", getAllPubliEnAttenteByIdUser);
// Route pour obtenir un utilisateur spécifique par son ID
router.get("/get/:id", getById);
// Route pour mettre à jour un utilisateur spécifique par son ID
router.put("/update/:id", updateById);
// Route pour supprimer un utilisateur spécifique par son ID
router.delete("/delete/:id", verifieToken, deleteById);


export default router;
