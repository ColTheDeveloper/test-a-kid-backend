import pool from "../config/db";


export const createUser=async(name:string, email:string, role:string, password:string)=>{
    const query="INSERT INTO users (name, email, role, password) VALUES ($1, $2, $3 ,$4) RETURNING *;"
    const values=[name,email,role,password]

    const result= await pool.query(query,values)

    console.log(result)
    return result.rows[0]
}

export const deleteUser=async()=>{}

export const getUserById=async()=>{}

export const updateUser=async()=>{}

export const getAllUser=async()=>{
    const result= await pool.query("SELECT * FROM users")

    console.log(result)
    return result.rows
}


