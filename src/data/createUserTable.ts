import pool from "../config/db"



const createUserTable=async()=>{
    try {
        const query=`
            CREATE TABLE IF NOT EXISTS users(
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                role  VARCHAR(50) CHECK (role IN ('admin','teacher','student')),
                password VARCHAR(100) NOT NULL,
                created_at TIMESTAMP DEFAULT NOW()
            )
        `

        await pool.query(query)
        console.log('Table created successfully!')
    } catch (error) {
        console.error("Error creating tables:",error)
    }
}

export default createUserTable