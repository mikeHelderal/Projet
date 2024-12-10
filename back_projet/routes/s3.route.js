import express from 'express';
import {generateSignedUrl} from '../controllers/s3Controller.js';
const router = express.Router();



router.post("/getImage", generateSignedUrl);


export default router;
 