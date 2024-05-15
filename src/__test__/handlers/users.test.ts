import { mockRequest, mockResponse } from '@src/__mocks__';
import UserController from '@src/controllers/user.controller';

describe('getUsers', () => {
  it('should return an array of users', () => {
    UserController.getAllUsers(mockRequest, mockResponse);
    UserController.getAllUsers2();
    // expect(mockResponse.send).toHaveBeenCalledWith([]);
  });
});
