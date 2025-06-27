'use client';

import UserPrompt from './UserPrompt';
import AiResponse from './AiResponse';
import { Chat, Payload } from '@/lib/types';
import { useEffect, useRef, useState } from 'react';
import useSidebarStore from '@/store/useSidebarStore';
import useAppStore from '@/store/useAppStore';
import { createResponse } from '@/actions/appAction';
import generateID from '@/utils/generateID';

const ChatContainer = ({
  chats,
  conversationID,
}: {
  chats: Chat[];
  conversationID: string;
}) => {
  const [conversations, setConversations] = useState<Chat[]>(chats);
  const [loading, setLoading] = useState<boolean>(false);

  const isInitialized = useRef<boolean>(false);

  const toggleRefresh = useSidebarStore((state) => state.toggleRefresh);
  const payload = useAppStore((state) => state.payload) as Payload;
  const resetPayload = useAppStore((state) => state.resetPayload);

  useEffect(() => {
    const isNew = history.state.new;
    if (isNew) {
      toggleRefresh();
      history.replaceState({ new: false }, '', `/chat/${conversationID}`);
    }
    if (conversations.length <= 0 && !isInitialized.current) {
      const id = generateID();

      const chat: Chat = {
        user_prompt: payload.prompt,
        ai_response: '',
        $id: id,
      };

      isInitialized.current = true;

      setConversations([...conversations, chat]);
      setLoading(true);

      createResponse({
        payload,
        conversationID,
        id,
      }).then((res) => {
        resetPayload();
        setConversations((prev) => {
          return prev.map((chat) => {
            if (chat.$id === id) {
              return { ...chat, ai_response: res as string };
            } else {
              return chat;
            }
          });
        });
        setLoading(false);
      });
    }
  }, [toggleRefresh, payload, conversations, conversationID, resetPayload]);
  return (
    <div>
      {conversations.map((chat: Chat) => (
        <div key={chat.$id}>
          <UserPrompt text={chat.user_prompt} />
          <AiResponse
            loading={loading}
            text={chat.ai_response}
          />
        </div>
      ))}
    </div>
  );
};

export default ChatContainer;
