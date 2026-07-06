ALTER TABLE templates 
ADD COLUMN key_features jsonb DEFAULT '[]'::jsonb,
ADD COLUMN ideal_for jsonb DEFAULT '[]'::jsonb,
ADD COLUMN pages_included jsonb DEFAULT '[]'::jsonb;
