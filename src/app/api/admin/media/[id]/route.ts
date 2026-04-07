import mongoose from 'mongoose';
import {NextResponse} from 'next/server';
import connectDB from '../../../../../lib/mongodb';
import {Asset} from '../../../../../lib/models/asset';
import {deleteImage} from '../../../../../lib/cloudinary';

type RouteContext = {
  params: Promise<{id: string}>;
};

async function resolveId(context: RouteContext) {
  const params = await context.params;
  return params.id;
}

export async function DELETE(_request: Request, context: RouteContext) {
  await connectDB();
  const id = await resolveId(context);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({success: false, message: 'Invalid id.'}, {status: 400});
  }

  const asset = await Asset.findById(id).lean();
  if (!asset) {
    return NextResponse.json({success: false, message: 'Asset not found.'}, {status: 404});
  }

  await deleteImage(String(asset.publicId));
  await Asset.findByIdAndDelete(id);

  return NextResponse.json({success: true, message: 'Asset deleted.'});
}
