import express from "express"
import {  createAUserController, getAllUserController } from "../controllers/userControllers"

const router= express.Router()

router.post("/",createAUserController)

router.get("/",getAllUserController)



export default router