import AiResponse from '@/components/AiResponse';
import UserPrompt from '@/components/UserPrompt';
import { getConversation } from '@/lib/database';
// import getConversation from '@/lib/getConversation';

interface Chat {
  user_prompt: string;
  ai_response: string;
  $id: string;
}

const ChatPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  let chats: Chat[] = [];

  const data = await getConversation(slug);

  if (data) chats = data.chats;

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

export default ChatPage;
