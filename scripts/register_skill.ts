
/**
 * TEAMSTRENGTH NEURAL REGISTRATION UTILITY
 * Registers custom Python tools with the Letta Agentic Runtime.
 */

import fs from 'fs';
import path from 'path';

const LETTA_API_BASE = process.env.LETTA_API_URL || 'http://localhost:8083';
const AGENT_ID = process.env.LETTA_AGENT_ID;

async function registerNeuralSkills() {
  console.log("----------------------------------------------------");
  console.log("TeamStrength | Neural Skill Registration Sequence");
  console.log("----------------------------------------------------");

  if (!AGENT_ID) {
    console.error("CRITICAL: LETTA_AGENT_ID is not defined.");
    // Fix: Cast process to any to access exit method which may be missing on some global Process type definitions
    (process as any).exit(1);
  }

  // Fix: Cast process to any to access cwd method which may be missing on some global Process type definitions
  const skillPath = path.join((process as any).cwd(), 'letta_skills', 'neural_relay.py');
  const skillSource = fs.readFileSync(skillPath, 'utf8');

  try {
    // 1. Register the Tool in the Global Catalog
    console.log(`> Injecting 'neural_relay' into Global Shard...`);
    
    const response = await fetch(`${LETTA_API_BASE}/v1/tools`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source_code: skillSource,
        name: 'neural_relay_v1',
        description: 'TeamStrength DB Relay Comms'
      })
    });

    if (response.ok) {
      console.log(`> SUCCESS: Global Shard updated.`);
    } else {
      const err = await response.text();
      if (err.includes("already exists")) {
         console.log(`> NOTICE: Tool already exists. Proceeding to attachment.`);
      } else {
         throw new Error(`Catalog injection failed: ${err}`);
      }
    }

    // 2. Attach tools to specific Agent Node
    console.log(`> Attaching capabilities to Agent Node: ${AGENT_ID}...`);
    
    const attachResponse = await fetch(`${LETTA_API_BASE}/v1/agents/${AGENT_ID}/tools`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tools: ['check_web_messages', 'send_web_reply']
      })
    });

    if (attachResponse.ok) {
      console.log(`> SUCCESS: Agent Node ${AGENT_ID} is now Neural-Relay enabled.`);
    } else {
      throw new Error(`Attachment failed: ${await attachResponse.text()}`);
    }

    console.log("----------------------------------------------------");
    console.log("SEQUENCE COMPLETE: Agent is now HUD-Synchronized.");
    console.log("----------------------------------------------------");

  } catch (error) {
    console.error("FATAL: Registration protocol aborted.");
    console.error(error);
    // Fix: Cast process to any to access exit method which may be missing on some global Process type definitions
    (process as any).exit(1);
  }
}

registerNeuralSkills();
