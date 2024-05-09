const validateDate = (value) => {
  const dateFormatRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

  if (!dateFormatRegex.test(value)) {
    throw new Error(
      'Invalid date format. It should be in "YYYY-MM-DD HH:mm:ss" format'
    );
  }

  return true;
};

const validateImageUrl = (value) => {
  const imgRegex = /\.(jpg|jpeg|png|gif|bmp)$/i;

  if (!imgRegex.test(value)) {
    throw new Error('Invalid image URL');
  }

  return true;
};

export const createEventValidationSchema = {
  title: {
    isLength: {
      options: {
        min: 5,
        max: 255,
      },
      errorMessage:
        'Title must be at least 5 characters with a max of 255 characters',
    },
    notEmpty: {
      errorMessage: 'Title cannot be empty',
    },
    isString: {
      errorMessage: 'Title must be a string!',
    },
  },
  description: {
    isString: {
      errorMessage: 'Description must be a string!',
    },
  },
  event_date: {
    isDateCustom: {
      custom: validateDate,
    },
  },
  location: {
    isString: {
      errorMessage: 'Location must be a string!',
    },
  },
  image: {
    isImg: {
      custom: validateImageUrl,
    },
  },
  garden_id: {
    optional: true,
    isUUID: {
      errorMessage: 'Garden ID must be a valid UUID',
    },
  },
};

export const updateEventValidationSchema = {
  title: {
    isLength: {
      options: {
        min: 5,
        max: 255,
      },
      errorMessage:
        'Title must be at least 5 characters with a max of 255 characters',
    },
    notEmpty: {
      errorMessage: 'Title cannot be empty',
    },
    isString: {
      errorMessage: 'Title must be a string!',
    },
  },
  description: {
    isString: {
      errorMessage: 'Description must be a string!',
    },
  },
  event_date: {
    isDateCustom: {
      custom: validateDate,
    },
  },
  location: {
    isString: {
      errorMessage: 'Location must be a string!',
    },
  },
  image: {
    isImg: {
      custom: validateImageUrl,
    },
  },
  garden_id: {
    optional: true,
    isUUID: {
      errorMessage: 'Garden ID must be a valid UUID',
    },
  },
};
