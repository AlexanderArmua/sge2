import { Response } from 'express';

declare module 'express' {
	interface Response {
		sendSuccess(status?: number, data?: any): void;
	}
}
