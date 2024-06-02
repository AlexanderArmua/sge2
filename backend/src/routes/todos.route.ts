import { getTodoById, getTodos, updateTodo } from '@controllers/todos.controller';
import { createTodo } from '@repositories/todos.repository';
import { Router } from 'express';

const router = Router();

router.get('/', getTodos);

router.put('/:todoId', getTodoById);

router.post('/', createTodo);

router.put('/:todoId', updateTodo);

export default router;
