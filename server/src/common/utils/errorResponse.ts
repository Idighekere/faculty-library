import { CustomError } from 'ts-custom-error';

class ErrorResponse extends CustomError {
    statusCode: number;
    status: string;
    isOperational: boolean;
    data?: unknown;

    constructor(message:string,statusCode:number,data?:unknown) {

        super(message);

        this.statusCode=statusCode;


        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        this.data=data

        Error.captureStackTrace(this, this.constructor);


    }
}

export default ErrorResponse
