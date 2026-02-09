
-- TEAMSTRENGTH STRIPE METADATA V1.0
ALTER TABLE public.tier_definitions ADD COLUMN IF NOT EXISTS stripe_price_id TEXT;

-- Update existing tiers with mock price IDs
UPDATE public.tier_definitions SET stripe_price_id = 'price_1Pabc1234567890' WHERE tier_id = 'command_pro';
