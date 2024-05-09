import {
  fetchHandler,
  getPatchOptions,
  getPostOptions,
  deleteOptions,
} from '../utils';

const baseUrl = '/api/comments';

export const createComment = async ({ body, post_id }) => {
  const [data, err] = await fetchHandler(
    baseUrl,
    getPostOptions({
      body,
      post_id,
    })
  );
  if (err) return err;
  return data;
};

export const getAllComments = async () => {
  const [data, err] = await fetchHandler(baseUrl);
  if (err) return err;
  return data;
};

export const getComment = async (id) => {
  const [data, err] = await fetchHandler(`${baseUrl}/${id}`);
  if (err) return err;
  return data;
};

export const updateComment = async ({ body, post_id }) => {
  const [data, err] = await fetchHandler(
    `${baseUrl}/${id}`,
    getPatchOptions({
      body,
      post_id,
    })
  );
  if (err) return err;
  return data;
};

export const deleteComment = async (id) => {
  const [data, err] = await fetchHandler(`${baseUrl}/${id}`, deleteOptions);
  if (err) return err;
  return data;
};
