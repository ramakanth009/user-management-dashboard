import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: { 'Content-Type': 'application/json' },
});

// Transform raw user from API to our app format
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

// Convert our user to API format
const toRawUser = (user) => ({
  id: user.id,
  name: `${user.firstName} ${user.lastName}`.trim(),
  email: user.email,
  company: { name: user.department || 'N/A' },
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
  try {
    const raw = toRawUser(user);
    const response = await api.post('/users', raw);
    
    // JSONPlaceholder returns a new id (usually 11)
    // Use the response id or fallback to generated one
    return {
      ...user,
      id: response.data.id || user.id || Date.now(),
    };
  } catch (error) {
    console.error('Add user error:', error);
    // Fallback: generate a local id
    return {
      ...user,
      id: Date.now(),
    };
  }
};

export const updateUser = async (user) => {
  // JSONPlaceholder only accepts PUT for IDs 1-10
  // For IDs > 10 (newly added users), simulate the update locally
  if (user.id > 10) {
    console.log('Simulating update for user ID:', user.id);
    // Return the user data as-is (simulate successful update)
    return user;
  }
  
  try {
    const raw = toRawUser(user);
    const response = await api.put(`/users/${user.id}`, raw);
    return {
      ...user,
      id: response.data.id || user.id,
    };
  } catch (error) {
    console.error('Update user error:', error);
    // If API fails, return the user data anyway (local update)
    return user;
  }
};

export const deleteUser = async (id) => {
  // JSONPlaceholder only accepts DELETE for IDs 1-10
  if (id > 10) {
    console.log('Simulating delete for user ID:', id);
    return; // Simulate successful delete
  }
  
  await api.delete(`/users/${id}`);
};