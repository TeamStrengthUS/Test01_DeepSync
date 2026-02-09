const { spawn } = require('child_process');

let lastActivity = Date.now();
const IDLE_TIMEOUT = 30 * 60 * 1000; // 30 Minutes

console.log("TeamStrength Neural Mesh: Node Online. Monitoring for idle state...");
if (!process.env.LETTA_AGENT_ID) {
    console.error("CRITICAL: LETTA_AGENT_ID is not set. Omni-Node cannot start.");
    process.exit(1);
}

// Spawn the LettaBot process
const bot = spawn('lettabot', ['start', '--agent', process.env.LETTA_AGENT_ID]);

bot.stdout.on('data', (data) => {
    const output = data.toString();
    console.log(output);

    // If a message is received, reset the idle timer
    if (output.includes("Received Message") || output.includes("Tool execution")) {
        lastActivity = Date.now();
    }
});

// Periodic Idle Monitor
setInterval(() => {
    const timeSinceLastActivity = Date.now() - lastActivity;
    
    if (timeSinceLastActivity > IDLE_TIMEOUT) {
        console.warn("CRITICAL: Node idle for 30m. Suspending process to conserve TeamStrength credits.");
        bot.kill('SIGTERM');
        process.exit(0);
    }
}, 60000); // Check every minute

bot.on('close', (code) => {
    process.exit(code);
});