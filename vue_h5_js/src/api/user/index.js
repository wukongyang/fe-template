import http from '@/utils/http';

export default {
  async login(params) {
    return await http.post('/user/login', params);
  },
};
