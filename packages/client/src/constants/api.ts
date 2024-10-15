import { getCodeSandboxHost } from '@codesandbox/utils';

const codeSandboxHost = getCodeSandboxHost(3001);
export const API_URL = codeSandboxHost ? `https://${codeSandboxHost}` : 'http://localhost:3001';
export const STALE_TIME = 1000 * 60 * 10;