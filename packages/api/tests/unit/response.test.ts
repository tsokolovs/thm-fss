import { successResponse } from '@utils/response';

describe('utils/response', () => {
  it('should correctly format success response', () => {
    const data = {
      foo: 'bar',
      baz: 1
    };
    expect(successResponse(data)).toEqual({
      status: 'success',
      data,
    });
  });
});