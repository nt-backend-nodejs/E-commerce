import { logger } from "../utils/index.js";
export const getAllwhishlist=async(req,res)=>{
    try {
        res.status(200).send("ok")
    } catch (error) {
        logger.error(error)
        res.status(400).send(error)
    }
}

export const getwhishlistByid=async(req,res)=>{
    try {
        res.status(200).send("ok")
    } catch (error) {
        logger.error(error)
        res.status(400).send(error)
    }
}

export const createWhishlist=async(req,res)=>{
    try {
        res.status(200).send("ok")
    } catch (error) {
        logger.error(error)
        res.status(400).send(error)
    }
}

export const updateWhishlist=async(req,res)=>{
    try {
        res.status(200).send("ok")
    } catch (error) {
        logger.error(error)
        res.status(400).send(error)
    }
}

export const deleteWhishlist=async(req,res)=>{
    try {
        res.status(200).send("ok")
    } catch (error) {
        logger.error(error)
        res.status(400).send(error)
    }
}