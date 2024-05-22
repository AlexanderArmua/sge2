import pino from 'pino';
import { AppConfig } from '@config';

const isProduction = process.env.NODE_ENV === 'production';

const prodOptions = { level: 'info' as const, stream: process.stdout };

const devOptions = {
  level: 'debug' as const,
  stream: process.stdout,
};

let streams = [isProduction ? prodOptions : devOptions];

if (AppConfig.logs.hideLogs) {
  streams = [];
}

export const logger = pino(
  {
    formatters: {
      bindings() {
        return {};
      },
      level(level) {
        return { level };
      },
    },
    level: 'debug',
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  pino.multistream(streams),
);
