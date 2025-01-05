import { NextFunction, Request, Response } from "express"
import { createUser, getAllUser } from "../models/userModel"
import bcrypt from "bcryptjs"



export const createAUserController=async(req:Request, res:Response, next:NextFunction)=>{
    const {name,email,password,role}=req.body
    try {

        const salt=await bcrypt.genSalt(10)

        const hashedPassword=await bcrypt.hash(password, salt)
        const createdUser= await createUser(name,email,role,hashedPassword)

        res.status(201).json({
            status:201,
            message:"User created!",
            data:createdUser
        })
    } catch (error) {
        console.log(error)
    }
}

export const getAllUserController=async(req:Request, res:Response,next:NextFunction)=>{
    try {
        const users= await getAllUser()

        res.status(200).json({
            status:200,
            message:"Users fetched!",
            data:users
        })
    } catch (error) {
        console.log(error)
    }
}