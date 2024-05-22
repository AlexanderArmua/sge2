import dotenv from 'dotenv';

const result = dotenv.config();

if (result.error) {
	// eslint-disable-next-line no-console
	console.error(`Error loading data config ${result.error}`);

	throw result.error;
}

export const AppConfig = {
	env: process.env.NODE_ENV || 'development',
	port: process.env.PORT || 3000,
	db: {
		url: process.env.DATABASE_URL || '',
		provider: process.env.DATABASE_PROVIDER || '',
	},
	logs: {
		serviceName: process.env.PINO_SERVICE_NAME || '',
		hideLogs: (process.env.PINO_HIDE_LOGS || '') === 'true',
	},
};
