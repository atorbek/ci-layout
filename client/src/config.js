import axios from 'axios';
import { withNaming } from '@bem-react/classname';

export const cn = withNaming({ e: '__', m: '_', v: '_' });

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});
