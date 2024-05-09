import { fetchHandler, getPostOptions, deleteOptions } from '../utils';

const baseUrl = '/api';

export const checkForLoggedInUser = async () => {
  const [data] = await fetchHandler(`${baseUrl}/me`);
  return data;
};

export const localLogin = async ({ username, password }) => {
  const [data, err] = await fetchHandler(
    `${baseUrl}/login`,
    getPostOptions({ username, password })
  );
  if (err) return err;
  return data;
};
export const googleLogin = async () => {
  window.location.href = `${baseUrl}/google`;
};

export const logout = async () => {
  await fetchHandler(`${baseUrl}/logout`, deleteOptions);
  return true;
};
