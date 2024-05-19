import express from 'express';
import { createUploadthing, createRouteHandler } from 'uploadthing/express';

const f = createUploadthing();

export const router = {
  imageUploader: f({
    image: {
      maxFileSize: '4MB',
      maxFileCount: 1,
    },
  }).onUploadComplete((data) => {
    console.log('upload completed', data);
  }),
};

const uploadRouter = express.Router();

uploadRouter.use(
  '/',
  createRouteHandler({
    router: router,
    config: {
      uploadthingId: process.env.UPLOADTHING_APP_ID,
      uploadthingSecret: process.env.UPLOADTHING_SECRET,
    },
  })
);

export default uploadRouter;
