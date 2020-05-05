import axios from 'axios';
import { withNaming } from '@bem-react/classname';
import { baseUrl } from './client-conf.json';
const cn = withNaming({ e: '__', m: '_', v: '_' });

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
});

const formNames = {
  formSettings: 'formSettings',
  formRunBuildModal: 'formRunBuildModal'
};

export { cn, axiosInstance, formNames };
