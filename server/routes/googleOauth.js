import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express'
import mongoose from 'mongoose'
const router = express.Router()

const auth = getAuth();
router.post('/login-google', (req, res) => {
    
})

export default router;