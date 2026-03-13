import { Button } from '../../ui';

type Props = {
  isOpen: boolean;
  onClick: () => void;
};

function BurgerButton({ isOpen, onClick }: Props) {
  return (
    <Button variant={'secondary'} onClick={onClick}>
      {isOpen ? '✕' : '☰'}
    </Button>
  );
}

export { BurgerButton };
