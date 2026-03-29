type ClickProps = {
  onClick: () => void;
};

type AIModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type TabType = 'theory' | 'code' | 'overview';

type TheoryQuestionsProps = {
  topicId: string;
};

export type { AIModalProps, ClickProps, TabType, TheoryQuestionsProps };
