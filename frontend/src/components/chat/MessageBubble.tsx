interface Props {
  text: string;
  isSender: boolean;
}

export default function MessageBubble({ text, isSender }: Props) {
  return (
    <div className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-xl text-sm shadow-sm ${
          isSender
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-gray-200 text-gray-800 rounded-bl-none"
        }`}
      >
        {text}
      </div>
    </div>
  );
}
