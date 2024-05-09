import { validateImageUrl } from './validationHelpers.js';

export const createGardenValidationSchema = {
  name: {
    isLength: {
      options: {
        min: 5,
        max: 255,
      },
      errorMessage:
        'Name must be at least 5 characters with a max of 255 characters',
    },
    notEmpty: {
      errorMessage: 'Name cannot be empty',
    },
    isString: {
      errorMessage: 'Name must be a string!',
    },
  },
  location: {
    isString: {
      errorMessage: 'Location must be a string!',
    },
  },
  description: {
    isString: {
      errorMessage: 'Description must be a string!',
    },
  },
  image: {
    isImg: {
      custom: validateImageUrl,
    },
  },
  is_public: {
    isBoolean: {
      errorMessage: 'Is public must be a boolean',
    },
  },
};

export const updateGardenValidationSchema = {
  name: {
    optional: true,
    isLength: {
      options: {
        min: 5,
        max: 255,
      },
      errorMessage:
        'Name must be at least 5 characters with a max of 255 characters',
    },
    notEmpty: {
      errorMessage: 'Name cannot be empty',
    },
    isString: {
      errorMessage: 'Name must be a string!',
    },
  },
  location: {
    optional: true,
    isString: {
      errorMessage: 'Location must be a string!',
    },
  },
  description: {
    optional: true,
    isString: {
      errorMessage: 'Description must be a string!',
    },
  },
  image: {
    optional: true,
    isImg: {
      custom: validateImageUrl,
    },
  },
  is_public: {
    optional: true,
    isBoolean: {
      errorMessage: 'Is public must be a boolean',
    },
  },
};
