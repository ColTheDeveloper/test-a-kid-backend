import dotenv from "dotenv"
import express from "express"
import createUserTable from "../data/createUserTable"
import userRoute from "../routes/userRoutes"
import "../config/db"



dotenv.config()
const app=express()

app.use(express.json())


createUserTable()

app.use("/api/user",userRoute)




export default app