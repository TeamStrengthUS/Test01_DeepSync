const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

/**
 * TeamStrength Constitution: Egress Guard
 * Intercepts tool execution to prevent unauthorized system access.
 */
async function preToolExecution(tool_name, args) {
    const dangerousKeywords = ['rm -rf', 'nmap', 'curl', 'wget', 'nc ', 'mkfifo'];
    const argString = JSON.stringify(args).toLowerCase();

    if (tool_name === 'bash') {
        const violation = dangerousKeywords.find(kw => argString.includes(kw));
        
        if (violation) {
            // IMMUTABLE LOGGING TO DEEPSYNC VAULT
            await supabase.from('security_strikes').insert({
                user_id: process.env.USER_ID,
                violation_type: 'illegal_egress',
                details: `Blocked command attempt involving: ${violation}`
            });

            throw new Error("Action blocked by TeamStrength Constitution: Illegal Egress attempt detected.");
        }
    }
    return true;
}

module.exports = { preToolExecution };