import { healthCheck } from './health.controller';

describe('Health Controller', () => {
    let req: any;
    let res: any;

    let responseSuccess: any;

    // Evaluate res.json
    beforeEach(() => {
        responseSuccess = jest.fn();

        res = {
            sendSuccess: responseSuccess
        };
    });

    it('Health controller should be ok', () => {
        healthCheck(req, res);

        expect(responseSuccess).toHaveBeenCalledTimes(1);
        expect(responseSuccess).toHaveBeenCalledWith(200, {
            status: 'Server is up and running 🚀 🚀 🚀'
        });
    });
});
