const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const router = require("./routes/auth_routes")
const app = express();
const port =5000;
const db = require("./config/connectDB"); 
db(process.env.DATABASE_URL);
app.use(express.json()); 



app.use("/api/user/",router); 
app.listen(port,()=>{
    console.log(`Server Listening at http://localhost:${port}`);
}); 