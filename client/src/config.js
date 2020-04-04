import axios from 'axios';
import { withNaming } from '@bem-react/classname';

export const cn = withNaming({ e: '__', m: '_', v: '_' });

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const formNames = {
  formSettings: 'formSettings',
  formRunBuildModal: 'formRunBuildModal'
};
