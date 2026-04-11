import type { ClickProps } from '@/ts/types';

import styles from './AIAssistantButton.module.scss';

export const AIAssistantButton = ({ onClick }: ClickProps) => {
  return (
    <button className={styles.button} onClick={onClick}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 4H20C21.1 4 22 4.9 22 6V16C22 17.1 21.1 18 20 18H6L2 22V6C2 4.9 2.9 4 4 4Z"
          fill="#3772ff"
          stroke="#ffffff"
          strokeWidth="2"
        />
        <circle cx="8" cy="12" r="1.2" fill="#ffffff">
          <animate
            attributeName="cy"
            values="12;10;12"
            dur="0.6s"
            repeatCount="indefinite"
            begin="0s"
          />
        </circle>
        <circle cx="12" cy="12" r="1.2" fill="#ffffff">
          <animate
            attributeName="cy"
            values="12;10;12"
            dur="0.6s"
            repeatCount="indefinite"
            begin="0.2s"
          />
        </circle>
        <circle cx="16" cy="12" r="1.2" fill="#ffffff">
          <animate
            attributeName="cy"
            values="12;10;12"
            dur="0.6s"
            repeatCount="indefinite"
            begin="0.4s"
          />
        </circle>
      </svg>

      <span>AI Assistant</span>
    </button>
  );
};
