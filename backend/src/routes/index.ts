import healthRoutes from '@routes/health.route';
import express, { Express } from 'express';

const routerApi = (app: Express) => {
	const router = express.Router();

	router.use('/', healthRoutes);

	app.use('/api/v1', router);
};

export default routerApi;
