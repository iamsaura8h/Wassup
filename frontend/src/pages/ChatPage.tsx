export default function ChatPage() {
  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-4 space-y-4">
        <h2 className="text-xl font-bold">Chats</h2>
        <div className="text-sm text-gray-500">[User list will go here]</div>
      </aside>

      {/* Chat area */}
      <main className="flex-1 bg-gray-100 flex flex-col">
        <header className="p-4 border-b bg-white">
          <h3 className="text-lg font-semibold">[Selected User]</h3>
        </header>

        <section className="flex-1 overflow-y-auto p-4">
          <p className="text-gray-500">[Messages will go here]</p>
        </section>

        <footer className="p-4 border-t bg-white">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </footer>
      </main>
    </div>
  );
}
