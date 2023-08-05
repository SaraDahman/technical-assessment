import { Request } from "express";
import IUserPayload from "./IUserPayload";

export default interface IRequest extends Request {
    user: IUserPayload
}