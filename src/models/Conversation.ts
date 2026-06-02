import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      maxlength: 200,
    },
    description: {
      type: String,
      maxlength: 500,
    },
    model: {
      type: String,
      enum: ['gpt-4', 'gpt-3.5-turbo', 'claude-2', 'llama-2'],
      required: true,
    },
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
      },
    ],
    metadata: {
      tokenCount: {
        type: Number,
        default: 0,
      },
      estimatedCost: {
        type: Number,
        default: 0,
      },
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    tags: [String],
  },
  {
    timestamps: true,
  }
);

export const Conversation = mongoose.models.Conversation || mongoose.model('Conversation', conversationSchema);
