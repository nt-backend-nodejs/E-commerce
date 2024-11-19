
export const getAllOrdersService = async (query) => {
  try {
    const result = await db.query(query);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

export const getOneOrderByIdService = async (query, id) => {
  try {
    const result = await db.query(query, [id]);
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};


export const createOrderService = async (
  query,
  user_id,
  cart_id,
  created_at,
  updated_at
) => {
  try {
    const result = await db.query(query, [
      user_id,
      cart_id,
      created_at,
      updated_at,
    ]);
    return result.rows[0]; 
  } catch (error) {
    throw error;
  }
};

export const updateOrderService = async (
  query,
  user_id,
  cart_id,
  updated_at,
  id
) => {
  try {
    const result = await db.query(query, [user_id, cart_id, updated_at, id]);
    return result.rows[0]; 
  } catch (error) {
    throw error;
  }
};


export const deleteOrderService = async (query, id) => {
  try {
    const result = await db.query(query, [id]);
    return result.rows[0]; 
  } catch (error) {
    throw error;
  }
};
