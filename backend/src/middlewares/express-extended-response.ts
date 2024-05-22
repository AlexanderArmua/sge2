import { NextFunction, Request, RequestHandler, Response } from 'express';

const responseFormatterMiddleware: RequestHandler = (_req: Request, res: Response, next: NextFunction) => {
	res.sendSuccess = (status: number, data: any = {}) => {
		const formattedResponse = {
			data,
		};

		res.status(status ?? 200).json(formattedResponse);
	};

	next();
};

export { responseFormatterMiddleware };
