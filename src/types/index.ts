/* Database Models */
export interface IUser {
  _id: string;
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  emailVerified: boolean;
  verificationToken?: string;
  verificationTokenExpiry?: Date;
  resetPasswordToken?: string;
  resetPasswordTokenExpiry?: Date;
  subscriptionTier: 'free' | 'pro' | 'enterprise';
  subscriptionStatus: 'active' | 'canceled' | 'expired';
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  apiKey: string;
  totalChats: number;
  totalMessages: number;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface IConversation {
  _id: string;
  userId: string;
  title: string;
  description?: string;
  model: string;
  messages: IMessage[];
  metadata: {
    tokenCount: number;
    estimatedCost: number;
  };
  isPublic: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IMessage {
  _id: string;
  conversationId: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  contentType: 'text' | 'code' | 'markdown';
  attachments?: IAttachment[];
  metadata?: {
    model?: string;
    tokens?: number;
    temperature?: number;
  };
  createdAt: Date;
}

export interface IAttachment {
  _id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  fileUrl: string;
  uploadedAt: Date;
}

export interface ISubscription {
  _id: string;
  userId: string;
  tier: 'free' | 'pro' | 'enterprise';
  status: 'active' | 'canceled' | 'expired';
  stripeCustomerId: string;
  stripeSubscriptionId?: string;
  priceId: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  canceledAt?: Date;
  cancelAtPeriodEnd: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAuditLog {
  _id: string;
  userId: string;
  action: string;
  resource: string;
  resourceId: string;
  changes: Record<string, any>;
  ipAddress: string;
  userAgent: string;
  createdAt: Date;
}

/* API Response Types */
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: Record<string, string[]>;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  timestamp: string;
}

/* Authentication Types */
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface DecodedToken {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

/* Request/Response DTOs */
export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  username: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirm {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface CreateConversationRequest {
  title: string;
  model: string;
  description?: string;
}

export interface SendMessageRequest {
  conversationId: string;
  content: string;
  contentType?: 'text' | 'code' | 'markdown';
  attachments?: IAttachment[];
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  avatar?: string;
}

/* Chat Model Types */
export type ChatModel = 'gpt-4' | 'gpt-3.5-turbo' | 'claude-2' | 'llama-2';

export interface ChatModelConfig {
  name: ChatModel;
  displayName: string;
  description: string;
  maxTokens: number;
  costPer1kTokens: number;
  available: boolean;
}

/* File Upload Types */
export interface FileUploadResponse {
  fileId: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  fileType: string;
  uploadedAt: Date;
}

/* Pagination Types */
export interface PaginationParams {
  page: number;
  limit: number;
  sort?: string;
  search?: string;
}

/* Error Types */
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public details?: any
  ) {
    super(message);
  }
}
