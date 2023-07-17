const notFoundMiddleWare=(req, res)=>{
res.status(404).send("routes does not exist again")
}
export default notFoundMiddleWare;