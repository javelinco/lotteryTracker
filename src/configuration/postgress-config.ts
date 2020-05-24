import { Configuration } from 'ts-postgres';
import * as dotenv from 'dotenv';

dotenv.config();

const postgresConfig: Configuration = {
  host: process.env.POSTGRES_ENDPOINT,
  database: process.env.POSTGRES_INSTANCE_ID,
  port: 5432,
  user: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD
};

export { postgresConfig };
