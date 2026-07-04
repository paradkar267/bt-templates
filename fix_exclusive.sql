-- 1. Create a function that runs with admin privileges (SECURITY DEFINER)
CREATE OR REPLACE FUNCTION mark_template_sold_out()
RETURNS TRIGGER AS $$
BEGIN
  -- This will update the template to Sold Out whenever someone buys it
  UPDATE public.templates
  SET is_sold_out = TRUE
  WHERE id = NEW.template_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Create the trigger on the purchases table
DROP TRIGGER IF EXISTS trigger_mark_template_sold_out ON public.purchases;

CREATE TRIGGER trigger_mark_template_sold_out
AFTER INSERT ON public.purchases
FOR EACH ROW
EXECUTE FUNCTION mark_template_sold_out();

-- 3. (Optional) If you have Row Level Security (RLS) on templates, this policy allows anyone to read them
-- but only the trigger (and admins) can update them.
-- You can ignore errors if the policy already exists.
