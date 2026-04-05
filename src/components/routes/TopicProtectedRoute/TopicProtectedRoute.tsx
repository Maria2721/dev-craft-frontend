import { type ReactNode } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { Loader } from '@/components/ui';

import { useAppSelector } from '@/hooks/useRedux';
import { useTopics } from '@/hooks/useTopics';

import { ROUTES } from '@/constants';

interface TopicProtectedRouteProps {
  children: ReactNode;
}

function TopicProtectedRoute({ children }: TopicProtectedRouteProps) {
  const isAuth = useAppSelector((state) => state.auth.isAuthenticated);
  const { slug } = useParams<{ slug: string }>();
  const topics = useTopics();

  if (isAuth) {
    return <>{children}</>;
  }

  if (topics.length === 0) {
    return <Loader size="lg" />;
  }

  const firstTopicSlug = topics[0]?.slug;
  const canOpenTopic = slug === firstTopicSlug;

  if (!canOpenTopic) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <>{children}</>;
}

export default TopicProtectedRoute;
