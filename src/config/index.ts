import { config } from 'dotenv';
import { cleanEnv, str, port, bool } from 'envalid';

config();

const env = cleanEnv(process.env, {
  PORT: port({ default: 3000 }),
  MONGO_URL: str(),
  SECRET_KEY: str(),
  LOG_FORMAT: str(),
  LOG_DIR: str(),
  ORIGIN: str(),
  CREDENTIALS: bool(),
});

export const { PORT, MONGO_URL, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN, CREDENTIALS } = env;
