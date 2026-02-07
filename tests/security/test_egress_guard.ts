// Add imports for Jest globals to fix TypeScript "Cannot find name" errors.
import { jest, describe, test, expect, beforeEach } from '@jest/globals';
import { preToolExecution } from '../../omni-node/src/hooks/security_check';

// Mocking Supabase for testing environment
const mockSupabase = {
  from: (jest.fn() as any).mockReturnThis(),
  insert: (jest.fn() as any).mockResolvedValue({ error: null })
};

jest.mock('@supabase/supabase-js', () => ({
  createClient: () => mockSupabase
}));

describe('TeamStrength Constitution: Egress Guard Suite', () => {
  const rogueUserId = 'usr_rogue_001';
  // @ts-ignore
  process.env.USER_ID = rogueUserId;

  beforeEach(() => {
    // @ts-ignore
    jest.clearAllMocks();
  });

  test('Case A: Should block "rm -rf /" and log to DeepSync', async () => {
    const dangerousCommand = { command: 'rm -rf /' };
    
    await expect(preToolExecution('bash', dangerousCommand))
      .rejects.toThrow("Action blocked by TeamStrength Constitution: Illegal Egress attempt detected.");

    expect(mockSupabase.from).toHaveBeenCalledWith('security_strikes');
    expect(mockSupabase.insert).toHaveBeenCalledWith(expect.objectContaining({
      user_id: rogueUserId,
      violation_type: 'illegal_egress',
      details: expect.stringContaining('rm -rf')
    }));
  });

  test('Case B: Should block "nmap" reconnaissance', async () => {
    const reconCommand = { command: 'nmap 192.168.1.1' };

    await expect(preToolExecution('bash', reconCommand))
      .rejects.toThrow("Action blocked by TeamStrength Constitution: Illegal Egress attempt detected.");

    expect(mockSupabase.insert).toHaveBeenCalledWith(expect.objectContaining({
      violation_type: 'illegal_egress'
    }));
  });

  test('Case C: Should allow safe commands', async () => {
    const safeCommand = { command: 'ls -la' };
    const result = await preToolExecution('bash', safeCommand);
    
    expect(result).toBe(true);
    expect(mockSupabase.insert).not.toHaveBeenCalled();
  });
});