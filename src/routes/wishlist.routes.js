import express from "express"
import {getAllwhishlist,getwhishlistByid,createWhishlist,updateWhishlist,deleteWhishlist} from "../controllers/index.js"
import {checkwhislistmiddleware,updatewhislistmiddleware} from "../middlewares/index.js"
import {checkwhislistSchema} from "../validations/index.js"

export const whishlistrouter=express.Router()


whishlistrouter.get("/",getAllwhishlist)
whishlistrouter.get("/:id",getwhishlistByid)
whishlistrouter.post("/",checkwhislistmiddleware(checkwhislistSchema),createWhishlist)
whishlistrouter.put("/:id",updatewhislistmiddleware(checkwhislistSchema),updateWhishlist)
whishlistrouter.delete("/:id",deleteWhishlist)