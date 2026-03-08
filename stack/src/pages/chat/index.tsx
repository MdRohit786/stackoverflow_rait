import { MessageSquare } from "lucide-react";
import Mainlayout from "@/layout/Mainlayout";

export default function ChatPage() {
  return (
    <Mainlayout>
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <MessageSquare className="text-blue-500" /> Chat
        </h1>
        <p className="text-gray-500 mb-6">Chat with other developers in real time.</p>
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <MessageSquare className="w-16 h-16 mb-4" />
          <p className="text-lg">Chat coming soon!</p>
        </div>
      </div>
    </Mainlayout>
  );
}
