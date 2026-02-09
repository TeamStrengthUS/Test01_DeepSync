// Declare Deno for Supabase Edge Functions environment
declare const Deno: any;
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';
import Stripe from 'https://esm.sh/stripe@14.14.0';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
  apiVersion: '2023-10-16',
  httpClient: Stripe.createFetchHttpClient(),
});

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  const { pathname } = new URL(req.url);

  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // --- CHECKOUT ENDPOINT ---
    if (pathname.endsWith('/checkout')) {
      const { tier_id, user_id, email } = await req.json();

      // Retrieve Tier Price ID from Tier Definitions
      const { data: tier } = await supabase
        .from('tier_definitions')
        .select('stripe_price_id')
        .eq('tier_id', tier_id)
        .single();

      if (!tier?.stripe_price_id) throw new Error('Stripe Price ID not found for this tier.');

      const session = await stripe.checkout.sessions.create({
        customer_email: email,
        line_items: [{ price: tier.stripe_price_id, quantity: 1 }],
        mode: 'subscription',
        success_url: `${req.headers.get('origin')}/#/dashboard/overview?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.get('origin')}/#/pricing`,
        metadata: { user_id, tier_id },
      });

      return new Response(JSON.stringify({ url: session.url }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // --- WEBHOOK ENDPOINT ---
    if (pathname.endsWith('/webhook')) {
      const signature = req.headers.get('stripe-signature');
      const body = await req.text();
      let event;

      try {
        event = await stripe.webhooks.constructEventAsync(
          body,
          signature ?? '',
          Deno.env.get('STRIPE_WEBHOOK_SECRET') ?? ''
        );
      } catch (err) {
        return new Response(`Webhook Error: ${err.message}`, { status: 400 });
      }

      if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const { user_id, tier_id } = session.metadata;

        // Fetch Tier Limits
        const { data: tierDef } = await supabase
          .from('tier_definitions')
          .select('voice_fuel_cap, node_limit')
          .eq('tier_id', tier_id)
          .single();

        // Update Subscriptions
        await supabase.from('subscriptions').upsert({
          user_id,
          tier: tier_id,
          voice_fuel_cap: tierDef?.voice_fuel_cap ?? 1000,
          max_nodes: tierDef?.node_limit ?? 1,
          stripe_customer_id: session.customer,
          updated_at: new Date().toISOString(),
        });

        console.log(`[STRIPE] Subscription activated for ${user_id} -> ${tier_id}`);
      }

      return new Response(JSON.stringify({ received: true }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response('Not Found', { status: 404 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});