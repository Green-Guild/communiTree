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
  zipcode: {
    notEmpty: true,
    isString: {
      errorMessage: 'Zipcode must be a string!',
    },
  },
  image: {
    optional: true,
    isImg: {
      custom: validateImageUrl,
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
  zipcode: {
    optional: true,
    notEmpty: true,
    isString: {
      errorMessage: 'Zipcode must be a string!',
    },
  },
  image: {
    optional: true,
    isImg: {
      custom: validateImageUrl,
    },
  },
};

export const updatePasswordValidationSchema = {
  oldPassword: {
    notEmpty: {
      errorMessage: 'Old password cannot be empty',
    },
  },
  newPassword: {
    notEmpty: {
      errorMessage: 'New password cannot be empty',
    },
  },
};
