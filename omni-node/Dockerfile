# -------------------------------------------------------------
# OMNI-NODE DOCKERFILE (TeamStrength AI-DSS)
# Runtime: Node.js 20 (LettaBot Framework)
# -------------------------------------------------------------

# 1. Use the official lightweight Node.js image
FROM node:20-bookworm-slim

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Install system dependencies (Required for compiling native modules or audio processing)
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# 4. Copy package management files first (for efficient caching)
COPY package*.json ./

# 5. Install dependencies
RUN npm install

# 6. Copy the rest of the application code
COPY . .

# -------------------------------------------------------------
# CRITICAL COMPLIANCE PATCH: INJECT NEURAL RELAY SKILL
# This ensures the Agent can "hear" the Web Chat via DeepSync.
# -------------------------------------------------------------
COPY letta_skills/ /app/letta_skills/

# 7. Build the TypeScript application
RUN npm run build

# 8. Start the Omni-Node Server
# Note: This runs the "start" script defined in package.json (usually 'lettabot server')
CMD ["npm", "run", "start"]
