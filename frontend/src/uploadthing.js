import {
  generateReactHelpers,
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

const initOpts = {
  url: 'http://localhost:3000/api/uploads',
}

export const UploadButton = generateUploadButton(initOpts);
export const UploadDropzone = generateUploadDropzone(initOpts);

export const { useUploadThing } = generateReactHelpers(initOpts);
