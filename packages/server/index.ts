import express from 'express';
import routes from './routes';

const app = express();
app.use(express.json());
app.use(routes);

// 🔹 PORT
const PORT: number = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
   console.log(`Server running on http://localhost:${PORT}`);
});
