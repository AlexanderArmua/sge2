import prisma from '@db/prisma.client';

const findAllTodos = async (skip?: number, take?: number) => {
	const minNumber = skip ?? 0;
	const maxNumber = (skip ?? 0) + (take ?? 20);

	const todos = await prisma.todo.findMany({
		skip: minNumber,
		take: maxNumber,
	});

	return todos;
};

const findTodoById = async (todoId: number) => {
	const todo = await prisma.todo.findUnique({
		where: {
			id: todoId,
		},
	});

	return todo;
};

// TODO: Define the type of the todo parameter
const createTodo = async (todo: { title: string; done?: boolean }) => {
	const newTodo = await prisma.todo.create({
		data: {
			...todo,
			done: todo.done || false,
		},
	});

	return newTodo;
};

const updateTodo = async (todoId: number, todo: { title: string; done?: boolean }) => {
	const updatedTodo = await prisma.todo.update({
		where: {
			id: todoId,
		},
		data: {
			...todo,
			done: todo.done || false,
		},
	});

	return updatedTodo;
};

export { createTodo, findAllTodos, findTodoById, updateTodo };
