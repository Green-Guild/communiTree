export const createCommentValidationSchema = {
  body: {
    isLength: {
      options: {
        min: 5,
      },
      errorMessage: 'Comment must be at least 5 characters',
    },
    notEmpty: {
      errorMessage: 'Comment cannot be empty',
    },
    isString: {
      errorMessage: 'Comment must be a string!',
    },
  },
  post_id: {
    isUUID: {
      errorMessage: 'Post id must be a valid UUID',
    },
  },
};

export const updateCommentValidationSchema = {
  body: {
    isLength: {
      options: {
        min: 5,
      },
      errorMessage: 'Comment must be at least 5 characters',
    },
    notEmpty: {
      errorMessage: 'Comment cannot be empty',
    },
    isString: {
      errorMessage: 'Comment must be a string!',
    },
  },
};
