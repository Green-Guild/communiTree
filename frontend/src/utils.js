const basicFetchOptions = {
  method: "GET",
  credentials: "include",
};

export const deleteOptions = {
  method: "DELETE",
  credentials: "include",
};

export const getPostOptions = (body) => ({
  method: "POST",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

export const getPatchOptions = (body) => ({
  method: "PATCH",
  credentials: "include",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

export const fetchHandler = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    const { ok, status, headers } = response;
    if (!ok)
      throw new Error(`Fetch failed with status - ${status}`, {
        cause: status,
      });

    const isJson = (headers.get("content-type") || "").includes(
      "application/json"
    );
    const responseData = await (isJson ? response.json() : response.text());

    return [responseData, null];
  } catch (error) {
    console.warn(error);
    return [null, error];
  }
};

export const amPmConverter = (time) => {
  const parts = time.split("-");
  let hour = parseInt(parts[3], 10);
  const minute = parts[4];
  const suffix = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minute} ${suffix}`;
};

export const getLocationByZip = async (zipCode) => {
  const zipString = String(zipCode);
  const url = `http://ZiptasticAPI.com/${zipString}`;

  try {
      const response = await fetch(url);

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const locationData = await response.json();

      if (locationData && locationData.city && locationData.state) {
          console.log(`${locationData.city}, ${locationData.state}`);
      } else {
          console.log('Location data not available');
      }
  } catch (error) {
      console.error('Error fetching data:', error.message);
  }
};

export function capitalizeWords(str) {
  return str.toLowerCase().replace(/\b\w/g, function(char) {
    return char.toUpperCase();
  });
}

export function capitalizeFirstChar(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}



