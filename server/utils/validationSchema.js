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
  displayName: {
    notEmpty: true,
  },
  password: {
    notEmpty: true,
  },
  /*   age: {
    isInt: {
      options: {
        min: 18,
      },
      errorMessage: 'Age must be at least 18',
    },
  },
  location: {
    notEmpty: true,
  },
  image: {
    isURL: {
      errorMessage: 'Image must be a valid URL',
    },
  }, */
};
