import config from './env.config';

const {
  API_KEY,
  AUTH_DOMAIN,
  DB_URL,
  PROJECT_ID,
  BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
} = config;

export default {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DB_URL,
  projectId: PROJECT_ID,
  storageBucket: BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};
