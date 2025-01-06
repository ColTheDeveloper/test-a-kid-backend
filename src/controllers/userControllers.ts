import { NextFunction, Request, Response } from "express"
import { createUser, getAllUser } from "../models/userModel"
import bcrypt from "bcryptjs"
import { createError } from "../middlewares/errorMiddleware"
import pool from "../config/db"
import jwt from "jsonwebtoken"



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

export const loginAUserController=async(req:Request, res:Response,next:NextFunction)=>{
    const {email,password}=req.body

    if(!email || !password) return next(createError(400,'Email and password are required!'))
    try {
        const query='SELECT * FROM users WHERE email=$1'
        const result= await pool.query(query,[email])

        if (result.rows.length === 0) return next(createError(401,"User not found!"))
        const user = result.rows[0];

        const isPassword= await bcrypt.compare(password, user.password)

        if(!isPassword) return next(createError(401, "Invalid credentials!"))

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.ACCESS_TOKEN as string,
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        const refreshToken=jwt.sign(
            {id: user.id, email: user.email, role: user.role },
            process.env.REFRESH_TOKEN as string,
            { expiresIn: '7d' }
        )

        const { password: _, ...userWithoutPassword } = user;

        res.cookie("_yumy",refreshToken,{
            httpOnly:true,
            secure:true,
            sameSite:"none",
            maxAge: 1000 * 60 * 60 * 24 * 7
        })

        res.status(200).json({
            status:200,
            message:"User logged in!",
            data: {
                user:userWithoutPassword,
                token
            }
        })
    } catch (error) {
        next(error)
    }
}

export const logoutUserController=async(req:Request,res:Response,next:NextFunction)=>{
    
}