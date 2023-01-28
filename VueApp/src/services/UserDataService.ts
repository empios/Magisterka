import { AxiosResponse } from 'axios';
import apiClient from './http-base';
import UserSchema from '../types/User';

class UserDataService {
  create(data: UserSchema): Promise<AxiosResponse> {
    return apiClient.post('/signup', data);
  }

  login(data: UserSchema): Promise<AxiosResponse> {
    return apiClient.post('/login', data);
  }

  logout(email: string): Promise<AxiosResponse> {
    return apiClient.post('/logout', { email });
  }
}

export default new UserDataService();
