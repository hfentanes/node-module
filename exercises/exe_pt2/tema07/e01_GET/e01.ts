import express from 'express';
import dotenv from 'dotenv';
import "express-async-errors";
import morgan from 'morgan';

type Planet = {
  id: number;
  name: string;
};

type Planets = Planet[];

let planets = [
    {id: 1, name: "Earth"},
    {id: 2, name: "Mars"},
]

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.json());


app.get('/api/planets', (req, res) => {
  res.status(200).json(planets);
})

app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`)
})