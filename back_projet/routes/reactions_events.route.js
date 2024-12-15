import express from 'express';
import {add,  getAll, getById,updateById,countLike, countUnlike, deleteById, getByIdUser, getNumberLikeEvent} from "../controllers/reactions_events.controller.js";
import { verifieToken } from '../utils/auth.js'

const router = express.Router();

router.post("/add", add);

// Route pour obtenir tous les utilisateurs
router.get("/all", getAll);
// Route pour obtenir un utilisateur spécifique par son ID
router.get("/get/:id", getById);

router.get("/getByUser/:id", getByIdUser);
router.put("/update/:id", updateById);

router.get("/get/nblike/:id", countLike)

router.get("/get/nbunlike/:id", countUnlike)

router.get("/get/reactionEvent/:id", getNumberLikeEvent);


// Route pour supprimer un utilisateur spécifique par son ID
router.delete("/delete/:id/:EventId", deleteById);


export default router;
