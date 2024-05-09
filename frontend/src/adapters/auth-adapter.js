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
// TODO: fix google login
export const googleLogin = async () => {
  // const [data, err] = await fetchHandler(`${baseUrl}/google`);
  // if (err) return err;
  // return data;
  window.location.href = `${baseUrl}/google`;
};

// the logout route pretty much can't fail with our setup, but if yours can, change this
export const logout = async () => {
  await fetchHandler(`${baseUrl}/logout`, deleteOptions);
  return true;
};
