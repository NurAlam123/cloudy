import ChatContainer from '@/components/ChatContainer';
import { getConversation } from '@/lib/database';

const ChatPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  let chats = [];

  const data = await getConversation(slug);

  if (data) chats = data.chats;

  return (
    <ChatContainer
      chats={chats}
      conversationID={slug}
    />
  );
};

export default ChatPage;
