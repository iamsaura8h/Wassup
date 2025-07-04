import MessageBubble from "./MessageBubble";

interface Message {
  _id: string;
  sender: { _id: string; username: string };  // populated sender
  text: string;
}

interface Props {
  messages: Message[];
  currentUserId: string;
}

export default function MessageList({ messages, currentUserId }: Props) {
  return (
    <div className="space-y-2">
      {messages.map((msg) => (
        <MessageBubble
          key={msg._id}
          text={msg.text}
          isSender={msg.sender._id === currentUserId}  // FIXED LINE ✅
        />
      ))}
    </div>
  );
}
