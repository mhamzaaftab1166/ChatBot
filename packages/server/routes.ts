import express, { type Request, type Response } from 'express';
import { chatController } from './controllers/chat.controller';

const routes = express.Router();
// 🔹 Home route
routes.get('/', (req: Request, res: Response) => {
   res.send('Hello from TypeScript Express!');
});

routes.get('/api/hello', (req: Request, res: Response) => {
   res.json({ message: 'Hello from TypeScript Express!' });
});

routes.post('/api/chat', chatController.sendMessage);

export default routes;
