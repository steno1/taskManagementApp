import CustomApiError from "./CustomApi.js";
import { StatusCodes } from "http-status-codes";

class unAuthorizedError extends CustomApiError{
constructor(message){
super(message)
this.StatusCode=StatusCodes.UNAUTHORIZED
}
}
export default unAuthorizedError