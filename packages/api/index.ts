import dotenv from 'dotenv';
import { openDBConnection } from '@db/index';
import { mainApp } from './app';
import { clearInvalidCachePoll } from '@utils/searchCache';

dotenv.config();
await openDBConnection();
const PORT = process.env.PORT || 3001;
clearInvalidCachePoll();

mainApp.listen(PORT, () => {
  console.log(`API Server Started at ${PORT}`);
});
