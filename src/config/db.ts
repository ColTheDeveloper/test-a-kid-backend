import pg from "pg"
import dotenv from "dotenv"

dotenv.config()

const {Pool}=pg

const pool=new Pool({
    user:process.env.DB_USER,
    host:process.env.DB_HOST,
    database:process.env.DB,
    password:process.env.DB_PASS,
    port:Number(process.env.DB_PORT) ,
})

pool.connect((err)=>{
    if(err) {
        console.error("Database connection error:",err.stack)
    }else{
        console.log("Connected to PostgreSQL")
    }
})


export default pool