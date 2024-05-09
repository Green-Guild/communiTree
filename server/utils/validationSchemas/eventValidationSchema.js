import { validateDate, validateImageUrl } from './validationHelpers.js';

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
      custom: validateDate,
    },
  },
  location: {
    optional: true,
    isString: {
      errorMessage: 'Location must be a string!',
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
