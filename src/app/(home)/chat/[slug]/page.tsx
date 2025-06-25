import AiResponse from '@/components/AiResponse';
import UserPrompt from '@/components/UserPrompt';
import getConversation from '@/lib/getConversation';

interface Chat {
  user_prompt: string;
  ai_response: string;
  $id: string;
}

const ChatPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const data = await getConversation(slug);
  let chats: Chat[] = [];

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
