import express from "express";
import {getAllNotes} from '../controllers/noteController.js'

import { verifyJWT } from '../middleware/verifyJWT.js'

const router = express.Router()

router.use(verifyJWT)

router.route('/')
    .get(getAllNotes)

export default router 
