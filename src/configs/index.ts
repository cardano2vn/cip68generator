import router from './router';
import wallet from './wallet';

const configs = {
    router: router,
    wallet: wallet,
} as const;

export default configs;
