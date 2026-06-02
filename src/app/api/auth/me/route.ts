import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { User } from '@/models/User';
import { verifyToken } from '@/lib/auth';
import { successResponse, errorResponse, ApiError } from '@/lib/errors';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Get token from header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(401, 'Unauthorized');
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    if (!decoded) {
      throw new ApiError(401, 'Invalid or expired token');
    }

    // Fetch user
    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    const response = {
      _id: user._id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      subscriptionTier: user.subscriptionTier,
    };

    return NextResponse.json(successResponse({ data: response }));
  } catch (error: any) {
    if (error instanceof ApiError) {
      return NextResponse.json(errorResponse(error.message), { status: error.statusCode });
    }

    console.error('Auth me error:', error);
    return NextResponse.json(
      errorResponse('Authentication failed'),
      { status: 500 }
    );
  }
}
