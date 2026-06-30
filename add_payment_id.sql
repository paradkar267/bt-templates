-- Run this snippet in your Supabase SQL Editor to add the Razorpay Payment ID column!

ALTER TABLE public.purchases 
ADD COLUMN payment_id text;
