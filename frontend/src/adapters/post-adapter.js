import {
  fetchHandler,
  getPatchOptions,
  getPostOptions,
  deleteOptions,
} from '../utils';

const baseUrl = '/api/posts';

export const createPost = async ({ title, body, garden_id, event_id }) => {
  const [data, err] = await fetchHandler(
    baseUrl,
    getPostOptions({
      title,
      body,
      garden_id,
      event_id,
    })
  );
  if (err) return err;
  return data;
};

export const getAllPosts = async () => {
  const [data, err] = await fetchHandler(baseUrl);
  if (err) return err;
  return data;
};

export const getPost = async (id) => {
  const [data, err] = await fetchHandler(`${baseUrl}/${id}`);
  if (err) return err;
  return data;
};

export const getPostsByUserId = async (user_id) => {
  const [data, err] = await fetchHandler(`${baseUrl}/user/${user_id}`);
  if (err) return err;
  return data;
};

export const updatePost = async ({ title, body, garden_id, event_id }) => {
  const [data, err] = await fetchHandler(
    `${baseUrl}/${id}`,
    getPatchOptions({
      title,
      body,
      garden_id,
      event_id,
    })
  );
  if (err) return err;
  return data;
};

export const deletePost = async (id) => {
  const [data, err] = await fetchHandler(`${baseUrl}/${id}`, deleteOptions);
  if (err) return err;
  return data;
};
