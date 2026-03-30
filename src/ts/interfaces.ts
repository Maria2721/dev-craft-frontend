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

interface Option {
  id: string;
  label: string;
  text: string;
  order: number;
}

interface Question {
  id: string;
  prompt: string;
  codeSnippet: string | null;
  order: number;
  options: Option[];
  correctOptionIds: string[];
}

interface TheoryQuestions {
  topic: TopicShort;
  questions: Question[];
}

interface LocationState {
  topicId: string;
}

interface QuestionCardProps {
  id: string;
  prompt: string;
  codeSnippet?: string;
  options: Option[];
  selectedAnswers: string[];
  onSelect: (optionId: string) => void;
  result: QuestionResult;
  loading: boolean;
  onCheck: () => void;
}

interface QuestionResult {
  isCorrect: boolean;
  correctOptionIds?: string[];
}

interface TheoryQuestionsResult {
  questionId: string;
  selectedOptionIds: string[];
  correctOptionIds: string[];
  isCorrect: boolean;
}

interface TheoryQuestionsResponse {
  results: TheoryQuestionsResult[];
  summary: {
    submitted: number;
    correct: number;
  };
  topicProgress: {
    totalQuestions: number;
    attempted: number;
    correct: number;
  };
}

interface CodeTask {
  id: string;
  title: string;
  description: string;
  taskType: 'AI_CHECK' | 'DRAG_DROP';
  order: number;
}

interface CodeTasks {
  topic: TopicShort;
  codeTasks: CodeTask[];
}

interface CodeCardProps {
  title: string;
  description: string;
  taskType: 'AI_CHECK' | 'DRAG_DROP';
}

export type {
  AIChatRequest,
  AIChatResponse,
  AIMessage,
  AIState,
  ApiError,
  AuthResponse,
  AuthState,
  CodeCardProps,
  CodeTasks,
  CustomAxiosRequestConfig,
  LocationState,
  LoginFormInputs,
  LoginFormProps,
  QuestionCardProps,
  QuestionResult,
  RefreshResponse,
  RegisterFormInputs,
  RegisterFormProps,
  TheoryQuestions,
  TheoryQuestionsResponse,
  Topic,
  TopicPreview,
};
