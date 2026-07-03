-- Run this in your Supabase SQL Editor to add expiry date support
ALTER TABLE public.coupons ADD COLUMN IF NOT EXISTS expires_at TIMESTAMP WITH TIME ZONE;
