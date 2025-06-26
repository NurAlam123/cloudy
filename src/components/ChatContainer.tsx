import UserPrompt from './UserPrompt';
import AiResponse from './AiResponse';
import { Chat } from '@/lib/types';

const ChatContainer = ({ chats }: { chats: Chat[] }) => {
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
