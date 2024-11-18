import pool from "../database/index.js";
import { logger } from "../utils/index.js";

export const getallwhislists = async () => {
  try {
    const query = "Select * from whislist";
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const getwhistbyid = async (id) => {
  try {
    const query = "Select * from whislist where id=$1";
    const result = await pool.query(query, [id]);
    return result.rows;
  } catch (error) {
    logger.error(error);
    return error;
  }
};

export const createwhislist=async({user_id,product_id,create_at,update_at})=>{
    try {
        if(!create_at || !update_at){
            var query='Insert into whislist(user_id,product_id) Values($1,$2) returning *'
            var arr=[user_id,product_id]
        }else{
            var query='Insert into whislist(user_id,product_id,create_at,update_at) Values($1,$2,$3,$4) returning *'
            var arr=[user_id,product_id,create_at,update_at]
        }
        const result=await pool.query(query,arr)
        return result.rows

    } catch (error) {
        logger.error(error);
    return error;
    }
}

export const updatewhislist=async({id,user_id,product_id})=>{
    try {
        const query='Update whislist set user_id=$1,product_id=$2 where id=$3 returning *'
        const arr=[user_id,product_id,id]
        const result=await pool.query(query,arr)
        return result.rows
    } catch (error) {
        logger.error(error);
    return error;
    }
}

export const deletewhislist=async(id)=>{
    try {
        const query='Delete from whislist where id=$1 returning *'
        const result=await pool.query(query,[id])
        return result.rows
    } catch (error) {
        logger.error(error)
        return error
    }
}