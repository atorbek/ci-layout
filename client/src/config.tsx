import axios from 'axios';
import { withNaming } from '@bem-react/classname';
const cn = withNaming({ e: '__', m: '_', v: '_' });

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api',
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
