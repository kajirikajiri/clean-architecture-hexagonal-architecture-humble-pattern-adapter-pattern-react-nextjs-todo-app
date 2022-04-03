import { API } from 'src/utils/constants/api';
import { mockGetTodos } from 'src/mocks/api/todo';
import { rest } from 'msw';

export const handlers = [
  rest.get(`${API}/todos`, mockGetTodos),
];