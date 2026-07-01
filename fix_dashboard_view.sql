-- Run this in your Supabase SQL Editor to allow your Admin Dashboard to see ALL purchases!

CREATE POLICY "Admin can view all purchases" 
ON public.purchases 
FOR SELECT 
USING (
  auth.email() = 'bizleap1@gmail.com'
);
