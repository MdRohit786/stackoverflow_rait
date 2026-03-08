import { useState } from "react";
import { Bot, Send } from "lucide-react";
import Mainlayout from "@/layout/Mainlayout";

export default function AIAssistPage() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<{role:string, text:string}[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim() || loading) return;
    const userMsg = { role: "user", text: question };
    setMessages((prev) => [...prev, userMsg]);
    setQuestion("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai-assist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "ai", text: data.answer || "No response received." }]);
    } catch {
      setMessages((prev) => [...prev, { role: "ai", text: "Error connecting to AI. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Mainlayout>
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Bot className="text-blue-500" /> AI Assist
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded ml-2">Labs</span>
        </h1>
        <p className="text-gray-500 mb-6">Get instant AI-powered help with your programming questions.</p>
        <div className="border rounded-lg min-h-64 p-4 mb-4 bg-gray-50 space-y-3 max-h-[500px] overflow-y-auto">
          {messages.length === 0 && (
            <p className="text-gray-400 text-center mt-10">Ask me anything about programming!</p>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`px-4 py-2 rounded-lg max-w-xl text-sm whitespace-pre-wrap ${
                m.role === "user" ? "bg-blue-500 text-white" : "bg-white border text-gray-700"
              }`}>
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white border px-4 py-2 rounded-lg text-sm text-gray-400">
                AI is thinking...
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <input
            className="flex-1 border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="Ask a programming question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAsk()}
            disabled={loading}
          />
          <button
            onClick={handleAsk}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Mainlayout>
  );
}
