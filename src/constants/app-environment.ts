import { CardanoNetwork } from '@/types';

const appNetwork: CardanoNetwork =
    (process.env.BLOCKFROST_API_KEY?.toLowerCase().slice(0, 7) as CardanoNetwork) || 'preprod';

const BACKEND_URL = process.env.BACKEND_URL || '';
const CONTEXT_PATH = process.env.CONTEXT_PATH || '/api';

export { appNetwork, BACKEND_URL, CONTEXT_PATH };
