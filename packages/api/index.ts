import dotenv from 'dotenv';
import { openDBConnection } from '@db/index';
import { mainApp } from './app';

dotenv.config();
await openDBConnection();
const PORT = process.env.PORT || 3001;

mainApp.listen(PORT, () => {
  console.log(`API Server Started at ${PORT}`);
});
