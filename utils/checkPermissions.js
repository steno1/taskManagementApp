// Import the unAuthorizedError class for handling unauthorized access

import { unAuthorizedError } from "../error/index.js";

// Middleware function to check if the request user has permission to access the resource
const checkPermission = (requestUser, resourceUserId) => {
    // Compare the userId of the request user with the userId of the resource owner
    if (requestUser.userId === resourceUserId.toString()) {
        return; // If the userIds match, the user has permission, so return without throwing an error
    }

    // If userIds do not match, throw an unauthorized access error
    throw new unAuthorizedError("Not authorized to access this route");
};

export default checkPermission;

/* requestUser (object): The user making the request. This object should contain information about the user's permissions, role, or any other relevant data that determines their level of access */

/* resourceUserId (string): The unique identifier of the user who owns the resource that is being accessed. This identifier will be used to compare with the requestUser's information to determine if the requestUser has the necessary permission to access the resource. */
