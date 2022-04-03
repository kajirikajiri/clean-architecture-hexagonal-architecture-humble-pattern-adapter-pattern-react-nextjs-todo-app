import { MockedRequest, ResponseResolver, restContext } from 'msw';
import { getFormatDate } from 'src/utils/scripts/getFormatDate';


export const mockGetTodos: ResponseResolver<MockedRequest, typeof restContext> =
  async (_, res, ctx) => {
    const date = getFormatDate()
      const data: any = {
          todos: [
              {
                  id: '1',
                  title: 'タイトル1',
                  description: '説明1',
                  createdAt: date,
                  updatedAt: date,
                  doneAt: undefined,
              },
              {
                  id: '2',
                  title: 'タイトル2',
                  description: '説明2',
                  createdAt: date,
                  updatedAt: date,
                  doneAt: undefined,
              }
          ]
      }
  return res(
    ctx.status(200),
    ctx.json(data)
  );
};
