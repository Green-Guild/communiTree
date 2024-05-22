import {
  fetchHandler,
  getPatchOptions,
  getPostOptions,
  deleteOptions,
} from '../utils';

const baseUrl = '/api/events';

export const createEvent = async ({
  title,
  description,
  zipcode,
  address,
  event_date,
  image,
}) => {
  const [data, err] = await fetchHandler(
    baseUrl,
    getPostOptions({
      title,
      description,
      zipcode,
      address,
      event_date,
      image,
    })
  );
  if (err) return err;
  return data;
};

export const getAllEvents = async (location = null) => {
  const url = location ? `${baseUrl}?location=${location}` : baseUrl;
  const [data, err] = await fetchHandler(baseUrl);
  if (err) return err;
  return data;
};

export const getEvent = async (id) => {
  const [data, err] = await fetchHandler(`${baseUrl}/${id}`);
  if (err) return err;
  return data;
};

export const getEventsByUserId = async (host_id) => {
  const [data, err] = await fetchHandler(`${baseUrl}/user/${host_id}`);
  if (err) return err;
  return data;
};

export const updateEvent = async ({
  title,
  description,
  zipcode,
  event_date,
  garden_id,
  image,
}) => {
  const [data, err] = await fetchHandler(
    `${baseUrl}/${id}`,
    getPatchOptions({
      title,
      description,
      zipcode,
      event_date,
      garden_id,
      image,
    })
  );
  if (err) return err;
  return data;
};

export const deleteEvent = async (id) => {
  const [data, err] = await fetchHandler(`${baseUrl}/${id}`, deleteOptions);
  if (err) return err;
  return data;
};
