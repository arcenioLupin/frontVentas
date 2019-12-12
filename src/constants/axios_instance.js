import axios from 'axios';
import { TOKEN, USERNAME } from '../constants';

const customAxios = axios.create({
  headers: {
    codUsuario: USERNAME,
    token: TOKEN,
  },
  validateStatus(status) {
    if (status === 401) {
      window.history.pushState({}, '', '/401');
      window.location.reload();
    }
    return status < 500; // Reject only if the status code is greater than or equal to 500
  },
});

export { customAxios };
