import {Buffer} from 'node:buffer';
import {NextResponse} from 'next/server';
import connectDB from '../../../../lib/mongodb';
import {uploadImage} from '../../../../lib/cloudinary';
import {Asset} from '../../../../lib/models/asset';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('file');
  const folderValue = formData.get('folder');
  const folder =
    typeof folderValue === 'string' && folderValue.trim().length > 0
      ? folderValue.trim()
      : 'portfolio';

  if (!file || typeof file === 'string' || typeof (file as Blob).arrayBuffer !== 'function') {
    return NextResponse.json(
      {success: false, message: 'File is required.'},
      {status: 400}
    );
  }

  const blob = file as Blob;
  const bytes = await blob.arrayBuffer();
  const mimeType = (file as File).type || 'application/octet-stream';
  const dataUri = `data:${mimeType};base64,${Buffer.from(bytes).toString('base64')}`;

  const uploaded = await uploadImage(dataUri, folder);

  await connectDB();
  const saved = await Asset.create({
    url: uploaded.url,
    publicId: uploaded.publicId,
    format: uploaded.format,
    width: uploaded.width,
    height: uploaded.height,
    bytes: uploaded.bytes,
  });

  return NextResponse.json({
    success: true,
    message: 'Upload successful.',
    data: {
      _id: String(saved._id),
      url: String(saved.url),
      publicId: String(saved.publicId),
      format: String(saved.format ?? ''),
      width: Number(saved.width ?? 0),
      height: Number(saved.height ?? 0),
      bytes: Number(saved.bytes ?? 0),
    },
  });
}
