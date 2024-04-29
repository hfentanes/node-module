import express from 'express';
import Joi from 'joi';
import { Request, Response } from 'express';

type Planet = {
  id: number;
  name: string;
};

type Planets = Planet[];

let planets: Planets = [
  {id: 1, name: 'Earth'},
  {id: 2, name: 'Mars'},
];

const planetRouter = express.Router();
const planetSchema = Joi.object({
  id: Joi.number().required(),
  name: Joi.string().required(),
});

planetRouter.get('/api/planets', (req: Request, res: Response) => {
  res.json(planets);
});

planetRouter.get('/api/planets/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const planet = planets.find((p) => p.id === Number(id));
  if (!planet) {
    return res.status(404).json({ msg: 'Planet not found' });
  }

  res.json(planet);
});

planetRouter.post('/api/planets', (req: Request, res: Response) => {
  const { error } = planetSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  const newPlanet: Planet = req.body;
  planets.push(newPlanet);
  res.status(201).json({ msg: 'Planet created successfully' });
});

planetRouter.put('/api/planets/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { error } = planetSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ msg: error.details[0].message });
  }

  const planetIndex = planets.findIndex((p) => p.id === Number(id));
  if (planetIndex === -1) {
    return res.status(404).json({ msg: 'Planet not found' });
  }

  planets[planetIndex] = { ...req.body, id: Number(id) };
  res.json({ msg: 'Planet updated successfully' });
});

planetRouter.delete('/api/planets/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const planetIndex = planets.findIndex((p) => p.id === Number(id));
  if (planetIndex === -1) {
    return res.status(404).json({ msg: 'Planet not found' });
  }

  planets.splice(planetIndex, 1);
  res.json({ msg: 'Planet deleted successfully' });
});

export default planetRouter;
