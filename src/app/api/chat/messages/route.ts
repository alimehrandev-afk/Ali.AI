import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { Conversation } from '@/models/Conversation';
import { Message } from '@/models/Message';
import { User } from '@/models/User';
import { verifyToken } from '@/lib/auth';
import { successResponse, errorResponse, ApiError } from '@/lib/errors';
import { sendMessageSchema } from '@/validators';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      throw new ApiError(401, 'Unauthorized');
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    if (!decoded) {
      throw new ApiError(401, 'Invalid token');
    }

    const body = await request.json();
    const validatedData = sendMessageSchema.parse(body);

    // Verify conversation exists and belongs to user
    const conversation = await Conversation.findById(validatedData.conversationId);

    if (!conversation || conversation.userId.toString() !== decoded.userId) {
      throw new ApiError(404, 'Conversation not found');
    }

    // Create user message
    const userMessage = await Message.create({
      conversationId: validatedData.conversationId,
      role: 'user',
      content: validatedData.content,
      contentType: validatedData.contentType || 'text',
    });

    // TODO: Call AI API to generate response based on model

    // For now, create a mock assistant response
    const assistantMessage = await Message.create({
      conversationId: validatedData.conversationId,
      role: 'assistant',
      content: 'This is a mock response. Integrate with your AI service here.',
      contentType: 'text',
      metadata: {
        model: conversation.model,
      },
    });

    // Add messages to conversation
    conversation.messages.push(userMessage._id);
    conversation.messages.push(assistantMessage._id);
    await conversation.save();

    // Update user stats
    await User.findByIdAndUpdate(
      decoded.userId,
      {
        $inc: { totalMessages: 2 },
      }
    );

    return NextResponse.json(
      successResponse({
        data: {
          userMessage,
          assistantMessage,
        },
      }),
      { status: 201 }
    );
  } catch (error: any) {
    if (error instanceof ApiError) {
      return NextResponse.json(errorResponse(error.message), { status: error.statusCode });
    }

    console.error('Send message error:', error);
    return NextResponse.json(errorResponse('Failed to send message'), { status: 500 });
  }
}
