import CustomError from "./CustomError";

const validateParams = (params: string) => {
    if (!(Number(params) > 0)) throw new CustomError(400, 'Invalid Id');
    return;
}

export default validateParams;