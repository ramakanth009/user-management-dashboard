import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: { 'Content-Type': 'application/json' },
});

// to transform  raw user object from  API into app's format
const transformUser = (raw) => {
  const nameParts = raw.name ? raw.name.split(' ') : [];
  return {
    id: raw.id,
    firstName: nameParts[0] || '',
    lastName: nameParts.slice(1).join(' ') || '',
    email: raw.email || '',
    department: raw.company?.name || 'N/A',
  };
};

// to convert user object back to  API's expected output
const toRawUser = (user) => ({
  id: user.id,
  name: `${user.firstName} ${user.lastName}`.trim(),
  email: user.email,
  company: { name: user.department },
  username: user.username || '',
  address: user.address || {},
  phone: user.phone || '',
  website: user.website || '',
});

export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data.map(transformUser);
};

export const addUser = async (user) => {
  const raw = toRawUser(user);
  const response = await api.post('/users', raw);
  // when API returns the created object but we merge local id if needed
  return transformUser({ ...raw, ...response.data });
};

export const updateUser = async (user) => {
  const raw = toRawUser(user);
  const response = await api.put(`/users/${user.id}`, raw);
  return transformUser({ ...raw, ...response.data });
};

export const deleteUser = async (id) => {
  await api.delete(`/users/${id}`);
};