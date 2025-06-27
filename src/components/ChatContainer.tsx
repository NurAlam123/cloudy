'use client';

import UserPrompt from './UserPrompt';
import AiResponse from './AiResponse';
import { Chat } from '@/lib/types';
import { useEffect } from 'react';
import useSidebarStore from '@/store/useSidebarStore';

const ChatContainer = ({
  chats,
  conversationID,
}: {
  chats: Chat[];
  conversationID: string;
}) => {
  const toggleRefresh = useSidebarStore((state) => state.toggleRefresh);

  useEffect(() => {
    const isNew = history.state.new;
    if (isNew) toggleRefresh();
  }, [toggleRefresh]);
  return (
    <div>
      {chats.map((chat: Chat) => (
        <div key={chat.$id}>
          <UserPrompt text={chat.user_prompt} />
          <AiResponse text={chat.ai_response} />
        </div>
      ))}
    </div>
  );
};

export default ChatContainer;
