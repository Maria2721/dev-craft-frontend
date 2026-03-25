import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { Button, Input } from '@/components/ui';

import type { AIModalProps } from '@/ts/types';

import { useAIChat } from '@/hooks/useAIChat';

import styles from './AIAssistantModal.module.scss';

export const AIAssistantModal = ({ isOpen, onClose }: AIModalProps) => {
  const { messages, loading, sendMessage, resetChat } = useAIChat();
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userId = crypto.randomUUID();

    await sendMessage(input, userId);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  };

  const handleClose = () => {
    resetChat();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.header}>
        <h3 className={styles.title}>AI Assistant</h3>
        <button className={styles.close} onClick={handleClose}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>

      <div className={styles.chatWindow}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={clsx(
              msg.role === 'user' ? styles.userMessage : styles.aiMessage,
              styles.messageAnimation,
            )}
          >
            {msg.role === 'ai' ? (
              msg.text === 'AI is typing' ? (
                <span className={styles.typing}>{msg.text}</span>
              ) : (
                <Markdown remarkPlugins={[remarkGfm]}>{msg.text}</Markdown>
              )
            ) : (
              msg.text
            )}

            {msg.createdAt && (
              <span className={styles.messageDate}>
                {new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            )}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className={styles.inputContainer}>
        <Input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          disabled={loading}
          className={styles.input}
        />
        <Button onClick={() => void handleSend()} disabled={loading} variant="primary" size="sm">
          Send
        </Button>
      </div>
    </div>
  );
};
