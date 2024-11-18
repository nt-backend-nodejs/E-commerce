import express from "express";
import { createCategory, deleteCategory, getAllCategory, getByIdCategory, updateCategory } from "../controller/index.js";
import { isAdmin } from "../middleware/index.js";

export const categoryRouter = express.Router()

categoryRouter.get('/all' , getAllCategory)
categoryRouter.get('/all/:id' ,getByIdCategory)
categoryRouter.post('/new' , isAdmin ,createCategory)
categoryRouter.put('/update/:id',isAdmin , updateCategory)
categoryRouter.delete('/delete/:id' ,isAdmin, deleteCategory)