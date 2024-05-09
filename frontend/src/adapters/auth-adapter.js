import { fetchHandler, getPostOptions, deleteOptions } from '../utils';

const baseUrl = '/api';

export const checkForLoggedInUser = async () => {
  const [data] = await fetchHandler(`${baseUrl}/me`);
  return data;
};

export const localLogin = async ({ username, password }) =>
  fetchHandler(`${baseUrl}/login`, getPostOptions({ username, password }));

export const googleLogin = () => {
  window.location.href = `${baseUrl}/google/`;
};

// the logout route pretty much can't fail with our setup, but if yours can, change this
export const logout = async () => {
  await fetchHandler(`${baseUrl}/logout`, deleteOptions);
  return true;
};
