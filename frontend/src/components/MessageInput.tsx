import { useState } from "react";

export default function MessageInput({ onSend }: { onSend: (msg: string) => void }) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border-t flex gap-2">
      <input
        type="text"
        className="flex-1 border rounded px-3 py-2"
        placeholder="Type a message"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="px-4 py-2 bg-blue-500 text-white rounded">Send</button>
    </form>
  );
}
