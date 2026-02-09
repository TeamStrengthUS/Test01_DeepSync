#!/bin/bash

# TeamStrength DeepSync - Secrets Initialization Utility
# This script configures the Master Credentials for the Neural Mesh.

echo "----------------------------------------------------"
echo "TeamStrength | Neural Mesh Secret Setup"
echo "----------------------------------------------------"

# 1. Collect Credentials
read -p "Enter LIVEKIT_API_KEY: " LK_KEY
read -p "Enter LIVEKIT_API_SECRET: " LK_SECRET
read -p "Enter OPENAI_API_KEY: " OAI_KEY
read -p "Enter TELEGRAM_BOT_TOKEN: " TG_TOKEN
read -p "Enter RAILWAY_API_TOKEN: " RW_TOKEN
read -p "Enter SUPABASE_URL: " SB_URL
read -p "Enter SUPABASE_SERVICE_ROLE_KEY: " SB_KEY
read -p "Enter SUPABASE_ANON_KEY (for frontend): " SB_ANON

echo ""
echo "Deploying to Supabase Edge Functions..."
supabase secrets set \
  SUPABASE_ANON_KEY="$SB_ANON" \
  LIVEKIT_API_KEY="$LK_KEY" \
  LIVEKIT_API_SECRET="$LK_SECRET" \
  OPENAI_API_KEY="$OAI_KEY" \
  RAILWAY_API_TOKEN="$RW_TOKEN" \
  SUPABASE_URL="$SB_URL" \
  SUPABASE_SERVICE_ROLE_KEY="$SB_KEY"

echo "Deploying to Railway (Agentic Layer)..."
railway variables set \
  LIVEKIT_API_KEY="$LK_KEY" \
  LIVEKIT_API_SECRET="$LK_SECRET" \
  OPENAI_API_KEY="$OAI_KEY" \
  TELEGRAM_BOT_TOKEN="$TG_TOKEN" \
  RAILWAY_API_TOKEN="$RW_TOKEN" \
  VITE_SUPABASE_URL="$SB_URL" \
  VITE_SUPABASE_ANON_KEY="$SB_ANON"

echo "----------------------------------------------------"
echo "SETUP COMPLETE: DeepSync Vault and Neural Mesh wired."
echo "----------------------------------------------------"
