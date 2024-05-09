// These functions all take in a body and return an options object
// with the provided body and the remaining options
import { fetchHandler, getPostOptions, getPatchOptions } from '../utils';

const baseUrl = '/api/users';

export const createUser = async ({
  username,
  password,
  display_name,
  location,
  age,
  image,
}) => {
  const [user, err] = await fetchHandler(
    baseUrl,
    getPostOptions({ username, password, display_name, location, age, image })
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
  const [user, err] = fetchHandler(`${baseUrl}/${id}`);
  if (err) return err;
  return user ?? {};
};

export const updateUser = async ({
  id,
  username,
  location,
  password,
  age,
  image,
  display_name,
}) => {
  const [user, err] = await fetchHandler(
    `${baseUrl}/${id}`,
    getPatchOptions({
      id,
      username,
      location,
      password,
      age,
      image,
      display_name,
    })
  );

  if (err) return err;
  return user ?? {};
};
