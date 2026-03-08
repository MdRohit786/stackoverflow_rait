import { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
import Mainlayout from "@/layout/Mainlayout";
import axiosInstance from "@/lib/axiosinstance";
import Link from "next/link";

export default function SavesPage() {
  const [savedQuestions, setSavedQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    // Read fresh user from localStorage
    const storedUser = localStorage.getItem("user");
    if (!storedUser) { setLoading(false); return; }
    
    const user = JSON.parse(storedUser);
    setLoggedIn(true);
    
    if (!user.saves || user.saves.length === 0) {
      setLoading(false);
      return;
    }

    axiosInstance.get("/question/getallquestion").then((res) => {
      const all = res.data.data;
      const saved = all.filter((q: any) => user.saves.includes(q._id));
      setSavedQuestions(saved);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [mounted]);

  if (!mounted) return null;

  return (
    <Mainlayout>
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Saves</h1>
        <p className="text-gray-500 mb-6">Questions you have bookmarked.</p>
        {!loggedIn ? (
          <div className="text-center py-20 text-gray-400">
            <Bookmark className="w-16 h-16 mb-4 mx-auto" />
            <p>Please <Link href="/auth" className="text-blue-500 hover:underline">log in</Link> to see your saved questions.</p>
          </div>
        ) : loading ? <p>Loading...</p> : savedQuestions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Bookmark className="w-16 h-16 mb-4" />
            <p className="text-lg">No saved questions yet</p>
            <p className="text-sm">Click the bookmark icon on any question to save it</p>
          </div>
        ) : (
          <div className="space-y-4">
            {savedQuestions.map((q: any) => (
              <div key={q._id} className="border rounded-lg p-4 hover:bg-gray-50">
                <Link href={`/questions/${q._id}`} className="text-blue-600 hover:text-blue-800 font-medium">
                  {q.questiontitle}
                </Link>
                <p className="text-gray-500 text-sm mt-1 line-clamp-2">{q.questionbody}</p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {q.questiontags?.map((tag: string) => (
                    <span key={tag} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Mainlayout>
  );
}
