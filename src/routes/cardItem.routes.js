import express from "express";
import { createCardItem, deleteCardItem, getAllCardItem, getByIdCardItem, updateCardItem } from "../controllers/index.js"
import { authGuard, roleGuard } from "../middlewares/index.js";

export const cardItemRouter = express.Router()

cardItemRouter.get('/all' , getAllCardItem)
cardItemRouter.get('/all/:id' ,getByIdCardItem)
cardItemRouter.post('/new' , authGuard, roleGuard("user") ,createCardItem)
cardItemRouter.put('/update/:id',authGuard,roleGuard("user"), updateCardItem)
cardItemRouter.delete('/delete/:id' ,authGuard,roleGuard("user"), deleteCardItem)