import { useState } from "react";

export default function MessageInput({ onSend, socket, to }: any) {
  const [text, setText] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  const handleTyping = () => {
    socket.emit("typing", { to });
  };

  return (
    <form onSubmit={handleSend} className="p-3 border-t flex gap-2">
      <input
        type="text"
        className="flex-1 border rounded px-3 py-2"
        placeholder="Type a message"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleTyping}
      />
      <button className="px-4 py-2 bg-blue-500 text-white rounded">Send</button>
    </form>
  );
}
