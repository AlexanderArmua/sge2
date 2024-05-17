import { PrismaClient } from '@prisma/client';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

const port = 3000;
const app = express();

const prisma = new PrismaClient();

app.use(helmet());

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World 2');
});

app.get('/api/todos', async (req, res) => {
    const allTodos = await prisma.todo.findMany();

    res.json(allTodos);
});

app.post('/api/todos', async (req, res) => {
    console.log(req.body)

    const { title, done = false } = req.body;

    const todo = await prisma.todo.create({
        data: {
            title,
            done,
        },
    });

    res.json(todo);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
