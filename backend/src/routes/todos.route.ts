import { createTodo, getTodoById, getTodos, updateTodo } from '@controllers/todos.controller';
import { Router } from 'express';

const router = Router();

router.get('/', getTodos);

router.post('/', createTodo);

router.get('/:todoId', getTodoById);

router.put('/:todoId', updateTodo);

export default router;
