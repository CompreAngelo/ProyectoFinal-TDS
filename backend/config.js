import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 4000

//PayPal

export const PAYPAL_API_CLIENT = process.env.PayPal_Client_ID;
export const PAYPAL_API_SECRET = process.env.PayPal_secrect_key;
export const PAYPAL_API = "https://sandbox.paypal.com" //