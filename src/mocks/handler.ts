import { API } from 'utils/constants/api';
import { mockGetTodos } from 'mocks/api/todo';
import { rest } from 'msw';

export const handlers = [
  rest.get(`${API}/todos`, mockGetTodos),
];