import {
  fetchHandler,
  getPatchOptions,
  getPostOptions,
  deleteOptions,
} from '../utils';

const baseUrl = '/api/gardens';

export const createGarden = async ({
  name,
  zipcode,
  description,
  image,
  is_public,
  owner_id,
}) => {
  const [data, err] = await fetchHandler(
    baseUrl,
    getPostOptions({ name, zipcode, description, image, is_public, owner_id })
  );
  if (err) return err;
  return data;
};

export const getAllGardens = async (location = null) => {
  const url = location ? `${baseUrl}?location=${location}` : baseUrl;
  const [data, err] = await fetchHandler(baseUrl);
  if (err) return err;
  return data;
};

export const getGarden = async (id) => {
  const [data, err] = await fetchHandler(`${baseUrl}/${id}`);
  if (err) return err;
  return data;
};

export const getGardensByUserId = async (owner_id) => {
  const [data, err] = await fetchHandler(`${baseUrl}/user/${owner_id}`);
  if (err) return err;
  return data;
};

export const updateGarden = async ({
  id,
  name,
  zipcode,
  description,
  image,
  is_public,
  owner_id,
}) => {
  const [data, err] = await fetchHandler(
    `${baseUrl}/${id}`,
    getPatchOptions({
      name,
      zipcode,
      description,
      image,
      is_public,
      owner_id,
    })
  );
  if (err) return err;
  return data;
};

export const deleteGarden = async (id) => {
  const [data, err] = await fetchHandler(`${baseUrl}/${id}`, deleteOptions);
  if (err) return err;
  return data;
};