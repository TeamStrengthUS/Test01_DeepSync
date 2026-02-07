
import { jest, describe, test, expect, beforeEach } from '@jest/globals';
// @ts-ignore - Importing JS module into TS test
const { preToolExecution } = require('../../omni-node/src/hooks/security_check');

// Mock Supabase to verify immutable logging
// Fix: Explicitly type the mock function to accept an argument (data) to resolve "Expected 0 arguments, but got 1" errors in tests
const mockInsert = jest.fn<(data: any) => Promise<{ error: any }>>().mockResolvedValue({ error: null });
const mockFrom = jest.fn<any>().mockReturnValue({ insert: mockInsert });

jest.mock('@supabase/supabase-js', () => ({
  createClient: () => ({
    from: mockFrom
  })
}));

describe('TeamStrength Constitution: Egress Guard Verification', () => {
  const mockUserId = 'usr_rogue_001';
  
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.USER_ID = mockUserId;
  });

  test('Case A: Malicious Command Block (rm -rf)', async () => {
    const dangerousArgs = { command: 'rm -rf /' };
    
    // Assertion: Hook must throw error
    await expect(preToolExecution('bash', dangerousArgs))
      .rejects.toThrow("Action blocked by TeamStrength Constitution: Illegal Egress attempt detected.");

    // Verification: Immutable logging triggered
    expect(mockFrom).toHaveBeenCalledWith('security_strikes');
    // Fix: Updated mockInsert type above allows arguments here
    expect(mockInsert).toHaveBeenCalledWith(expect.objectContaining({
      user_id: mockUserId,
      violation_type: 'illegal_egress',
      details: expect.stringContaining('rm -rf')
    }));
  });

  test('Case A.2: Malicious Reconnaissance (nmap)', async () => {
    const reconArgs = { command: 'nmap 192.168.1.1' };
    
    await expect(preToolExecution('bash', reconArgs))
      .rejects.toThrow("Action blocked by TeamStrength Constitution: Illegal Egress attempt detected.");

    // Fix: Updated mockInsert type above allows arguments here
    expect(mockInsert).toHaveBeenCalledWith(expect.objectContaining({
      details: expect.stringContaining('nmap')
    }));
  });

  test('Case B: Safe Command Execution', async () => {
    const safeArgs = { command: 'echo "Hello World"' };
    
    // Assertion: Hook must allow safe commands
    const result = await preToolExecution('bash', safeArgs);
    expect(result).toBe(true);

    // Verification: No security strike logged
    expect(mockInsert).not.toHaveBeenCalled();
  });
});
