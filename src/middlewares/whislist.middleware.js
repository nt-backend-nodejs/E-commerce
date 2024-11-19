import { logger } from "../utils/logger.js";

export const checkwhislistmiddleware=(schema)=>{
    return (req,res,next)=>{
        const {user_id,product_id}=req.body
        const {error}=schema.validate({user_id,product_id})
        if(error){
            logger.error(error)
            res.status(400).send("Ma'lumot to'liqmas")
        }else{
            next()
        }
    }
}

export const updatewhislistmiddleware=(schema)=>{
    return (req,res,next)=>{
        const {id}=req.params
        const {user_id,product_id}=req.body
        const {error}=schema.validate({id,user_id,product_id})
        if(error){
            logger.error(error)
            res.status(400).send("Ma'lumot to'liqmas")
        }else{
            next()
        }
    }
}