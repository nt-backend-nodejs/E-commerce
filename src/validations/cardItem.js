import z from 'zod'
export const cardItemSchema = z.object({
    cart_id: z.string().nonempty('cart_id is required'),
    product_id: z.string().nonempty('product_id is required'),
    quantity: z.number().min(1, 'quantity must be at least 1'),
})
