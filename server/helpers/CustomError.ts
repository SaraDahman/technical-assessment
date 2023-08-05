class CustomError extends Error {
    status: number;

    constructor(statusCode: number, message: string) {
        super(message);
        this.status = statusCode;
        this.message = message;
    }
};

export default CustomError;
