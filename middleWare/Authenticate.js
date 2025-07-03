

import Jwt from "jsonwebtoken"; 
import unAuthorizedError from "../error/unAuthorizedError.js"; 

const auth = async (req, res, next) => {

    const headers = req.headers;
 
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
   
        throw new unAuthorizedError("Authentication failed");
    }

    const token = authHeader.split(' ')[1];

    try {

        const Payload = Jwt.verify(token, process.env.JWT_SECRET);
        console.log(Payload)

        req.user = { userId: Payload.userId };

        next();
    } catch (error) {
       
        console.log("Error:", error.message);

        throw new unAuthorizedError("Authentication failed");
    }
}

export default auth;
