import '@/app/globals.css';
import { syncToken } from './hybot';

// token info from hybot first, then the app (its modules read config/site.json at import time)
syncToken().finally(() => import('./boot'));
