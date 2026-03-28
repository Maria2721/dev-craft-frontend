type ClickProps = {
  onClick: () => void;
};

type AIModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type TabType = 'theory' | 'code' | 'overview';

export type { AIModalProps, ClickProps, TabType };
