import dayjs from 'dayjs';
import { Listener } from 'symbol-sdk';

const ESAPE_FORMAT = 'YYYY-MM-DDTHH:mm:ssZ[Z]';

const formatTransactionLocalDateTime = (dt: Date): string => (dt ? dayjs(dt).format(ESAPE_FORMAT) : '');
const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};
/**
 * Helper method to retry opening websocket n times asynchronously
 */
const retryNTimes = async (listener: Listener, trials: number, interval: number): Promise<any> => {
  if (trials < 1) {
    throw new Error('could not connect');
  }
  let attemptCount = 0;
  while (!listener.isOpen()) {
    try {
      return await listener.open();
    } catch (error) {
      if (++attemptCount >= trials) {
        throw error;
      }
    }
    await sleep(interval);
  }
};
const durationStringToMilliseconds = (value: string): number => {
  let str = value;
  let total = 0;
  const milliSeconds = str.match(/(\d+)\s*ms/);
  if (milliSeconds) {
    str = str.replace(milliSeconds[0], '');
    total += parseInt(milliSeconds[1]);
  }
  const days = str.match(/(\d+)\s*d/);
  if (days) {
    str = str.replace(days[0], '');
    total += parseInt(days[1]) * 24 * 60 * 60 * 1000;
  }
  const hours = str.match(/(\d+)\s*h/);
  if (hours) {
    str = str.replace(hours[0], '');
    total += parseInt(hours[1]) * 60 * 60 * 1000;
  }
  const minutes = str.match(/(\d+)\s*m/);
  if (minutes) {
    str = str.replace(minutes[0], '');
    total += parseInt(minutes[1]) * 60 * 1000;
  }
  const seconds = str.match(/(\d+)\s*s/);
  if (seconds) {
    str = str.replace(seconds[0], '');
    total += parseInt(seconds[1]) * 1000;
  }
  return total;
};

const durationStringToSeconds = (str: string): number => Math.floor(durationStringToMilliseconds(str) / 1000);
const generateCleanData: any = (data: { [key: string]: any }): any => {
  const newData = { ...data };

  for (const key in newData) {
    if (!newData[key]) {
      delete newData[key];
    }
  }

  return newData;
};

export {
  formatTransactionLocalDateTime,
  retryNTimes,
  durationStringToSeconds,
  durationStringToMilliseconds,
  generateCleanData,
};
