import express from "express";
import { PORT, MONGO_DB_URL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/BookRoute.js";
import cors from 'cors'

const app = express();
app.use(express.json())
app.use(cors())
// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type']
// }))

app.get('/', (req, res) => {
    return res.status(200).send('Welcome to Book Store App')
})
app.use('/books', booksRoute)
mongoose.connect(MONGO_DB_URL).then(() => {
    console.log("App Connected to Database")
    app.listen(PORT, () => {
        console.log(`Server is running on the port: ${PORT}`);
    })
}).catch((error) => {
    console.log(error)
})



