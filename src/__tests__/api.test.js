import axios from 'axios';
import * as api from '../services/api';

jest.mock('axios');

const mockUser = {
  id: 1,
  name: 'Leanne Graham',
  email: 'Sincere@april.biz',
  company: { name: 'Romaguera-Crona' },
};

test('getUsers transforms data correctly', async () => {
  axios.get.mockResolvedValue({ data: [mockUser] });
  const users = await api.getUsers();
  expect(users[0]).toEqual({
    id: 1,
    firstName: 'Leanne',
    lastName: 'Graham',
    email: 'Sincere@april.biz',
    department: 'Romaguera-Crona',
  });
});