import ChatContainer from '@/components/ChatContainer';
import { getConversation } from '@/lib/database';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const doc = await getConversation(slug);

  return {
    title: doc.title,
  };
}

const ChatPage = async ({ params }: Props) => {
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
