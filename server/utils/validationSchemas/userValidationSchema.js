import { validateImageUrl } from './validationHelpers.js';

export const createUserValidationSchema = {
  username: {
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage:
        'Username must be at least 5 characters with a max of 32 characters',
    },
    notEmpty: {
      errorMessage: 'Username cannot be empty',
    },
    isString: {
      errorMessage: 'Username must be a string!',
    },
  },
  display_name: {
    notEmpty: true,
  },
  password: {
    notEmpty: true,
  },
  age: {
    isInt: {
      options: {
        min: 18,
      },
      errorMessage: 'Age must be at least 18',
    },
  },
  location: {
    notEmpty: true,
    isString: {
      errorMessage: 'Location must be a string!',
    },
  },
  image: {
    isURL: {
      errorMessage: 'Image must be a valid URL',
    },
  },
};

export const updateUserValidationSchema = {
  username: {
    optional: true,
    isLength: {
      options: {
        min: 5,
        max: 32,
      },
      errorMessage:
        'Username must be at least 5 characters with a max of 32 characters',
    },
    notEmpty: {
      errorMessage: 'Username cannot be empty',
    },
    isString: {
      errorMessage: 'Username must be a string!',
    },
  },
  display_name: {
    optional: true,
    notEmpty: true,
  },
  password: {
    optional: true,
    notEmpty: true,
  },
  age: {
    optional: true,
    isInt: {
      options: {
        min: 18,
      },
      errorMessage: 'Age must be at least 18',
    },
  },
  location: {
    optional: true,
    notEmpty: true,
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
};
