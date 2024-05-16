// These functions all take in a body and return an options object
// with the provided body and the remaining options
import { fetchHandler, getPostOptions, getPatchOptions } from '../utils';

const baseUrl = '/api/users';

export const createUser = async ({
  username,
  password,
  display_name,
  zipcode,
  image,
}) => {
  const [user, err] = await fetchHandler(
    baseUrl,
    getPostOptions({ username, password, display_name, zipcode, image })
  );
  if (err) return err;
  return user ?? {};
};

export const getAllUsers = async () => {
  const [users, err] = await fetchHandler(baseUrl);
  if (err) return err;
  return users ?? [];
};

export const getUser = async (id) => {
  const [user, err] = await fetchHandler(`${baseUrl}/${id}`);
  if (err) return err;
  return user ?? {};
};

export const updateUser = async ({
  id,
  username,
  zipcode,
  oldPassword,
  newPassword,
  image,
  display_name,
}) => {
  const [user, err] = await fetchHandler(
    `${baseUrl}/${id}`,
    getPatchOptions({
      username,
      zipcode,
      image,
      display_name,
    })
  );

  if (err) return err;
  return user ?? {};
};

export const updatePassword = async ({ id, oldPassword, newPassword }) => {
  const [user, err] = await fetchHandler(
    `${baseUrl}/password/${id}`,
    getPatchOptions({
      oldPassword,
      newPassword,
    })
  );

  if (err) return err;
  return user ?? {};
};
