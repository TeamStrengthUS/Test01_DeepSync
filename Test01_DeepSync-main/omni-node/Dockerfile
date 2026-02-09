# -------------------------------------------------------------
# OMNI-NODE DOCKERFILE (TeamStrength AI-DSS)
# Runtime: Node.js 20 (LettaBot Framework)
# -------------------------------------------------------------

# 1. Use the official lightweight Node.js image
FROM node:20-bookworm-slim

# 2. Set the working directory inside the container
WORKDIR /app
EXPOSE 8283

# 3. Install system dependencies (Required for compiling native modules or audio processing)
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# 4. Copy package management files first (for efficient caching)
COPY package*.json ./

# 5. Install dependencies
RUN npm install

# 6. Install Letta server
RUN pip3 install --no-cache-dir letta

# 7. Copy the rest of the application code
COPY . .

# -------------------------------------------------------------
# CRITICAL COMPLIANCE PATCH: INJECT NEURAL RELAY SKILL
# This ensures the Agent can "hear" the Web Chat via DeepSync.
# -------------------------------------------------------------
COPY letta_skills/ /app/letta_skills/

# 8. Build step (noop for now)
RUN npm run build

# 9. Start the Omni-Node Server
CMD ["npm", "run", "start"]
