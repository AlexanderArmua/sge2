import { logger as globalLogger } from '@logger';
import { createTodo, findAllTodos, findTodoById, updateTodo } from '@repositories/todos.repository';

const logger = globalLogger.child({ method: 'TodosService' });

// TODO: Create type todo
export class TodosService {
	private static instance: TodosService;

	static getInstance(): TodosService {
		if (!TodosService.instance) {
			TodosService.instance = new TodosService();
		}

		return TodosService.instance;
	}

	async findAll(skip?: number, take?: number): Promise<any[]> {
		const log = logger.child({ method: 'findAll', skip, take });

		const todos = await findAllTodos(skip, take);

		log.info({ todosLength: todos.length }, 'Returning todos');

		return todos;
	}

	async findById(todoId: number): Promise<any | null> {
		const log = logger.child({ method: 'findById' });

		const todo = await findTodoById(todoId);
		if (!todo) {
			log.warn({ todoId }, 'Todo not found');
		}

		return null;
	}

	async create(todo: { title: string; done?: boolean }): Promise<any> {
		const log = logger.child({ method: 'create' });

		if (!todo || !todo.title) {
			log.error({ todo }, 'Error creating todo by missing title');
			throw new Error('Error creating todo by missing title');
		}

		const newTodo = await createTodo(todo);
		if (!newTodo) {
			log.error({ todo }, 'Error creating todo');
			throw new Error('Error creating todo');
		}

		return newTodo;
	}

	async update(todoId: number, todo: { title: string; done?: boolean }): Promise<any | null> {
		const log = logger.child({ method: 'update' });

		if (!todoId) {
			log.error({ todoId }, 'Error updating todo by missing id');
			throw new Error('Error updating todo by missing id');
		}

		if (!todo || !todo.title) {
			log.error({ todoId, todo }, 'Error updating todo by missing title');
			throw new Error('Error updating todo by missing title');
		}

		const updatedTodo = await updateTodo(todoId, todo);
		if (!updatedTodo) {
			log.error({ todoId, todo }, 'Error updating todo');
			throw new Error('Error updating todo');
		}

		return updatedTodo;
	}
}
