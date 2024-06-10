import { z } from 'zod';
import { status_catalog } from './drizzle/schema';
import { boolean } from 'drizzle-orm/mysql-core';

export const userSchema = z.object({
    name: z.string(),
    contact_phone: z.string(),
    phone_verified: z.boolean(),
    email: z.string().email(),
    email_verified: z.boolean(),
    confirmation_code: z.string(),
});

export const restaurantSchema = z.object({
    name: z.string(),
    street_address: z.string(),
    zip_code: z.string(),
    city_id: z.number(),
});

export const ownersSchema = z.object({
    restaurant_id: z.number(),
    owner_id: z.number(),
});

export const citySchema = z.object({
    name: z.string(),
    state_id: z.number(),
});

export const stateSchema = z.object({
    name: z.string(),
    code: z.string(),
});

export const orderSchema = z.object({
    restaurant_id: z.number(),
    estimated_delivery_time: z.string().datetime(),
    actual_delivery_time: z.string().datetime(),
    delivery_address_id: z.number(),
    user_id: z.number().int(),
    driver_id: z.number(),
    price: z.number(),
    discount: z.number(),
    final_price: z.number(),
    comment: z.string(),
  });

export const menu_itemSchema = z.object({
    name: z.string(),
    restaurant_id: z.number(),
    category_id: z.number(),
    description: z.string(),
    ingredients: z.string(),
    price: z.number(),
    active: z.boolean(),
    
});

export const order_menu_itemSchema = z.object({
    orer_id: z.number(),
    menu_item_id: z.number(),
    quantity: z.number(),
    item_price: z.number(),
    price: z.number(),
    comment:z.string(),
});

export const order_statusSchema = z.object({
    order_id: z.number(),
    status_catalog_id: z.number(),
});

export const driverSchema = z.object({
    car_make: z.string(),
    car_model: z.string(),
    car_year: z.string(),
    user_id: z.number(),
    online: z.boolean(),
    delivering: z.boolean(),
});

export const categorySchema = z.object({
    name: z.string(),
});

export const status_catalogSchema = z.object({
    name: z.string(),
});

export const commentSchema = z.object({
    user_id: z.number(),
    order_id: z.number(),
    comment: z.string(),
    is_complaint: z.boolean(),
    is_praise: z.boolean(),
});

export const addressSchema = z.object({
    street_address_1: z.string(),
    street_address_2: z.string(),
    zip_code: z.string(),
    delivery_instructions: z.string(),
    user_id: z.number(),
    city_id: z.number(),
});

export const loginUserShema = z.object({
    username: z.string(),
    password: z.string(),
});
export const registerUserShema = z.object({
    userId: z.number(),
    password: z.string(),
    username: z.string(),
    role: z.string().optional(),
});

export type TIOrder = z.infer<typeof orderSchema>;