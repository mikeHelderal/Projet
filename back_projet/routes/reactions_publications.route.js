import express from 'express';
import {add,  getAll, getById,getByIdUser,countLike, countUnlike, updateById,  deleteById} from "../controllers/reactions_publications.controller.js";
import { verifieToken } from '../utils/auth.js'

const router = express.Router();

router.post("/add", add);

// Route pour obtenir tous les utilisateurs
router.get("/all", getAll);
// Route pour obtenir un utilisateur spécifique par son ID
router.get("/get/:id", getById);

router.get("/get/user/:id", getByIdUser)

router.put("/update/:id", updateById)
router.get("/get/nblike/:id", countLike)

router.get("/get/nbunlike/:id", countUnlike)



// Route pour supprimer un utilisateur spécifique par son ID
router.delete("/delete/:id", deleteById);


export default router;
