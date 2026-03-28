import type { AxiosRequestConfig } from 'axios';

interface AuthState {
  isAuthenticated: boolean;
}

interface RegisterFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface RegisterFormProps {
  onSubmit: (data: RegisterFormInputs) => void | Promise<void>;
}

interface UserResponse {
  id: number;
  email: string;
  name: string;
  surname: string;
  createdAt: string;
}

interface AuthResponse {
  user: UserResponse;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

interface ApiError {
  statusCode: number;
  message: string;
  error?: string;
}

interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

interface LoginFormInputs {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: (data: LoginFormInputs) => void | Promise<void>;
}
interface AIState {
  isOpen: boolean;
}

interface AIMessage {
  id: string;
  role: 'user' | 'ai';
  text: string;
  createdAt?: string;
}

interface AIChatRequest {
  message: string;
  conversationId?: string;
  context?: {
    taskId: string;
    taskType: string;
    taskTitle: string;
    taskDescription: string;
    codeSnippet: string;
  };
}

interface AIChatResponse {
  conversationId: string;
  messageId: string;
  reply: string;
}

interface TopicShort {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  order: number;
}

interface Topic extends TopicShort {
  questionsCount: number;
  codeTasksCount: number;
}

interface Question {
  id: string;
  prompt: string;
  order: number;
}

interface CodeTask {
  id: string;
  title: string;
  description: string;
  taskType: 'AI_CHECK' | 'DRAG_DROP';
  order: number;
}

interface TopicPreview {
  topic: TopicShort;
  questions: Question[];
  codeTasks: CodeTask[];
}

export type {
  AIChatRequest,
  AIChatResponse,
  AIMessage,
  AIState,
  ApiError,
  AuthResponse,
  AuthState,
  CustomAxiosRequestConfig,
  LoginFormInputs,
  LoginFormProps,
  RefreshResponse,
  RegisterFormInputs,
  RegisterFormProps,
  Topic,
  TopicPreview,
};
