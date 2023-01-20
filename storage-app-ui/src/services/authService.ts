import { userLoginRequest } from '../models/request/auth/userLoginRequest';
import { AuthResponse } from '../models/response/authResponse';

import agent from '../lib/agent';

const BASE_URL = '/auth';

const authService = {
  login: (userLoginRequest: userLoginRequest) => agent.post<AuthResponse>(`${BASE_URL}/login`, userLoginRequest),
  refreshToken: () => agent.get<AuthResponse>('/refresh-token'),
};

export default authService;
