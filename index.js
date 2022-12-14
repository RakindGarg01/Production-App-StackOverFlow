import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv'
import questionRoutes from './routes/Questions.js'
import answerRoutes from './routes/Answers.js'
import userRoutes from './routes/user.js'
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
dotenv.config();
app.use(express.json({limit:"30mb",extended : true}))
app.use(express.urlencoded({limit : "30mb" , extended : true}))
app.use(cors());

app.use('/user' , userRoutes)
app.use('/questions' , questionRoutes)
app.use('/answer' , answerRoutes)
//STATIC FILES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname,'./client/build')))

app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname , "./client/build/index.html"))
})

const PORT = process.env.PORT || 8000;

const DATABASE_URL = process.env.CONNECTION_URL


mongoose.connect(DATABASE_URL ,{useNewUrlParser : true , useUnifiedTopology : true})
    .then(() => {
        console.log("Connection With DataBase is Succesfully Estabilished.");
        app.listen(PORT , (err)=>{console.log(`Server is running on port ${PORT}` , err)})
    })
    .catch((err) => {
        console.log("OOPS!! You lost Your Connection");
    })



//C:\Users\rakin\Desktop\STACKOVERFLOW-DEVELOPMENT-APP