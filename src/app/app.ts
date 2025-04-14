import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


const app: Application = express();


app.use(cors()); // enable CORS
app.use(express.json()); // parse incoming JSON payload


// Example route
app.get('/', (req, res) => {
  res.send('Welcome to the SecondHand Marketplace API!');
});



export default app;