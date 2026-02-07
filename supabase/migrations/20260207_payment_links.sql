
-- TEAMSTRENGTH COMMERCIAL GATEWAY V1.0
-- CONNECTING NEURAL LOGISTICS TO STRIPE REVENUE SHARDS

-- 1. Extend Tier Definitions
ALTER TABLE public.tier_definitions 
ADD COLUMN IF NOT EXISTS payment_link_url TEXT;

-- 2. Inject Production-Ready (Mock) Payment Shards
UPDATE public.tier_definitions 
SET payment_link_url = 'https://buy.stripe.com/test_command_pro_shard_01' 
WHERE tier_id = 'command_pro';

-- 3. Governance Metadata
COMMENT ON COLUMN public.tier_definitions.payment_link_url IS 'External URI for secure commercial processing via Stripe/Paddle.';
