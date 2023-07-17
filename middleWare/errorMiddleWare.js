import {StatusCodes} from 'http-status-codes';

const errorMiddleWare=(err, req, res, next)=>{
    console.log(err)
    const defaultError={
        statusCode:err.statusCode||StatusCodes.INTERNAL_SERVER_ERROR,
        msg:err.message || "something went wrong try again later"
    }
    if(err.name==="validatorError"){
        defaultError.statusCode=StatusCodes.BAD_REQUEST;
        //defaultError.msg=err.message
defaultError.msg=Object.values(err.errors).map((items)=>{
items.message
}).join(',')
    }
    if(err.code && err.code===11000){
defaultError.msg=`${Object.keys(err.keyValue)} field has to be unique`
    }
    console.log(err)
res.status(defaultError.statusCode).json({msg:defaultError.msg})
//res.status(defaultError.statusCode).json({msg:err})
}

export default errorMiddleWare;