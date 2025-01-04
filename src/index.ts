import http from "http";
import app from "./app/app";


const server= http.createServer(app)

const PORT= process.env.PORT || 0;


server.listen(PORT,()=>{
    console.log("Server is running on port 300000")
})