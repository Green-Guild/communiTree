export const createPostValidationSchema = {
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
  body: {
    isLength: {
      options: {
        min: 5,
      },
      errorMessage: 'Content must be at least 5 characters',
    },
    notEmpty: {
      errorMessage: 'Content cannot be empty',
    },
    isString: {
      errorMessage: 'Content must be a string!',
    },
  },
  garden_id: {
    optional: true,
    isUUID: {
      errorMessage: 'Garden ID must be an id!',
    },
  },
  event_id: {
    optional: true,
    isUUID: {
      errorMessage: 'Event ID must be an id!',
    },
  },
};

export const updatePostValidationSchema = {
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
  body: {
    optional: true,
    isLength: {
      options: {
        min: 5,
      },
      errorMessage: 'Content must be at least 5 characters',
    },
    notEmpty: {
      errorMessage: 'Content cannot be empty',
    },
    isString: {
      errorMessage: 'Content must be a string!',
    },
  },
  garden_id: {
    optional: true,
    isUUID: {
      errorMessage: 'Garden id must be a valid UUID',
    },
  },
  event_id: {
    optional: true,
    isUUID: {
      errorMessage: 'Event id must be a valid UUID',
    },
  },
};
