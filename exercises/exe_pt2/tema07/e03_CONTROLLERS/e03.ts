import express from 'express';
import { getAll, getOneById, create, updateById, deleteById } from './controllers/planets';

const planetRouter = express.Router();

planetRouter.get('/api/planets', getAll);
planetRouter.get('/api/planets/:id', getOneById);
planetRouter.post('/api/planets', create);
planetRouter.put('/api/planets/:id', updateById);
planetRouter.delete('/api/planets/:id', deleteById);

export default planetRouter;
