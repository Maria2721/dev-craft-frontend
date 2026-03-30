type ClickProps = {
  onClick: () => void;
};

type AIModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type TabType = 'theory' | 'code' | 'overview';

type TopicIdProps = {
  topicId: string;
};

export type { AIModalProps, ClickProps, TabType, TopicIdProps };
