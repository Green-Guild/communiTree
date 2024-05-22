import { validateDate, validateImageUrl, validateEventDate } from './validationHelpers.js';

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
      custom: validateEventDate,
    },
  },
  zipcode: {
    isString: {
      errorMessage: 'Zipcode must be a string!',
    },
  },
  address: {
    isString: {
      errorMessage: 'Address must be a string!',
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
    optional: true,
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
    optional: true,
    isString: {
      errorMessage: 'Description must be a string!',
    },
  },
  event_date: {
    optional: true,
    isDateCustom: {
      custom: validateEventDate,
    },
  },
  zipcode: {
    optional: true,
    isString: {
      errorMessage: 'Zipcode must be a string!',
    },
  },
  address: {
    optional: true,
    isString: {
      errorMessage: 'Address must be a string!',
    },
  },
  image: {
    optional: true,
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
