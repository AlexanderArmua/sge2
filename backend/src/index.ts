import 'tsconfig-paths/register';

import { AppConfig } from '@config';
import { logger } from '@logger';
import { boomErrorHandler, errorHandler, logErrors } from '@middlewares/errorMiddleware';
import { responseFormatterMiddleware } from '@middlewares/express-extended-response';
import routerApi from '@routes/index';
import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import './@types/express';

const app = express();

// TODO @Alex: Fix CORS in PRD
app.use(cors());

// Allow to receive JSON
app.use(express.json());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// TODO: Middleware `passport saml` cookie & token?

// Generic response middleware
app.use(responseFormatterMiddleware);

// Define all routes
routerApi(app);

// Log any error
app.use(logErrors);

// Boom error handlers
app.use(boomErrorHandler);

// Non Boom error handlers
app.use(errorHandler);

app.listen(AppConfig.port, () => {
	logger.info(`SGE 2.0 - Listening on port: ${AppConfig.port}`);
});
