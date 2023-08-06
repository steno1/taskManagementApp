// Custom middleware to handle 404 errors (route not found)
const notFoundMiddleWare = (req, res) => {
    res.status(404).send("Route does not exist."); // Set response status to 404 and send an error message
  };
  
  export default notFoundMiddleWare; // Export the notFoundMiddleWare for use in other files
  