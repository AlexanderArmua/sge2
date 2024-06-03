import healthRoutes from '@routes/health.route';
import todosRoutes from '@routes/todos.route';
import express, { Express } from 'express';

const routerApi = (app: Express) => {
	const router = express.Router();

	router.use('/', healthRoutes);

	router.use('/todos', todosRoutes);

	app.use('/api/v1', router);
};

export default routerApi;
