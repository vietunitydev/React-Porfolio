import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export type CloudinaryUploadResult = {
  url: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
};

export async function uploadImage(base64Image: string, folder = 'portfolio') {
  const result = await cloudinary.uploader.upload(base64Image, {
    folder,
    resource_type: 'auto',
    transformation: [
      {width: 1600, height: 1600, crop: 'limit'},
      {quality: 'auto:good'},
      {fetch_format: 'auto'},
    ],
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
    format: result.format,
    bytes: result.bytes,
  } as CloudinaryUploadResult;
}

export async function deleteImage(publicId: string) {
  await cloudinary.uploader.destroy(publicId);
}
