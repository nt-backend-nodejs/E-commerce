import express from "express"
import {getAllwhishlist,getwhishlistByid,createWhishlist,updateWhishlist,deleteWhishlist} from "../controllers/index.js"

export const whishlistrouter=express.Router()


whishlistrouter.get("/",getAllwhishlist)
whishlistrouter.get("/:id",getwhishlistByid)
whishlistrouter.post("/",createWhishlist)
whishlistrouter.put("/:id",updateWhishlist)
whishlistrouter.delete("/:id",deleteWhishlist)