import {NextResponse} from 'next/server';
import connectDB from '../../../../lib/mongodb';
import {Asset} from '../../../../lib/models/asset';

export async function GET() {
  await connectDB();
  const assets = await Asset.find().sort({createdAt: -1}).lean();

  return NextResponse.json({
    success: true,
    data: assets.map((asset) => ({
      _id: String(asset._id),
      url: String(asset.url ?? ''),
      publicId: String(asset.publicId ?? ''),
      format: String(asset.format ?? ''),
      width: Number(asset.width ?? 0),
      height: Number(asset.height ?? 0),
      bytes: Number(asset.bytes ?? 0),
      createdAt: asset.createdAt ? new Date(asset.createdAt).toISOString() : null,
      updatedAt: asset.updatedAt ? new Date(asset.updatedAt).toISOString() : null,
    })),
  });
}
