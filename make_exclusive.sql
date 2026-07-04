-- Run this in your Supabase SQL Editor

ALTER TABLE public.templates 
ADD COLUMN IF NOT EXISTS is_sold_out BOOLEAN DEFAULT FALSE;

-- Optional: Reset existing purchases if you want to start fresh
-- UPDATE public.templates SET is_sold_out = FALSE;
