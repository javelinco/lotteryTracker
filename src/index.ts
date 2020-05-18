import api from './api';
import Logger from './helpers/logger';
import * as dotenv from 'dotenv';

dotenv.config();

(async () => {
  try {
    Logger.instantiate();
    await api.start();
  } catch (error) {
    Logger.instance.error('Server crashed', error);
    process.exit(1);
  }
})().catch(console.error);
