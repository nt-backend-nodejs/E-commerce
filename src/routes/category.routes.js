import express from "express";
import { createCategory, deleteCategory, getAllCategory, getByIdCategory, updateCategory} from "../controllers/index.js"
import { authGuard, roleGuard } from "../middlewares/index.js";

export const categoryRouter = express.Router()

categoryRouter.get('/all' , getAllCategory)
categoryRouter.get('/all/:id' ,getByIdCategory)
categoryRouter.post('/new' , authGuard, roleGuard("admin") ,createCategory)
categoryRouter.put('/update/:id',authGuard,roleGuard("admin"), updateCategory)
categoryRouter.delete('/delete/:id' ,authGuard,roleGuard("admin"), deleteCategory)