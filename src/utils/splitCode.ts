import type { CodeItem } from '@/ts/types';

export const splitCode = (code: string): CodeItem[] => {
  return code.split('\n').map((line, index) => ({
    id: `${index}-${Math.random()}`,
    content: line,
  }));
};

export const joinCode = (items: CodeItem[]) => {
  return items.map((i) => i.content).join('\n');
};

export const shuffle = (array: CodeItem[]) => {
  return [...array].sort(() => Math.random() - 0.5);
};
