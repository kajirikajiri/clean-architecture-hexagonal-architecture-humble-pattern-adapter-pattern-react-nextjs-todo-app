import { API } from 'utils/constants/api';
import { mockGetTodos } from 'mocks/api/todo';
import { rest } from 'msw';
import { mockLogin, mockLogout } from './api/auth';

export const handlers = [
  rest.post(`${API}/login`, mockLogin),
  rest.post(`${API}/logout`, mockLogout),
  rest.get(`${API}/todos`, mockGetTodos),
];