import { logger } from "../utils/index.js";
import {getallwhislists,getwhistbyid,createwhislist,updatewhislist,deletewhislist} from "../services/index.js"
export const getAllwhishlist=async(req,res)=>{
    try {
        const result=await getallwhislists()
        res.status(200).send(result)
    } catch (error) {
        logger.error(error.message)
        res.status(400).send(error.message)
    }
}

export const getwhishlistByid=async(req,res)=>{
    try {
        const {id}=req.params
        const result=await getwhistbyid(id)
        res.status(200).send(result)
    } catch (error) {
        logger.error(error)
        res.status(400).send(error)
    }
}

export const createWhishlist=async(req,res)=>{
    try {
        const {user_id,product_id,create_at,update_at}=req.body
        const result=await createwhislist({user_id,product_id,create_at,update_at})
        res.status(200).send(result)
    } catch (error) {
        logger.error(error)
        res.status(400).send(error)
    }
}

export const updateWhishlist=async(req,res)=>{
    try {
        const {id}=req.params
        const {user_id,product_id}=req.body
        const result=await updatewhislist({id,user_id,product_id})
        res.status(200).send(result)
    } catch (error) {
        logger.error(error)
        res.status(400).send(error)
    }
}

export const deleteWhishlist=async(req,res)=>{
    try {
        const {id}=req.params
        const result=await deletewhislist(id)
        res.status(200).send(result)
    } catch (error) {
        logger.error(error)
        res.status(400).send(error)
    }
}