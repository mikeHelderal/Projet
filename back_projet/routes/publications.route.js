import express from 'express';
import {add, getAll, getById, updateById, deleteById} from "../controllers/publications.controller.js";
import { verifieToken } from '../utils/auth.js'
import multer from 'multer'

const upload = multer({dest: 'uploads/'})

const router = express.Router();


router.post("/add", upload.single('image'), add);
// Route pour obtenir tous les utilisateurs
router.get("/all", getAll);
// Route pour obtenir un utilisateur spécifique par son ID
router.get("/get/:id", getById);
// Route pour mettre à jour un utilisateur spécifique par son ID
router.put("/update/:id", verifieToken, updateById);
// Route pour supprimer un utilisateur spécifique par son ID
router.delete("/delete/:id", verifieToken, deleteById);


export default router;
