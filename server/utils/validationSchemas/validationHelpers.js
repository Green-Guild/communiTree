export const validateDate = (value) => {
  const dateFormatRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

  if (!dateFormatRegex.test(value)) {
    throw new Error(
      'Invalid date format. It should be in "YYYY-MM-DD HH:mm:ss" format'
    );
  }

  return true;
};

export const validateImageUrl = (value) => {
  const imgRegex = /\.(jpg|jpeg|png|gif|bmp)$/i;

  if (!imgRegex.test(value)) {
    throw new Error('Invalid image URL');
  }

  return true;
};
