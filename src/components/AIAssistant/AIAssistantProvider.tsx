import { useNavigate } from 'react-router-dom';

import { closeAI, openAI } from '@/redux/slices/aiSlice';

import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';

import { ROUTES } from '@/constants';

import { AIAssistantButton } from './AIAssistantButton/AIAssistantButton';
import { AIAssistantModal } from './AIAssistantModal/AIAssistantModal';

export const AIAssistantProvider = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isAuth = useAppSelector((state) => state.auth.isAuthenticated);
  const isOpen = useAppSelector((state) => state.ai.isOpen);

  const handleClick = () => {
    if (!isAuth) {
      void navigate(ROUTES.LOGIN);
      return;
    }

    dispatch(openAI());
  };

  const handleClose = () => dispatch(closeAI());

  return (
    <>
      {!isOpen ? (
        <AIAssistantButton onClick={handleClick} />
      ) : (
        <AIAssistantModal isOpen={isOpen} onClose={handleClose} />
      )}
    </>
  );
};
