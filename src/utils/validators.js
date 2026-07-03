export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateUser(user) {
  const errors = {};
  if (!user.firstName.trim()) errors.firstName = 'First name is required';
  if (!user.lastName.trim()) errors.lastName = 'Last name is required';
  if (!user.email.trim()) errors.email = 'Email is required';
  else if (!isValidEmail(user.email)) errors.email = 'Invalid email address';
  if (!user.department.trim()) errors.department = 'Department is required';
  return errors;
}