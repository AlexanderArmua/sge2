import boom from '@hapi/boom';
import { logger } from '@logger';
import { TodosService } from '@services/todos.service';
import { NextFunction, Request, Response } from 'express';

const service = TodosService.getInstance();

const getTodos = async (req: Request, res: Response, next: NextFunction) => {
	const log = logger.child({ method: 'getTodos' });
	try {
		const { skip, take } = req.body;

		const todos = await service.findAll(skip, take);

		log.info({ skip, take, todos }, 'Returning todos');

		res.sendSuccess(200, todos);
	} catch (error) {
		next(error);
	}
};

const getTodoById = async (req: Request, res: Response, next: NextFunction) => {
	const log = logger.child({ method: 'getTodoById' });
	try {
		const { todoId } = req.params;

		const id = parseInt(todoId, 10);
		if (isNaN(id)) {
			throw boom.badRequest('Todo id must be a number');
		}

		const todo = await service.findById(id);
		if (!todo) {
			throw boom.notFound(`Todo not found by id: ${todoId}`);
		}

		log.info({ todoId, todo }, 'Returning todo');

		res.sendSuccess(200, todo);
	} catch (error) {
		next(error);
	}
};

const createTodo = async (req: Request, res: Response, next: NextFunction) => {
	const log = logger.child({ method: 'createTodo' });
	try {
		const { title, done } = req.body;

		const todo = await service.create({ title, done });

		log.info({ title, done }, 'Todo created');

		res.sendSuccess(201, todo);
	} catch (error) {
		next(error);
	}
};

const updateTodo = async (req: Request, res: Response, next: NextFunction) => {
	const log = logger.child({ method: 'updateTodo' });
	try {
		const { todoId } = req.params;
		const { title, done } = req.body;

		const id = parseInt(todoId, 10);
		if (isNaN(id)) {
			throw boom.badRequest('Todo id must be a number');
		}

		const todo = await service.update(id, { title, done });
		if (!todo) {
			throw boom.notFound(`Todo not found by id: ${todoId}`);
		}

		log.info({ todoId, title, todo }, 'Todo updated');

		res.sendSuccess(200, todo);
	} catch (error) {
		next(error);
	}
};

export { createTodo, getTodoById, getTodos, updateTodo };
