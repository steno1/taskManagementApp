
import CustomApiError from "./CustomApi.js"; 
import { StatusCodes } from "http-status-codes"; 

class notFoundError extends CustomApiError {
    constructor(message) {
        super(message); 

        this.statusCode = StatusCodes.NOT_FOUND; 
    }
}

export default notFoundError; 
