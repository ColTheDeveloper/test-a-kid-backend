import http from "http";
import app from "./app/app";


const server= http.createServer(app)

const PORT= process.env.PORT


server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})